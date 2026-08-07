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
  accoladeVariant?: "honours" | "in-progress";
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
  summary: string;
  details: string[];
  tags: string[];
  files?: Array<{
    label: string;
    href: string;
    icon?: string;
  }>;
};

export type CertificationItem = {
  slug: string;
  title: string;
  issuer: string;
  issued: string;
  logo: string;
  credentialUrl?: string;
};

export const profile = {
  name: "William Makino",
  role: "Artificial Intelligence, Data Science and Economics",
  location: "Calgary, Alberta",
  imageSrc: "/images/pfp.jpg",
};

export const socialLinks: SocialLink[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/wmakino/" },
  { label: "Email", href: "mailto:wmakino@outlook.com" },
  { label: "GitHub", href: "https://github.com/wmakino" },
];

export const navItems = [
  { label: "Skills", id: "skills" },
  { label: "Education", id: "education" },
  { label: "Certifications", id: "certifications" },
  { label: "Projects", id: "projects" },
  { label: "Work", id: "work" },
  { label: "Contact", id: "contact" },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Machine Learning & AI",
    description: "Training and shipping models, from sklearn baselines to LLM-backed apps.",
    items: ["Python", "Scikit-Learn", "PyTorch", "Pandas", "NLP", "Computer Vision", "LLMs"],
  },
  {
    title: "Data Analytics & Strategy",
    description: "SQL, statistics, and BI tools for analysis and reporting.",
    items: ["SQL", "Power BI", "Excel", "Statistics", "Predictive Analytics"],
  },
  {
    title: "Software & Cloud",
    description: "Web apps and APIs with Flask, FastAPI, React, and Next.js.",
    items: ["Flask", "FastAPI", "React", "Next.js", "HTML/CSS", "Git", "Azure", "Cloud Computing", "System Integration"],
  },
];

export const timelineItems: TimelineItem[] = [
  {
    slug: "integrated-ai",
    type: "education",
    period: "Jan 2026 - Aug 2026",
    title: "Integrated AI Post-diploma Certificate",
    institution: "Southern Alberta Institute of Technology (SAIT)",
    accolade: "in progress",
    accoladeVariant: "in-progress",
    location: "Calgary, Alberta",
    country: "CA",
    logo: {
      light: "/images/logos/sait_core_vertical_full_colour_rgb_v2.png",
      dark: "/images/logos/sait_core_vertical_reverse_v2.png",
    },
    summary:
      "One-year post-diploma at SAIT: applied AI from modeling through deployment, plus the business and management side of running AI systems in production.",
    details: [
      "Overview: SAIT's Integrated Artificial Intelligence certificate is 30 credits. It starts with stats and predictive modeling, then moves into NLP, computer vision, and generative AI (LLMs, fine-tuning, prompt design, agents with memory). Governance, human-centered design, and post-launch ops sit in the same curriculum as the modeling courses.",
      "You train models, connect them to apps, and learn how to keep them running in production. Web and cloud courses cover deployment (compute, security, migration). Ethics, compliance, explainability, monitoring, tuning, and maintenance appear throughout. Governance and management classes cover the business side. The capstone is a client project with a working deliverable and a written case for it.",
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
      "AI Management",
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
    summary: "24-credit program from SQL and ETL through visualization, modeling, and a business capstone.",
    details: [
      "Overview: SAIT's Data Analytics post-diploma is 24 credits. Early courses cover data literacy, SQL, ETL, and statistics. Later ones add predictive modeling, BI reporting, and more advanced analytics topics.",
      "Machine learning, deep learning, and cloud/IoT land in the second semester. The capstone is an industry case where you clean messy data, analyze it, and present findings to the class.",
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
    summary: "Five-year BSc at UNICAMP: heavy math and econometrics with heterodox and orthodox theory.",
    details: [
      "Overview: UNICAMP's Economics degree is 3,000 hours and 200 credits. Calculus, linear algebra, and econometrics take up a large share of the core. Keynesian, structuralist, and orthodox approaches run through the required coursework from the first years.",
      "Core courses span micro, macro, political economy, and Brazilian economic history. Upper years add econometrics, financial math, and dynamic models. Electives cover finance, data science, industrial org, and public policy. Capstone monograph: monetary financing during COVID.",
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
    period: "Nov 2025 - Dec 2025",
    title: "Computing Solutions Advisor (Seasonal)",
    location: "Best Buy Canada",
    summary: "Holiday contract in Best Buy's computing department: consultative sales during Black Friday and Boxing Day rushes.",
    details: [
      "Covered the computing floor during peak holiday traffic (Black Friday and Boxing Day). Volume was high; the job was matching people to the right gear without rushing them off.",
      "Explained specs and trade-offs to customers who ranged from first-time buyers to people upgrading custom builds.",
      "Got better at translating jargon into plain language and staying calm when three conversations needed attention at once.",
    ],
    tags: ["Technical Sales", "Client Relations", "Merchandising", "Multitasking", "Attention to Detail", "B2C Sales"],
  },
  {
    slug: "tech-tutor",
    type: "work",
    period: "Jul 2024 - Mar 2025",
    title: "Private Technology Coach/Tutor",
    location: "Self Employed",
    summary: "Private tutoring for older adults on phones, email, Windows, and everyday digital tasks.",
    details: [
      "One-on-one sessions with older adults on Windows, iOS/Android, email, browsing, and account setup.",
      "Most clients needed patience more than technical depth: repeating steps, writing things down, and building confidence with devices they already owned.",
    ],
    tags: ["1:1 Instruction", "System Troubleshooting", "Windows OS", "Mobile Platforms", "Cybersecurity Basics", "Digital Literacy"],
  },
];

export const certificationItems: CertificationItem[] = [
  {
    slug: "databricks-genai",
    title: "Generative AI Fundamentals",
    issuer: "Databricks",
    issued: "Aug 2025",
    logo: "/images/logos/certs/databricks.png",
    credentialUrl: "https://credentials.databricks.com/eadbe788-3126-4acc-a4ba-d06b2be98736",
  },
  {
    slug: "ielts-8",
    title: "IELTS Academic 8.0",
    issuer: "IELTS Official",
    issued: "Aug 2024",
    logo: "/images/logos/certs/ielts.png",
  },
  {
    slug: "alteryx-designer-core",
    title: "Alteryx Designer Core Certified",
    issuer: "Alteryx",
    issued: "Jul 2024",
    logo: "/images/logos/certs/alteryx.png",
    credentialUrl: "https://www.credly.com/badges/6709f041-fd9b-4b3f-b8ef-0eaa3c12d025/linked_in_profile",
  },
  {
    slug: "azure-ai-fundamentals",
    title: "AI-900: Azure AI Fundamentals",
    issuer: "Microsoft",
    issued: "May 2024",
    logo: "/images/logos/certs/microsoft.png",
    credentialUrl:
      "https://learn.microsoft.com/api/credentials/share/en-gb/wmakino/6A90AE0962DD3313?sharingId=FEF3035517876BE0",
  },
  {
    slug: "azure-fundamentals",
    title: "AZ-900: Azure Fundamentals",
    issuer: "Microsoft",
    issued: "May 2024",
    logo: "/images/logos/certs/microsoft.png",
    credentialUrl:
      "https://learn.microsoft.com/api/credentials/share/en-gb/wmakino/2FB360F7720BE6AC?sharingId=FEF3035517876BE0",
  },
  {
    slug: "power-bi-analyst",
    title: "PL-300: Power BI Data Analyst Associate",
    issuer: "Microsoft",
    issued: "Mar 2024",
    logo: "/images/logos/certs/microsoft.png",
    credentialUrl:
      "https://learn.microsoft.com/api/credentials/share/en-gb/wmakino/722F1669FEA53A33?sharingId=FEF3035517876BE0",
  },
  {
    slug: "datacamp-analyst",
    title: "Data Analyst Associate",
    issuer: "DataCamp",
    issued: "Nov 2023",
    logo: "/images/logos/certs/datacamp.png",
    credentialUrl: "https://www.datacamp.com/certificate/DAA0019539704178",
  },
  {
    slug: "enap-r-analysis",
    title: "Data Analysis in R",
    issuer: "ENAP, National School of Public Administration",
    issued: "Oct 2023",
    logo: "/images/logos/certs/enap.png",
  },
  {
    slug: "google-data-analytics",
    title: "Google Data Analytics",
    issuer: "Google",
    issued: "Sep 2023",
    logo: "/images/logos/certs/google.png",
    credentialUrl: "https://www.coursera.org/share/ed08929d9c7ee82f21c3aaf2060e8fa9",
  },
  {
    slug: "extecamp-fundamental-analysis",
    title: "Fundamental Analysis",
    issuer: "Extecamp, UNICAMP",
    issued: "Nov 2022",
    logo: "/images/logos/certs/extecamp.png",
  },
  {
    slug: "ef-set-c2",
    title: "EF SET English Certificate 81/100 (C2 Proficient)",
    issuer: "EF SET",
    issued: "Aug 2022",
    logo: "/images/logos/certs/ef-set.png",
  },
  {
    slug: "ielts-7-5",
    title: "IELTS Academic 7.5",
    issuer: "IELTS Official",
    issued: "Feb 2018",
    logo: "/images/logos/certs/ielts.png",
  },
];

export const projectItems: ProjectItem[] = [
  {
    slug: "ticket-labeller",
    title: "EMR Ticket Labeller & Theme Clustering",
    category: "SAIT Integrated AI Capstone · Ava Industries",
    summary:
      "FastAPI + Qwen labeller for Ava Industries GitHub issues, with theme clustering on Azure and a review flag when confidence is low.",
    details: [
      "Overview: PROJ-407 Integrated AI capstone with a team of four for Ava Industries in Calgary, the company behind Ava EMR. Our piece labels GitHub issues for their developers, not patient charts or clinical workflows. Build is done; presentation is next. I owned the FastAPI labeller API, theme clustering, and Azure/Qwen deploy. Teammates owned the ticket-filling chatbot, an auto PRD generator, and the GitHub Actions that call the API.",
      "Problem: Developers carry a large GitHub issue backlog and a long label list. Hand-labelling is slow and drifts between people. Uncertain cases need a review flag. The team also wanted unsupervised themes the fixed taxonomy misses.",
      "Approach: FastAPI asks Ollama/Qwen for structured JSON labels against a flat, prefix-coded taxonomy. Code then enforces cardinality and confidence, and appends Needs Human Review when the model is unsure. Local YAML and GitHub-synced taxonomies use the same pipeline. Admin SPA handles settings and live test labelling. A separate path embeds issues, runs UMAP and HDBSCAN, and names themes. Ran on Azure Container Apps with Qwen.",
      "Results: 100+ labels in the taxonomy. 2,700+ issues labelled. Last pass put 17 of those 2,700+ into human review. Capstone build finished; presentation still pending.",
      "Stack: Python, FastAPI, Ollama/Qwen, embeddings, UMAP, HDBSCAN, YAML taxonomy, Azure Container Apps, Docker, admin SPA.",
    ],
    tags: ["FastAPI", "LLMs", "Ollama/Qwen", "Azure", "UMAP", "HDBSCAN", "Human-in-the-loop", "Python"],
    files: [
      { label: "Admin UI Demo", href: "/projects/ticket_labeller/admin.html", icon: "window" },
      { label: "System Diagram", href: "/projects/ticket_labeller/diagram.html", icon: "image" },
    ],
  },
  {
    slug: "cursor-hackathon",
    title: "Smart Inbox (Cursor Hackathon)",
    category: "Hackathon Product Prototype",
    summary:
      "24-hour hackathon build: Gmail triage mockup with sorted buckets, urgency counts, sign-in flow, and a dense priority dashboard.",
    details: [
      "Overview: 24-hour build at the Cursor Calgary Hackathon (SAIT) with a team of three. Next.js Smart Inbox prototype with Google sign-in and a triage dashboard that routes mail into Action Required, Transactions, Newsletters & Promos, and In the Loop, with overdue counts on the board.",
      "Problem: Most inboxes mix urgent replies, receipts, newsletters, and FYI threads in one chronological list. Decisions get buried under noise.",
      "Approach: Product split into a landing page, Google sign-in screen, and operational dashboard. Each bucket shows counts, overdue flags, and sample threads so the backlog fits on one screen.",
      "Results: Priority board surfaces overdue Action Required items ahead of chronological scroll. Live stack was Gmail API, Google Auth, and GPT-5-mini. Portfolio file is a static export of that UI.",
      "Stack: Next.js, Gmail API, Google Auth, GPT-5-mini, product/UI design.",
    ],
    tags: ["Next.js", "Gmail API", "Google Auth", "GPT-5-mini", "Product Design"],
    files: [
      { label: "Prototype Demo", href: "/projects/cursor_hackathon/sign-in.html", icon: "window" },
    ],
  },
  {
    slug: "credit-risk-analysis",
    title: "Credit Risk Analysis & Deployment",
    category: "DATA-440 & ARTI-404 Final Project",
    summary:
      "Dual final project: train a credit-risk classifier with EDA and tuning, then ship it through a Flask app with a lending form, live scores, and SHAP explanations.",
    details: [
      "Overview: Combined DATA-440 (predictive modeling) and ARTI-404 (web development) into one deliverable: a scikit-learn credit-risk classifier behind a Flask lending app with retail and business forms, SQLite application history, and a results screen with model confidence plus feature-level explanations.",
      "Problem: Credit decisions need a score and a reason. Staff also need a form they can submit without opening a notebook.",
      "Approach: EDA and hyperparameter tuning in Python before locking features. Flask app validates submissions, scores them, and writes prediction plus SHAP values to SQLite so the results page can list top contributors.",
      "Results: Form submit returns a risk label, confidence, and stored history for later review. Modeling notebook and architecture diagram sit beside the HTML UI.",
      "Stack: Python, Scikit-Learn, Flask, HTML/CSS, SQLite, SHAP.",
    ],
    tags: ["Python", "Scikit-Learn", "Flask", "HTML/CSS", "Machine Learning", "Model Tuning"],
    files: [
      { label: "Lending Form UI", href: "/projects/credit_risk/lending_form_V2.html", icon: "window" },
      { label: "Flask Application", href: "/projects/credit_risk/app.html" },
      { label: "Model Tuning & EDA", href: "/projects/credit_risk/DATA440_Phase-4_CRAM_EDA_model_tuning.html" },
      { label: "System Architecture", href: "/projects/credit_risk/diagram.png", icon: "image" },
    ],
  },
  {
    slug: "ai-grading-system",
    title: "Human-Centered AI Grading",
    category: "ARTI-406 Final Project",
    summary:
      "Design and HTML mockup for AI-assisted grading: instructors set the rubric and rigor, then approve every score and comment before it posts.",
    details: [
      "Overview: ARTI-406 human-centered AI final with a teammate. Design and interactive HTML mockup only. No live grading model. Rubric upload, rigor control (strict / medium / easy), and instructor approve-before-post on scores and feedback.",
      "Problem: Auto-grading is faster, but trust collapses if instructors lose control over fairness and privacy. They need a clear path from rubric to posted score.",
      "Approach: Rubric-first web mockup iterated after sessions with three instructors. Users upload criteria, pick rigor, and edit AI-proposed scores and comments before anything finalizes. First wireframes pushed batch uploads and buried the reasoning. Feedback pushed a clearer one-submission flow and stronger overrides.",
      "Results: Mockup and report spell out where the tool could save time and where a human still has to approve, including bias checks and the final post. Architecture notes describe a later build. This hand-in stops at UX and governance.",
      "Stack: UX research, interactive HTML mockup, ethics and governance analysis.",
    ],
    tags: ["Human-Centered AI", "UX Research", "Transparency", "Ethics"],
    files: [
      { label: "Final Report", href: "/projects/ai_grading/Final Project Report.pdf" },
      { label: "Interactive Mockup", href: "/projects/ai_grading/ai-grading-system_v3.html", icon: "window" },
    ],
  },
  {
    slug: "capcon-ev-analysis",
    title: "Canada EV Infrastructure",
    category: "Data Analytics Capstone",
    summary:
      "Academic capstone framed as an NRCan / ZEVIP brief (real program, fictional engagement): geospatial analysis, Monte Carlo budget runs, and demand forecasts for EV chargers across Canada.",
    details: [
      "Overview: PROJ-406 Data Analytics capstone with a team of five, framed as an NRCan / ZEVIP consulting brief. The client, program, and policy targets are real; the engagement itself was academic only, not contracted work. Geospatial gap maps, ZEV demand scenarios, and a $100M Monte Carlo allocation between Level 2 and DC fast chargers across Canada.",
      "Problem: Level 2 ports cost less per unit; DC fast chargers cost more but matter on highway corridors. Fleet mix (BEV vs PHEV) also changes how many public ports are needed.",
      "Approach: Python / GeoPandas pipeline on National Highway System GDB data, station points, and census boundaries, filtered to inhabited ecumene. Registration trends feed adoption scenarios. 1,000 Monte Carlo runs allocate a fixed $100M budget across charger types with utility scoring.",
      "Results: National gap map plus port-count and cost scenarios under different BEV/PHEV mixes. Poster, slides, report, and notebook export support comparing those mixes side by side.",
      "Stack: Python, GeoPandas, Matplotlib, Monte Carlo simulation, geospatial joins.",
    ],
    tags: ["Python", "GeoPandas", "Geospatial", "Monte Carlo", "Forecasting", "Matplotlib"],
    files: [
      { label: "Capcon Poster", href: "/projects/canada-ev-infrastructure/poster.pdf" },
      { label: "Presentation Slides", href: "/projects/canada-ev-infrastructure/presentation.pdf" },
      { label: "Project Report", href: "/projects/canada-ev-infrastructure/deliverable.pdf" },
      { label: "Python Code", href: "/projects/canada-ev-infrastructure/Heatmap.html" },
    ],
  },
  {
    slug: "daan-statistical-analysis",
    title: "2024 F1 Season Analysis",
    category: "DATA-415 Final Project",
    summary:
      "2024 F1 analysis in Excel on OpenF1 data: qualifying vs race results, kNN tire-compound prediction, and Monte Carlo 1-stop vs 2-stop sims.",
    details: [
      "Overview: DATA-415 project framed as a McLaren Racing brief on the 2024 season. Excel workbook on public OpenF1 sessions, stints, and telemetry covering qualifying-to-result links, tire-compound prediction, and pit-strategy simulation.",
      "Problem: Under the cost cap, car designs converge. The questions that matter are operational. Does grid position still buy points? Can you infer tire compound from a stint? On Hungary, Netherlands, and Singapore, is a 1-stop or 2-stop likelier?",
      "Approach: Joined OpenF1 sessions, meetings, laps, and stints in Excel. Regressed race outcomes on qualifying. kNN predicted tire compound from lap time and tire age. Monte Carlo lap-time sims compared 1-stop and 2-stop plans on those three tracks.",
      "Results: Workbook ranks strategy odds from the simulated race-time distributions and shows how much starting position still moves the result. Assumptions are listed in the report so the sims read as scenario tools.",
      "Stack: Excel, OpenF1 API, kNN, linear regression, Monte Carlo simulation.",
    ],
    tags: ["Excel", "Monte Carlo", "kNN", "Linear Regression", "Scenario Forecasting"],
    files: [{ label: "Project Report", href: "/projects/f1-analysis/report.pdf" }],
  },
  {
    slug: "daan-predictive-analytics",
    title: "NYC Rideshare Market Analysis",
    category: "DATA-420 Final Project",
    summary:
      "NYC TLC FHV base aggregates in R (~52k monthly rows): trip volume vs fleet size, k-means on operator scale, and a tree that flags Uber/Lyft vs everyone else.",
    details: [
      "Overview: DATA-420 final on the NYC TLC FHV Base Aggregate Report for a fictional entrant (Empire). Monthly dispatched trips and unique vehicles by licensed base. About 52,000 rows from 2015 to 2024, with regression, k-means, and a classifier for Uber / Lyft / Other.",
      "Problem: Market entry needs fleet sizing for a target trip share, natural groupings among bases by scale, and a read on whether Uber and Lyft stand apart from smaller operators when you only have aggregates.",
      "Approach: Cleaned the panel in R and added trips per vehicle plus lags and moving averages. Multiple linear regression of total dispatched trips on unique vehicles and month. k-means on normalized scale features to group bases. Decision tree labeled records Uber, Lyft, or Other.",
      "Results: Fleet size and seasonality track trip volume. Clusters show which operators sit near the big platforms. The tree separates Uber and Lyft from the long tail on license and base patterns. Scope stays at base-month aggregates, not trip-level dispatch.",
      "Stack: R, multiple linear regression, k-means clustering, decision trees, EDA.",
    ],
    tags: ["R", "k-Means Clustering", "Decision Trees", "Regression", "Exploratory Data Analysis"],
    files: [{ label: "Project Report", href: "/projects/nyc-rideshare/Final-Project.pdf" }],
  },
  {
    slug: "monograph-capstone",
    title: "Monetary Financing & COVID-19",
    category: "CE-825 Final Project",
    summary:
      "Year-long UNICAMP thesis comparing macro schools on Brazil's COVID-era monetary financing, backed by BCB and Treasury data.",
    details: [
      "Overview: CE-825 bachelor's monograph over two semesters at UNICAMP (Instituto de Economia). Compares Campinas School, UFRJ political economy, and orthodox readings on monetary financing of public spending during COVID, with BCB and National Treasury series for 2020-2021.",
      "Problem: Brazil expanded federal spending under the Emergency Regime (War Budget). Debate turned on monetary financing vs debt issuance, inflation risk, and what the institutional rules allowed.",
      "Approach: Theory chapters set the three readings side by side. Descriptive work on monetary base, repo operations, and related fiscal flows from public BCB and Treasury data. Written and defended in Portuguese.",
      "Results: Monograph plus defense slides. Frames the period's financing choices against inflation risk, debt stock, and Emergency Regime limits, including how central-bank operations sat next to Treasury issuance.",
      "Stack: Macroeconomic theory, econometric descriptive analysis, BCB/Treasury public data.",
    ],
    tags: ["Macroeconomics", "Public Finance", "Monetary Policy", "Economic Theory"],
    files: [
      { label: "Full Monograph", href: "/projects/monograph/Monografia-Makino.pdf" },
      { label: "Defense Slides", href: "/projects/monograph/Defesa Monografia.pdf", icon: "presentation" },
    ],
  },
  {
    slug: "fortune-1000",
    title: "2024 Fortune 1000 Companies",
    category: "CE-874 Final Project",
    summary:
      "Team project on ~795 Fortune 1000 firms: next-year revenue and rank checks with KNN, Random Forest, SVR, and MLP in Python.",
    details: [
      "Overview: CE-874 intro data science team of four. Built a 2020-2024 Fortune panel (795 companies after alignment) to predict next-year revenue from prior filings (revenue, employees, market cap, profits, assets) and to check 2025 ranking outcomes across KNN, Random Forest, SVR, and MLP.",
      "Problem: Next-year revenue and rank jump around when you only have a few years of filings. Linear regression also breaks down when revenue, employees, market cap, profits, and assets move together.",
      "Approach: Train/test split on the multi-year panel. Fit KNN regression, Random Forest, SVR, and MLP in scikit-learn with grid search and cross-validation, then compared holdout fit against a linear baseline that multicollinearity breaks.",
      "Results: Report compares holdout fit across those models and shows how far the nonlinear ones get once multicollinearity wrecks plain OLS.",
      "Stack: Python, Scikit-Learn, KNN, Random Forest, SVR, MLP, pandas.",
    ],
    tags: ["Python", "Scikit-Learn", "KNN", "Random Forest", "SVR", "Neural Networks"],
    files: [{ label: "Project Report", href: "/projects/fortune-1000/report.pdf" }],
  },
  {
    slug: "inss-covid-impact",
    title: "COVID-19 Impact Analysis of Brazil's Federal Revenues",
    category: "CE-442 Final Project",
    summary:
      "Econometrics paper using SARIMA and intervention analysis to measure how COVID lockdowns cut Brazil's federal tax receipts compared to the pre-pandemic trend.",
    details: [
      "Overview: CE-442 methods project with a team of three on monthly Brazilian federal tax receipts (arrecadação). Box-Jenkins / auto.arima pre-intervention fit, then an intervention test around the March 2020 lockdown shock.",
      "Problem: Lockdowns hit collections hard, but revenue already had a pre-2020 path. The gap to measure is pandemic shock vs underlying trend.",
      "Approach: Seasonal ARIMA models in R on pre-pandemic months. Fitted series used as a no-COVID counterfactual. Gap between counterfactual and actuals during lockdown months treated as the intervention effect, with permanent and temporary dummy specs.",
      "Results: Paper reports the estimated monthly revenue shortfall relative to the pre-COVID path. Residual checks (Ljung-Box, normality, variance) are documented before the policy write-up.",
      "Stack: R, SARIMA/ARIMA, intervention analysis, Box-Jenkins methodology.",
    ],
    tags: ["R", "ARIMA/SARIMA", "Time Series", "Fiscal Analysis", "Forecasting"],
    files: [{ label: "Project Report", href: "/projects/covid-impact/report.pdf" }],
  },
];