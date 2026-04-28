

export type SocialLink = {
  label: string;
  href: string;
};

export type SkillGroup = {
  title: string;
  description: string;
  items: string[];
};

export type TimelineItem = {
  slug: string;
  type: "education" | "work";
  period: string;
  title: string;
  institution?: string;
  location: string;
  country?: "CA" | "BR";
  accolade?: string;
  logo?: {
    light: string;
    dark: string;
  };
  summary: string;
  details: string[];
  tags: string[];
};

export type ProjectItem = {
  slug: string;
  title: string;
  category: string;
  imageSrc: string;
  summary: string;
  details: string[];
  tags: string[];
  files?: Array<{
    label: string;
    href: string;
    icon?: string;
  }>;
};

export const profile = {
  name: "William Makino",
  role: "Artificial Intelligence, Data Science and Economics",
  location: "Calgary, Alberta",
  imageSrc: "/images/pfp.jpg",
  summary:
    "Building practical data products, analytical systems, and polished portfolio experiences that help recruiters understand technical depth quickly.",
};

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/wmakino" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/wmakino/" },
  { label: "Email", href: "mailto:wmakino@outlook.com" },
];

export const navItems = [
  { label: "Skills", id: "skills" },
  { label: "Education", id: "education" },
  { label: "Projects", id: "projects" },
  { label: "Work", id: "work" },
  { label: "Contact", id: "contact" },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Machine Learning & AI",
    description: "Building, tuning and deploying predictive models and intelligent systems.",
    items: ["Python", "Scikit-Learn", "PyTorch", "Pandas", "NLP", "Computer Vision", "LLMs"],
  },
  {
    title: "Data Analytics & Strategy",
    description: "Extracting insights through statistical analysis and business intelligence workflows.",
    items: ["SQL", "Tableau", "Power BI", "Excel", "Statistics", "Predictive Analytics"],
  },
  {
    title: "Software & Cloud",
    description: "Developing production-ready web applications, APIs, and scalable architectures.",
    items: ["Flask", "React", "Next.js", "HTML/CSS", "Git", "Cloud Computing", "System Integration"],
  },
];

export const timelineItems: TimelineItem[] = [
  {
    slug: "integrated-ai",
    type: "education",
    period: "Jan 2026 - Aug 2026",
    title: "Integrated AI Post-diploma Certificate",
    institution: "Southern Alberta Institute of Technology (SAIT)",
    location: "Calgary, Alberta",
    country: "CA",
    logo: {
      light: "/images/logos/sait_core_vertical_full_colour_rgb_v2.png",
      dark: "/images/logos/sait_core_vertical_reverse_v2.png",
    },
    summary: "Currently completing SAIT's Integrated Artificial Intelligence post-diploma certificate, a one-year program centered on applied AI systems, production-ready web development, and real-world problem solving.",
    details: [
      "Overview: SAIT's Integrated Artificial Intelligence post-diploma certificate is a 30-credit program engineered to bridge the gap between theoretical data science and production-ready AI applications. The curriculum covers the end-to-end lifecycle of intelligent systems, beginning with applied statistics and predictive analytics, and extending into specialized domains like natural language processing (NLP) and computer vision. A core focus is placed on modern generative AI, equipping students with the ability to build and deploy systems utilizing large language models (LLMs), multimodal AI, fine-tuning, prompt engineering, and autonomous agents with memory and reasoning capabilities.",
      "To ensure these models can be successfully deployed, the program integrates full-stack web development and cloud computing fundamentals. This includes practical experience with cloud compute services, security protocols, and migration strategies. Finally, the technical coursework is grounded by crucial operational frameworks, focusing on responsible AI design, system management, compliance, performance tuning, and explainability, ultimately culminating in a comprehensive, real-world capstone project.",
      "Semester 1: ",
      "• ETHI 401: AI Governance and Ethics",
      "• ARTI 404: Web Development and Cloud Computing",
      "• ARTI 406: Human-Centered AI",
      "• STAT 400: Applied Statistics",
      "• DATA 440: Predictive Analytics and Modeling Fundamentals",
      "Semester 2: ",
      "• DATA 480: Predictive Analytics and Modeling",
      "• ARTI 407: Introduction to Natural Language Processing",
      "• ARTI 408: Introduction to Computer Vision",
      "• ARTI 409: AI Management and Maintenance",
      "• PROJ 407: Capstone: Applied Projects",
    ],
    tags: [
      "LLMs & Agents",
      "NLP",
      "Computer Vision",
      "Predictive Analytics",
      "Full-Stack Web Dev",
      "Cloud Computing",
      "Responsible AI",
      "AI Operations",
    ],
  },
  {
    slug: "data-analytics",
    type: "education",
    period: "May 2025 - Dec 2025",
    title: "Data Analytics Post-diploma Certificate",
    institution: "Southern Alberta Institute of Technology (SAIT)",
    location: "Calgary, Alberta",
    country: "CA",
    accolade: "Honours",
    logo: {
      light: "/images/logos/sait_core_vertical_full_colour_rgb_v2.png",
      dark: "/images/logos/sait_core_vertical_reverse_v2.png",
    },
    summary: "The curriculum covers the full data pipeline, from database queries and ETL processes to data visualization and machine learning, culminating in a capstone project solving a real-world business case.",
    details: [
      "Overview: SAIT's Data Analytics post-diploma certificate is a 24-credit program designed to equip students with the technical skills needed to extract value from complex datasets and drive business strategy. The curriculum covers the complete data analysis pipeline, starting with foundational techniques in data manipulation, database querying, and ETL (extract, transform, load) processes. Students progress into advanced statistical analysis, predictive modeling, and data mining, utilizing industry-standard programming languages and business intelligence software.",
      "The program also explores advanced frontiers of the field, including machine learning, deep learning, probabilistic programming, and the implications of IoT and cloud computing. By combining rigorous technical instruction in data visualization and modeling with practical applications, the program prepares graduates to deliver refined insights and solve complex challenges, culminating in a comprehensive capstone project built around an industry business case.",
      "Semester 1: ",
      "• DATA 401: Data Literacy",
      "• DATA 410: Business Context for Data Analysis",
      "• DATA 415: Statistical Analysis of Data",
      "• DATA 420: Predictive Analytics",
      "Semester 2: ",
      "• DATA 445: Business Analytics",
      "• DATA 460: Business Intelligence Reporting",
      "• DATA 475: Advanced Concepts in Data Analytics",
      "• PROJ 406: Data Analytics Capstone Project",
    ],
    tags: [
      "Data Manipulation",
      "ETL & Databases",
      "Predictive Analytics",
      "Data Visualization",
      "Business Intelligence",
      "Machine Learning",
      "Business Strategy",
    ],
  },
  {
    slug: "econ-degree",
    type: "education",
    period: "Mar 2019 - Dec 2024",
    title: "Bachelor in Economic Sciences (BSc)",
    institution: "University of Campinas (UNICAMP)",
    location: "Campinas, São Paulo",
    country: "BR",
    logo: {
      light: "/images/logos/unicamp_preto_v2.png",
      dark: "/images/logos/unicamp_branco_v2.png",
    },
    summary: "Ranked as one of the most prestigious economics programs in Latin America, the curriculum merges intense mathematical and statistical modeling with pluralistic economic theory and critical analysis of public policy.",
    details: [
      "Overview: Unicamp's Bachelor in Economic Sciences is an intensive 3000-hour, 200-credit program renowned for producing some of Brazil's leading economists and public policy experts. The curriculum provides a unique balance of rigorous quantitative training with a deeply pluralistic approach to economic theory. Students master foundational tools in calculus, linear algebra, and econometrics while studying diverse schools of economic thought. \n\n",
      "The core curriculum covers microeconomics, macroeconomics, political economy, and Brazilian economic history, ensuring students can contextualize data within historical and social frameworks. As students progress, they take on advanced quantitative methods, including econometrics, financial mathematics, and dynamic models. Through a wide array of specialized electives, graduates can tailor their expertise toward financial markets, data science, industrial organization, public policy, or economic development.",
      "Semester 1: ",
      "• CE191: General Economic History I",
      "• MA111: Calculus I",
      "• CE105: Fundamentals of Economic Theory",
      "• CE141: Accounting and Balance Sheet Analysis",
      "• CE142: Methods of Economic Analysis I",
      "• CE172: Introduction to Economics",
      "Semester 2: ",
      "• CE291: General Economic History II",
      "• ME414: Statistics for Experimentalists",
      "• CE112: Mathematical Economics II",
      "• CE205: Social Sciences for Economics",
      "• CE242: Methods of Economic Analysis II",
      "• CE262: Microeconomics I",
      "• CE272: Social Accounting",
      "Semester 3: ",
      "• CE362: Microeconomics II",
      "• CE372: Macroeconomics I",
      "• CE391: Socioeconomic Development",
      "• CE113: Mathematical Economics III",
      "• CE302: Law Institutions",
      "• CE305: Political Economy I",
      "• CE323: Economic Statistics and Introduction to Econometrics",
      "Semester 4: ",
      "• CE462: Microeconomics III",
      "• CE472: Macroeconomics II",
      "• CE482: International Economics I",
      "• CE491: Economic Formation of Brazil I",
      "• CE342: Methods of Economic Analysis III",
      "• CE405: Political Economy II",
      "• CE423: Econometrics I",
      "Semester 5: ",
      "• CE582: International Economics II",
      "• CE591: Economic Formation of Brazil II",
      "• CE671: Monetary Economics",
      "• CE442: Methods of Economic Analysis IV",
      "• CE562: Microeconomics IV",
      "• CE572: Macroeconomics III",
      "Semester 6: ",
      "• CE672: Corporate Strategies and Financialization",
      "• CE682: International Economics III",
      "• CE791: History of Economic Thought",
      "• CE853: Public Sector Economics",
      "• CE592: Contemporary Brazilian Economics I",
      "• CE625: Research Techniques",
      "Semester 7 & 8 Core: ",
      "• CE792: Contemporary Economic Development",
      "• CE593: Contemporary Brazilian Economics II",
      "• CE725: Monograph I",
      "• CE543: Methods of Economic Analysis V",
      "• CE825: Monograph II",
      "Completed Electives: ",
      "• CE841: Corporate Finance",
      "• CE858: Behavioral Finance",
      "• CE863: Adam Smith and Economic Liberalism",
      "• CE874: Analytical Introduction to Data Science",
      "• CE875: Computational Economics II: Advanced Software",
    ],
    tags: [
      "Heterodox Economics",
      "Political Economy",
      "Structuralism",
      "Post-Keynesianism",
      "Economic History",
      "Economic Development",
      "Econometrics",
      "Mathematical Economics",
      "Macroeconomic Theory",
      "Microeconomic Theory",
      "Corporate Finance",
    ],
  },
  {
    slug: "best-buy-advisor",
    type: "work",
    period: "Nov 2025 – Dec 2025",
    title: "Computing Solutions Advisor",
    location: "Best Buy Canada",
    summary: "Served as a temporary contract worker providing consultative technical sales and support during peak high-volume retail periods.",
    details: [
      "Supported the Computing department during peak holiday periods (Black Friday/Boxing Day), handling heavy foot traffic while maintaining fast, personalized service.",
      "Delivered consultative, customer-focused guidance on a wide range of electronics by leveraging IT knowledge and strong customer relations skills.",
      "Strengthened ability to explain complex technical concepts clearly to non-technical users and perform well under tight time constraints while multitasking.",
    ],
    tags: ["Technical Sales", "Client Relations", "Merchandising", "Multitasking", "Attention to Detail", "B2C Sales"],
  },
  {
    slug: "tech-tutor",
    type: "work",
    period: "Jul 2024 – Mar 2025",
    title: "Private Technology Coach/Tutor",
    location: "Self Employed",
    summary: "Designed and delivered custom digital literacy curricula to help older adults confidently navigate modern technology ecosystems.",
    details: [
      "Delivered personalized one-on-one digital literacy instruction to older adults, covering Windows OS environments, smartphones (iOS/Android), email management, web browsing, and everyday technology use.",
      "Guided clients in building confidence with devices and online tools by providing patient, structured support in account setup, system troubleshooting, internet safety, and practical day-to-day digital tasks.",
    ],
    tags: ["1:1 Instruction", "System Troubleshooting", "Windows OS", "Mobile Platforms", "Cybersecurity Basics", "Digital Literacy"],
  },
];

export const projectItems: ProjectItem[] = [
  {
    slug: "credit-risk-analysis",
    title: "Credit Risk Analysis & Deployment",
    category: "DATA-440 & ARTI-404 Final Project",
    imageSrc: "/projects/credit_risk/credit_risk_thumbnail.png",
    summary: "End-to-end credit risk assessment system combining advanced machine learning modeling with a production-ready web interface.",
    details: [
      "Machine Learning (DATA-440): Developed a robust predictive model for credit risk assessment, including comprehensive Exploratory Data Analysis (EDA) and rigorous hyperparameter tuning to optimize classification accuracy.",
      "Web Development (ARTI-404): Designed and launched a full-stack web application to serve the model, featuring a custom-built lending form and an interactive results dashboard for real-time risk evaluation.",
      "Integration & Deployment: Bridged the gap between data science and software engineering by containerizing the model and exposing it through a Flask API, ensuring seamless communication between the frontend and the predictive backend.",
      "System Architecture: The solution is built as a modular Flask application. It features a responsive frontend designed with HTML5 and CSS3, a Python-based backend that handles real-time data processing, and a SQLite database for persistence. The architecture ensures that model predictions and SHAP feature importance values are computed and stored as soon as a form is submitted.",
    ],
    tags: ["Python", "Scikit-Learn", "Flask", "HTML/CSS", "Machine Learning", "Model Tuning"],
    files: [
      { label: "Lending Form UI", href: "/projects/credit_risk/lending_form_V2.html", icon: "window" },
      { label: "Flask Application", href: "/projects/credit_risk/app.html", icon: "code" },
      { label: "Model Tuning & EDA", href: "/projects/credit_risk/DATA440_Phase-4_CRAM_EDA_model_tuning.html", icon: "code" },
      { label: "System Architecture", href: "/projects/credit_risk/diagram.png", icon: "image" },
    ],
  },
  {
    slug: "capcon-ev-analysis",
    title: "Canada EV Infrastructure",
    category: "Data Analytics Capstone",
    imageSrc: "/projects/canada-ev-infrastructure/thumbnail.png",
    summary: "Data Analytics Capstone on Canada's EV charging network and federal investment strategy.",
    details: [
      "This capstone project was an academic simulation of a consulting engagement for Natural Resources Canada (NRCan). The goal was to build a data-driven decision-support tool to optimize federal electric vehicle infrastructure allocation. The core focus was architecting an end-to-end analytical pipeline using spatial data, stochastic simulations, and predictive modeling.",
      "Geospatial Analysis (Python & GeoPandas): Processed Geodatabase (GDB) files and shapefiles to extract line and point geometries for the National Highway System. Layered these routes with station coordinates and census data, applying an ecumene filter to mathematically restrict the spatial analysis strictly to inhabited areas.",
      "Stochastic Modeling: Built a Monte Carlo simulation running 1,000 iterations to optimize a fixed $100 million budget constraint. The algorithm utilized custom utility scoring and sensitivity analysis to evaluate the mathematical trade-offs between deploying high-volume standard chargers versus high-impact fast chargers.",
      "Scenario-Based Forecasting: Designed predictive models using historical vehicle registration trends to calculate future infrastructure demand. Tested multiple fleet composition splits to dynamically forecast hardware requirements under highly uncertain market conditions.",
      "Data Engineering: Integrated disparate datasets from government sources, global sales databases, and flat files. Standardized geographic coordinates, power outputs, and categorical attributes into a clean, conformed data model to feed both the interactive visualizations and the quantitative simulations."
    ],
    tags: ["Python", "GeoPandas", "Geospatial", "Monte Carlo", "Forecasting", "Matplotlib"],
    files: [
      { label: "Capcon Poster", href: "/projects/canada-ev-infrastructure/poster.pdf", icon: "image" },
      { label: "Presentation Slides", href: "/projects/canada-ev-infrastructure/presentation.pdf", icon: "presentation" },
      { label: "Project Report", href: "/projects/canada-ev-infrastructure/deliverable.pdf", icon: "file" },
      { label: "Python Code", href: "/projects/canada-ev-infrastructure/Heatmap.html", icon: "code" },
    ],
  },
  {
    slug: "daan-statistical-analysis",
    title: "2024 F1 Season Analysis",
    category: "DATA-415 Final Project",
    imageSrc: "/projects/f1-analysis/thumbnail.png",
    summary: "Advanced performance modeling of the 2024 Formula 1 season using stochastic simulations and predictive techniques in Excel.",
    details: [
      "Stochastic Modeling: Implemented a Monte Carlo simulation engine to forecast race outcomes and championship standings across multiple probability-weighted scenarios.",
      "Predictive Analytics: Built k-Nearest Neighbors (kNN) and Linear Regression models to evaluate driver performance consistency and vehicle pace efficiency.",
      "Data Synthesis: Streamlined high-frequency telemetry and race data from the OpenF1 API into a robust analytical dashboard for scenario-based decision support.",
    ],
    tags: ["Excel", "Monte Carlo", "kNN", "Linear Regression", "Scenario Forecasting"],
    files: [{ label: "Project Report", href: "/projects/f1-analysis/report.pdf", icon: "file" }],
  },
  {
    slug: "daan-predictive-analytics",
    title: "NYC Rideshare Trips",
    category: "DATA-420 Final Project",
    imageSrc: "/projects/nyc-rideshare/thumbnail.png",
    summary: "Comprehensive demand analysis and passenger clustering of New York City rideshare data using R.",
    details: [
      "Unsupervised Learning: Developed k-means clustering models to segment high-intensity trip zones and identify peak demand patterns across the five boroughs.",
      "Predictive Modeling: Architected classification decision trees and linear regression workflows to surface the key drivers of trip duration and fare volatility.",
      "Statistical Analysis: Performed rigorous exploratory data analysis (EDA) and feature importance ranking to optimize driver allocation strategies.",
    ],
    tags: ["R", "k-Means Clustering", "Decision Trees", "Regression", "Exploratory Data Analysis"],
    files: [{ label: "Project Report", href: "/projects/nyc-rideshare/report.html", icon: "code" }],
  },
  {
    slug: "monograph-capstone",
    title: "Monetary Financing & COVID-19",
    category: "CE-825 Final Project",
    imageSrc: "/projects/monograph/monograph_thumbnail_v2.png",
    summary: "Year-long Economics capstone analyzing Brazil's pandemic-era monetary financing and macroeconomic theory.",
    details: [
      "Capstone Scope: Developed over a full academic year, this monograph represents the culmination of the Bachelor's in Economics, merging high-level macroeconomic theory with qualitative empirical validation.",
      "Theoretical Analysis: Conducted a comparative study of the Campinas School, the UFRJ Political Economy Group, and Orthodox perspectives on the fiscal costs and institutional risks of monetary financing.",
      "Empirical Review: Analyzed historical datasets from the Central Bank of Brazil (BCB) and National Treasury to quantify shifts in the monetary base and repo operations during the pandemic.",
      "Institutional Policy: Evaluated the trade-offs between debt issuance and monetary financing within Brazil's unique 'Emergency Regime' (War Budget) framework.",
    ],
    tags: ["Macroeconomics", "Public Finance", "Monetary Policy", "Economic Theory"],
    files: [
      { label: "Full Monograph", href: "/projects/monograph/Monografia-Makino.pdf", icon: "file" },
      { label: "Defense Slides", href: "/projects/monograph/Defesa Monografia.pdf", icon: "presentation" },
    ],
  },
  {
    slug: "fortune-1000",
    title: "2024 Fortune 1000 Companies",
    category: "CE-874 Final Project",
    imageSrc: "/projects/fortune-1000/thumbnail.png",
    summary: "Multi-model machine learning pipeline to forecast revenue growth and market ranking shifts for Fortune 1000 companies.",
    details: [
      "Ensemble Methods: Developed and optimized a suite of models including Random Forest, SVR, and Multi-layer Perceptrons (MLP) to predict annual fiscal performance.",
      "Hyperparameter Tuning: Utilized grid search and cross-validation techniques in Python to maximize model accuracy across disparate industry sectors.",
      "Collaborative Development: Led the technical integration of model outputs within a multidisciplinary team of 4, ensuring unified data conforming and error diagnostics.",
    ],
    tags: ["Python", "Scikit-Learn", "Neural Networks", "Random Forest", "SVR"],
    files: [{ label: "Project Report", href: "/projects/fortune-1000/report.pdf", icon: "file" }],
  },
  {
    slug: "inss-covid-impact",
    title: "COVID-19 Impact Analysis of Brazil’s Federal Revenues",
    category: "CE-442 Final Project",
    imageSrc: "/projects/covid-impact/thumbnail.png",
    summary: "Time-series impact analysis of Brazil's federal tax revenues using Box-Jenkins methodology in R.",
    details: [
      "Time-Series Forecasting: Built seasonal ARIMA (SARIMA) models to establish a 'business-as-usual' baseline for federal revenue streams.",
      "Intervention Analysis: Quantified the magnitude of the pandemic's fiscal shock by comparing observed revenues against counterfactual forecasted scenarios.",
      "Residual Diagnostics: Performed rigorous statistical testing of model residuals to ensure the robustness and validity of the fiscal impact conclusions.",
    ],
    tags: ["R", "ARIMA/SARIMA", "Time Series", "Fiscal Analysis", "Forecasting"],
    files: [{ label: "Project Report", href: "/projects/covid-impact/report.pdf", icon: "file" }],
  },
];