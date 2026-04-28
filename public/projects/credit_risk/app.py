from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import sqlite3
import os
import joblib
import pandas as pd
from datetime import datetime

try:
    import shap
    HAS_REAL_SHAP = True
except ImportError:
    HAS_REAL_SHAP = False

app = Flask(__name__)
CORS(app)

# Use absolute paths relative to the script's directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_FILE = os.path.join(BASE_DIR, 'lending.db')
MODEL_FILE = os.path.join(BASE_DIR, 'model.joblib')

# Load the model once at startup
try:
    if os.path.exists(MODEL_FILE):
        model = joblib.load(MODEL_FILE)
        print(f"Model loaded successfully from {MODEL_FILE}")
    else:
        model = None
        print(f"WARNING: Model file not found at {MODEL_FILE}")
except Exception as e:
    model = None
    print(f"Error loading model: {e}")

# Version Compatibility Patch: Handle scikit-learn attribute 'multi_class' removal in v1.5+
if model:
    try:
        # Check if the internal classifier is missing the multi_class attribute
        clf = None
        if hasattr(model, 'named_steps'):
            clf = model.named_steps.get('model') or model.steps[-1][1]
        
        if clf and not hasattr(clf, 'multi_class'):
            clf.multi_class = 'auto' # Older models sometimes require this to run on newer libraries
            print("Applied scikit-learn multi_class compatibility patch")
    except:
        pass

# Mapping Employment Status from UI to Model Categories
EMP_STATUS_MAP = {
    'Full-time': 'Employed_FT',
    'Part-time': 'Employed_PT',
    'Self-employed': 'Self-Employed',
    'Contract': 'Contract',
    'Unemployed': 'Unemployed',
    'Retired': 'Retired'
}

def init_db():
    """Initialize the SQLite database and create the applications table if it doesn't exist."""
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS applications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            annual_gross_income TEXT,
            employment_status TEXT,
            years_current_employment TEXT,
            dob TEXT,
            monthly_debt_obligations TEXT,
            total_revolving_credit_limit TEXT,
            total_revolving_balance TEXT,
            liquid_assets TEXT,
            housing_status TEXT,
            monthly_housing_payment TEXT,
            prior_bankruptcy TEXT,
            loan_amount_requested TEXT,
            credit_score TEXT,
            years_credit_history TEXT,
            delinquencies_12m TEXT,
            months_since_delinquency TEXT,
            occupation_category TEXT,
            dependents TEXT,
            prediction INTEGER,
            confidence REAL,
            submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

# Initialize DB on startup
init_db()


def _safe_int(value, default=0):
    try:
        if value is None or value == "":
            return default
        return int(float(value))
    except Exception:
        return default


def _predict_and_store(data):
    # Ensure schema exists at the runtime DB path (important on hosted environments)
    init_db()
    if not model:
        raise Exception("Predictive model file (model.joblib) not found or failed to load on the server.")

    # --- PREPROCESSING FOR MODEL ---
    dob_str = data.get('Date of Birth', '')
    age_val = 30
    if dob_str:
        try:
            dob = datetime.strptime(dob_str, '%Y-%m-%d')
            age_val = datetime.now().year - dob.year
        except Exception:
            pass

    ui_emp_status = data.get('Employment Status', 'Full-time')
    model_emp_status = EMP_STATUS_MAP.get(ui_emp_status, 'Employed_FT')

    input_data = {
        'Age': [_safe_int(age_val, 30)],
        'AnnualIncomeUSD': [_safe_int(data.get('Annual Gross Income', 0), 0)],
        'FICOScore': [_safe_int(data.get('Credit Score', 700), 700)],
        'LatePayments12M': [_safe_int(data.get('Delinquencies Past 12 Months', 0), 0)],
        'MonthsSinceLastDelinquency': [_safe_int(data.get('Months Since Last Delinquency', 100), 100)],
        'EmploymentStatus': [model_emp_status]
    }

    df_input = pd.DataFrame(input_data)

    pred_result = model.predict(df_input)
    prediction = int(pred_result[0])

    probs = model.predict_proba(df_input)
    class_idx = list(model.classes_).index(prediction)
    confidence = float(probs[0][class_idx])

    impacts = []
    if HAS_REAL_SHAP:
        try:
            explainer = shap.Explainer(model.predict, df_input, feature_names=list(input_data.keys()))
            shap_values = explainer(df_input)
            for i, feat_name in enumerate(input_data.keys()):
                val = float(shap_values.values[0][i])
                impacts.append({'feature': feat_name, 'impact': abs(val), 'raw_impact': val})
        except Exception as shap_err:
            print(f"Official SHAP failed, falling back to lite: {shap_err}")

    if not impacts:
        preproc = model.named_steps.get('preprocess') or (model.steps[0][1] if len(model.steps) > 1 else None)
        clf = model.named_steps.get('model') or (model.steps[-1][1] if len(model.steps) > 0 else None)

        if preproc and hasattr(clf, 'coef_'):
            X_transformed = preproc.transform(df_input)
            feature_names = preproc.get_feature_names_out() if hasattr(preproc, 'get_feature_names_out') else preproc.get_feature_names()
            coefs = clf.coef_[0]
            for i, name in enumerate(feature_names):
                clean_name = name.split('__')[-1].replace('_', ' ')
                val = X_transformed[0][i]
                impact = float(coefs[i] * val)
                # Keep all non-trivial terms to avoid hiding cumulative counter-signals.
                if abs(impact) > 1e-9:
                    impacts.append({'feature': clean_name, 'impact': abs(impact), 'raw_impact': impact})

            # Include model baseline (intercept) so displayed contributions reconcile with final class score.
            if hasattr(clf, 'intercept_') and len(clf.intercept_) > 0:
                base = float(clf.intercept_[0])
                impacts.append({'feature': 'Model baseline', 'impact': abs(base), 'raw_impact': base})

    impacts.sort(key=lambda x: x['impact'], reverse=True)

    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()

    sql = '''
        INSERT INTO applications (
            annual_gross_income, employment_status, years_current_employment,
            dob, monthly_debt_obligations, total_revolving_credit_limit,
            total_revolving_balance, liquid_assets, housing_status,
            monthly_housing_payment, prior_bankruptcy, loan_amount_requested,
            credit_score, years_credit_history, delinquencies_12m,
            months_since_delinquency, occupation_category, dependents, prediction, confidence
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    '''

    params = (
        data.get('Annual Gross Income'),
        data.get('Employment Status'),
        data.get('Years of Current Employment'),
        data.get('Date of Birth'),
        data.get('Monthly Debt Obligations'),
        data.get('Total Revolving Credit Limit'),
        data.get('Total Revolving Balance'),
        data.get('Liquid Assets'),
        data.get('Housing Status'),
        data.get('Monthly Housing Payment'),
        data.get('Prior Bankruptcy'),
        data.get('Loan Amount Requested'),
        data.get('Credit Score'),
        data.get('Years of Credit History'),
        data.get('Delinquencies Past 12 Months'),
        data.get('Months Since Last Delinquency'),
        data.get('Occupation Category'),
        data.get('Dependents'),
        prediction,
        confidence
    )

    try:
        cursor.execute(sql, params)
        inserted_id = cursor.lastrowid
        conn.commit()
        print("Data saved to database successfully, id=", inserted_id)
    except Exception as db_err:
        conn.rollback()
        print(f"Database insertion error: {db_err}")
        raise Exception(f"Database insertion failed: {db_err}")
    finally:
        conn.close()

    return {
        "prediction": prediction,
        "confidence": confidence,
        "top_features": impacts,
        "application_id": inserted_id,
        "income": data.get('Annual Gross Income'),
        "fico": data.get('Credit Score')
    }


def _fetch_application_rows(limit_one=False, app_id=None):
    # Ensure schema exists before reads on environments that may boot with fresh DB path
    init_db()
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    if app_id:
        cursor.execute("SELECT * FROM applications WHERE id = ?", (app_id,))
        rows = cursor.fetchall()
    elif limit_one:
        cursor.execute("SELECT * FROM applications ORDER BY submitted_at DESC LIMIT 1")
        rows = cursor.fetchall()
    else:
        cursor.execute("SELECT * FROM applications ORDER BY submitted_at DESC")
        rows = cursor.fetchall()
    conn.close()
    return rows

# --- 1. NAVIGATION ROUTES ---

@app.route("/")
def index():
    return render_template("index.html", title="Home")

@app.route("/results")
def results():
    return render_template("results.html", title="Results", is_locally_served=True)

@app.route("/webdev")
def webdev():
    return render_template("webdev.html", title="Web Dev")

@app.route("/hello")
def hello():
    return "This message confirms that the back end is running, using PythonAnywhere"

@app.route("/applications")
def view_applications():
    try:
        rows = _fetch_application_rows()
        return render_template("applications.html", title="Database View", applications=rows)
    except Exception as e:
        return f"Error reading database: {e}"


@app.route("/api/results")
def api_results():
    app_id = request.args.get('id', None)
    try:
        if app_id:
            rows = _fetch_application_rows(app_id=app_id)
            if not rows:
                return jsonify({"status": "error", "message": "Application not found"}), 404
            row = rows[0]
            return jsonify({k: row[k] for k in row.keys()}), 200
        rows = _fetch_application_rows(limit_one=True)
        if not rows:
            return jsonify({"status": "error", "message": "No applications found"}), 404
        row = rows[0]
        return jsonify({k: row[k] for k in row.keys()}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@app.route("/api/applications")
def api_applications():
    try:
        rows = _fetch_application_rows()
        apps = [{k: row[k] for k in row.keys()} for row in rows]
        return jsonify({"status": "success", "applications": apps}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@app.route('/api/submit', methods=['POST'])
@app.route('/api/submit/', methods=['POST'])
def api_submit():
    try:
        data = request.get_json(silent=True) or request.form.to_dict() or {}
        if not data:
            return jsonify({"status": "error", "message": "No data received"}), 400
        result = _predict_and_store(data)
        return jsonify({
            "status": "success",
            "prediction": result["prediction"],
            "confidence": result["confidence"],
            "top_features": result["top_features"],
            "application_id": result["application_id"],
            "message": "Data saved and prediction computed"
        }), 200
    except Exception as e:
        import traceback
        error_details = traceback.format_exc()
        print(f"CRITICAL ERROR (API): {error_details}")
        return jsonify({"status": "error", "message": str(e), "traceback": error_details}), 500

# --- 2. THE DATA RECEIVER ---

@app.route('/submit', methods=['POST'])
@app.route('/submit/', methods=['POST'])
def handle_form():
    try:
        # Hybrid route for fullstack app: supports both JSON and form payloads
        data = request.get_json(silent=True) or request.form.to_dict() or {}
        if not data:
            return jsonify({"status": "error", "message": "No data received"}), 400
        result = _predict_and_store(data)

        # Determine response type with preference rules:
        # - If client explicitly asks for JSON (XHR header, Accept JSON), return JSON
        # - Else if request appears to originate from a local page (Referer starts with host_url), render HTML
        # - Otherwise, default to JSON for API/CORS clients
        ref = request.headers.get('Referer') or request.referrer
        is_local_request = False
        try:
            if ref and ref.startswith(request.host_url):
                is_local_request = True
        except Exception:
            is_local_request = False

        try:
            accept_best = request.accept_mimetypes.best_match(['application/json', 'text/html'])
        except Exception:
            accept_best = None

        explicit_json_request = (request.headers.get('X-Requested-With') == 'XMLHttpRequest') or (accept_best == 'application/json')

        # If request includes an Origin header and it's not the same host, treat as API (cross-origin)
        origin = request.headers.get('Origin')
        cross_origin = False
        try:
            if origin and not origin.startswith(request.host_url):
                cross_origin = True
        except Exception:
            cross_origin = False

        # Render HTML only when request originates from the same host and the client did not explicitly request JSON
        if is_local_request and not explicit_json_request and not cross_origin:
            # Render the results page with server-side context for local HTML consumers
            return render_template(
                'results.html',
                title='Results',
                is_locally_served=True,
                prediction=result["prediction"],
                confidence=result["confidence"],
                top_features=result["top_features"],
                income=result["income"],
                fico=result["fico"],
                application_id=result["application_id"]
            ), 200
        else:
            # API consumer (CORS-enabled) or explicit JSON request expects JSON
            resp = {
                "status": "success",
                "prediction": result["prediction"],
                "confidence": result["confidence"],
                "top_features": result["top_features"],
                "application_id": result["application_id"],
                "message": "Data saved and prediction computed"
            }
            return jsonify(resp), 200

    except Exception as e:
        import traceback
        error_details = traceback.format_exc()
        print(f"CRITICAL ERROR: {error_details}")
        return jsonify({
            "status": "error", 
            "message": str(e),
            "traceback": error_details
        }), 500

if __name__ == "__main__":
    app.run(debug=True)
