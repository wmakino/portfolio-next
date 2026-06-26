

import type { StaticImageData } from "next/image";

import creditRiskThumbnail from "../../public/images/thumbnails/credit-risk.png";
import aiGradingThumbnail from "../../public/images/thumbnails/ai-grading.png";
import canadaEvThumbnail from "../../public/images/thumbnails/canada-ev.png";
import f1Thumbnail from "../../public/images/thumbnails/f1-season.png";
import nycRideshareThumbnail from "../../public/images/thumbnails/nyc-rideshare.png";
import monographThumbnail from "../../public/images/thumbnails/monograph.png";
import fortuneThumbnail from "../../public/images/thumbnails/fortune-1000.png";
import covidImpactThumbnail from "../../public/images/thumbnails/covid-impact.png";
import cursorHackathonThumbnail from "../../public/images/thumbnails/cursor-hackathon.png";

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
  imageSrc: StaticImageData;
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
  tags: string[];
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
    description: "SQL, statistics, and BI tools for turning raw tables into decisions.",
    items: ["SQL", "Tableau", "Power BI", "Excel", "Statistics", "Predictive Analytics"],
  },
  {
    title: "Software & Cloud",
    description: "Web apps and APIs with Flask, React, and Next.js.",
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
      "Core courses span micro, macro, political economy, and Brazilian economic history. Upper years add econometrics, financial math, and dynamic models. Electives let you lean toward finance, data science, industrial org, or public policy. I wrote my monograph on monetary financing during COVID.",
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
    period: "Jul 2024 – Mar 2025",
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
    tags: ["Generative AI", "LLMs", "Databricks"],
  },
  {
    slug: "ielts-8",
    title: "IELTS Academic 8.0",
    issuer: "IELTS Official",
    issued: "Aug 2024",
    logo: "/images/logos/certs/ielts.png",
    tags: ["English"],
  },
  {
    slug: "alteryx-designer-core",
    title: "Alteryx Designer Core Certified",
    issuer: "Alteryx",
    issued: "Jul 2024",
    logo: "/images/logos/certs/alteryx.png",
    credentialUrl: "https://www.credly.com/badges/6709f041-fd9b-4b3f-b8ef-0eaa3c12d025/linked_in_profile",
    tags: ["Alteryx", "Data Analytics", "ETL"],
  },
  {
    slug: "azure-ai-fundamentals",
    title: "AI-900: Azure AI Fundamentals",
    issuer: "Microsoft",
    issued: "May 2024",
    logo: "/images/logos/certs/microsoft.png",
    credentialUrl:
      "https://learn.microsoft.com/api/credentials/share/en-gb/wmakino/6A90AE0962DD3313?sharingId=FEF3035517876BE0",
    tags: ["Microsoft Azure", "Artificial Intelligence"],
  },
  {
    slug: "azure-fundamentals",
    title: "AZ-900: Azure Fundamentals",
    issuer: "Microsoft",
    issued: "May 2024",
    logo: "/images/logos/certs/microsoft.png",
    credentialUrl:
      "https://learn.microsoft.com/api/credentials/share/en-gb/wmakino/2FB360F7720BE6AC?sharingId=FEF3035517876BE0",
    tags: ["Microsoft Azure", "Cloud Computing"],
  },
  {
    slug: "power-bi-analyst",
    title: "PL-300: Power BI Data Analyst Associate",
    issuer: "Microsoft",
    issued: "Mar 2024",
    logo: "/images/logos/certs/microsoft.png",
    credentialUrl:
      "https://learn.microsoft.com/api/credentials/share/en-gb/wmakino/722F1669FEA53A33?sharingId=FEF3035517876BE0",
    tags: ["Microsoft Power BI", "Data Analytics"],
  },
  {
    slug: "datacamp-analyst",
    title: "Data Analyst Associate",
    issuer: "DataCamp",
    issued: "Nov 2023",
    logo: "/images/logos/certs/datacamp.png",
    credentialUrl: "https://www.datacamp.com/certificate/DAA0019539704178",
    tags: ["Data Management", "Data Analytics", "SQL", "Python"],
  },
  {
    slug: "enap-r-analysis",
    title: "Data Analysis in R",
    issuer: "ENAP — National School of Public Administration",
    issued: "Oct 2023",
    logo: "/images/logos/certs/enap.png",
    tags: ["Data Analytics", "R"],
  },
  {
    slug: "google-data-analytics",
    title: "Google Data Analytics",
    issuer: "Google",
    issued: "Sep 2023",
    logo: "/images/logos/certs/google.png",
    credentialUrl: "https://www.coursera.org/share/ed08929d9c7ee82f21c3aaf2060e8fa9",
    tags: ["Data Analytics", "pandas", "SQL"],
  },
  {
    slug: "extecamp-fundamental-analysis",
    title: "Fundamental Analysis",
    issuer: "Extecamp — UNICAMP",
    issued: "Nov 2022",
    logo: "/images/logos/certs/extecamp.png",
    tags: ["Valuation", "Finance"],
  },
  {
    slug: "ef-set-c2",
    title: "EF SET English Certificate 81/100 (C2 Proficient)",
    issuer: "EF SET",
    issued: "Aug 2022",
    logo: "/images/logos/certs/ef-set.png",
    tags: ["English"],
  },
  {
    slug: "ielts-7-5",
    title: "IELTS Academic 7.5",
    issuer: "IELTS Official",
    issued: "Feb 2018",
    logo: "/images/logos/certs/ielts.png",
    tags: ["English"],
  },
];

export const projectItems: ProjectItem[] = [
  {
    slug: "cursor-hackathon",
    title: "Smart Inbox (Cursor Hackathon)",
    category: "Hackathon Product Prototype",
    imageSrc: cursorHackathonThumbnail,
    summary:
      "24-hour hackathon build: Gmail triage mockup with sorted buckets, urgency counts, sign-in flow, and a dense priority dashboard.",
    details: [
      "Overview: Built in 24 hours at the Cursor Calgary Hackathon (SAIT) with a team of three. One prompt for the whole build. We demoed the landing page, sign-in flow, and dashboard to the jury.",
      "Problem: Most inboxes mix urgent replies, receipts, newsletters, and FYI threads in one chronological list. We wanted a screen that surfaces what needs a decision first.",
      "Approach: Split the product into a landing page, Google sign-in screen, and operational dashboard. Incoming mail routes into Action Required, Transactions, Newsletters & Promos, and In the Loop. Each bucket gets counts, overdue flags, and sample threads so you can see the backlog on one screen.",
      "Results: Demo showed how a busy user clears overdue replies first instead of scrolling chronologically. Buckets and counts make it obvious where time goes. Live build used Gmail APIs, Google Auth, and GPT-5-mini; the portfolio file is a static export of that UI.",
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
    imageSrc: creditRiskThumbnail,
    summary:
      "Dual final project: train a credit-risk classifier with EDA and tuning, then ship it through a Flask app with a lending form, live scores, and SHAP explanations.",
    details: [
      "Overview: Combined DATA-440 (predictive modeling) and ARTI-404 (web development) into one deliverable. The model needed to be accurate and explainable so a lender could see why a score moved.",
      "Problem: Credit decisions need a score and a reason. Staff also need a form they can submit without opening a notebook.",
      "Approach: Ran full EDA and hyperparameter tuning in Python before locking features. Wrapped the classifier in Flask with a custom lending form, validation, and SQLite persistence. Every submission stores the prediction plus SHAP values so the results screen names the top contributors.",
      "Results: A loan officer can submit an application, get a risk score, and explain the top drivers to an applicant in the same session. Stored history supports review if a decision gets questioned later. Notebook and architecture exports cover the modeling work separately from the live app.",
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
    imageSrc: aiGradingThumbnail,
    summary:
      "Human-centered AI grading concept: instructors set rubrics and strictness, review every AI suggestion, and keep final approval over scores and feedback.",
    details: [
      "Overview: ARTI-406 final project on human-centered AI in education. Cut grading busywork while keeping the instructor as the person who posts the final grade.",
      "Problem: Full auto-grading saves time but raises fairness, privacy, and trust issues. Instructors still need control and a clear audit trail from rubric to score.",
      "Approach: Designed a rubric-first flow in an interactive web mockup. Educators pick strictness (strict, medium, lenient), upload criteria, and review batch suggestions one by one. Each proposed score or comment links back to the rubric line that triggered it. Iterated wireframes after instructor feedback; early versions hid too much of the model's reasoning.",
      "Results: Instructors could batch-review AI suggestions instead of writing every comment from scratch, while still posting the grade themselves. The mockup and report spell out where time saves and where human review stays mandatory (bias, privacy, approve-before-post).",
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
    imageSrc: canadaEvThumbnail,
    summary:
      "Capstone modeled as an NRCan consulting job: geospatial analysis, Monte Carlo budget runs, and demand forecasts to place EV chargers across Canada.",
    details: [
      "Overview: Data Analytics capstone framed as a consulting engagement for Natural Resources Canada. The ask was where to spend a fixed federal budget on EV charging given highways, population, and existing coverage.",
      "Problem: Standard chargers cost less per unit; fast chargers cost more but matter on highway corridors. Planners also need numbers that still make sense when fleet mix shifts.",
      "Approach: Built a Python pipeline with GeoPandas on GDB/shapefile data for the National Highway System, station points, and census boundaries. Applied an ecumene filter so empty land did not skew results. Ran 1,000 Monte Carlo iterations on a $100M budget with custom utility scoring and sensitivity checks. Added registration trends for scenario forecasts under different EV adoption paths.",
      "Results: Deliverables gave NRCan-style guidance on stretching a $100M budget across populated corridors vs fast-charger coverage. Poster, slides, and report let a planner compare mixes under different EV adoption paths instead of betting on one map.",
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
    imageSrc: f1Thumbnail,
    summary:
      "2024 F1 season analysis in Excel using OpenF1 data, kNN and regression models, plus Monte Carlo simulations for championship points.",
    details: [
      "Overview: DATA-415 statistical analysis project on the 2024 Formula 1 season. Race-by-race scenario tests for championship points, with confidence bands instead of a single predicted table.",
      "Problem: Points standings swing on weather, crashes, safety cars, and pit timing. A straight extrapolation of past results misses most of what actually moves championships.",
      "Approach: Pulled telemetry, tire degradation, and pit-stop data from the OpenF1 API. Built kNN models to place drivers in performance tiers and linear regressions to relate pace to setup and track type. Ran Monte Carlo race simulations (thousands of scenarios with probability weights) to produce confidence bands on driver and constructor points.",
      "Results: Workbook lets you test how a safety car or DNF reshapes title odds before committing to a race strategy. Confidence bands show how wide the championship race still is. Written report states assumptions so numbers are not read as prophecy.",
      "Stack: Excel, OpenF1 API, kNN, linear regression, Monte Carlo simulation.",
    ],
    tags: ["Excel", "Monte Carlo", "kNN", "Linear Regression", "Scenario Forecasting"],
    files: [{ label: "Project Report", href: "/projects/f1-analysis/report.pdf" }],
  },
  {
    slug: "daan-predictive-analytics",
    title: "NYC Rideshare Trips",
    category: "DATA-420 Final Project",
    imageSrc: nycRideshareThumbnail,
    summary:
      "Large-scale NYC rideshare study in R: clean messy trip data, cluster demand zones, and model fares and durations with trees and regression.",
    details: [
      "Overview: DATA-420 predictive analytics final on NYC rideshare trips. Millions of messy records across boroughs, so cleaning and plotting came before any model work.",
      "Problem: Operators need to know where trips originate, how fares and durations vary by time and borough, and which zones deserve staged drivers during peak windows.",
      "Approach: Started with EDA in R (missing values, fare outliers, borough-level patterns, time-of-day charts). Applied k-means on pickup and dropoff intensity to label high-demand zones. Trained decision trees and multivariate regression models to predict trip duration and fare from time, location, and related features.",
      "Results: Report tells operators which boroughs and time windows justify staging drivers and where extra cars sit idle. Shorter waits in hot zones; less wasted mileage in flat ones. Maps and cluster write-ups back the recommendations.",
      "Stack: R, k-means clustering, decision trees, multivariate regression, EDA.",
    ],
    tags: ["R", "k-Means Clustering", "Decision Trees", "Regression", "Exploratory Data Analysis"],
    files: [{ label: "Project Report", href: "/projects/nyc-rideshare/Final-Project.pdf" }],
  },
  {
    slug: "monograph-capstone",
    title: "Monetary Financing & COVID-19",
    category: "CE-825 Final Project",
    imageSrc: monographThumbnail,
    summary:
      "Year-long UNICAMP thesis comparing macro schools on Brazil's COVID-era monetary financing, backed by BCB and Treasury data.",
    details: [
      "Overview: CE-825 bachelor's monograph developed over two semesters at UNICAMP. Links macro theory to Brazil's pandemic fiscal response with BCB and Treasury data.",
      "Problem: Brazil's federal government expanded spending during COVID while debate continued over monetary financing, debt issuance, and institutional limits under the Emergency Regime (War Budget).",
      "Approach: Compared Campinas School, UFRJ political economy, and orthodox readings on the costs and risks of monetary financing. Pulled BCB and National Treasury series on the monetary base, repo operations, and related fiscal flows through 2020–2021.",
      "Results: Defended thesis (Portuguese monograph and slides) that frames Brazil's COVID financing choices for readers who care about inflation risk, debt stock, and what the Emergency Regime allowed. Useful for anyone comparing central-bank purchases to Treasury issuance in that period.",
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
    imageSrc: fortuneThumbnail,
    summary:
      "Team econometrics-meets-ML project: forecast Fortune 1000 revenue growth and rank moves with Random Forest, SVR, and MLP models in Python.",
    details: [
      "Overview: CE-874 (intro data science) team project with four students. I owned the modeling pipeline and most of the data cleaning before we merged sections into one report.",
      "Problem: Fortune 1000 rank changes depend on noisy financial filings with missing fields and sector-specific behavior. Tech firms move differently from heavy industry.",
      "Approach: Aligned revenue, debt, R&D, and related ratios across companies. Trained Random Forest, SVR, and MLP regressors in scikit-learn, with grid search and cross-validation to limit overfit. Compared feature importance by sector (debt load, R&D spend, and similar inputs) against rank movement.",
      "Results: Team report shows which financial ratios tracked Fortune 1000 rank moves by sector, so predictions come with a plain-language reason (R&D spend, debt load, and similar inputs). Helps an analyst spot warning signs in filings before rank changes hit the published list.",
      "Stack: Python, Scikit-Learn, Random Forest, SVR, MLP, pandas.",
    ],
    tags: ["Python", "Scikit-Learn", "Neural Networks", "Random Forest", "SVR"],
    files: [{ label: "Project Report", href: "/projects/fortune-1000/report.pdf" }],
  },
  {
    slug: "inss-covid-impact",
    title: "COVID-19 Impact Analysis of Brazil’s Federal Revenues",
    category: "CE-442 Final Project",
    imageSrc: covidImpactThumbnail,
    summary:
      "Econometrics paper using SARIMA and intervention analysis to measure how COVID lockdowns cut Brazil's federal tax receipts compared to the pre-pandemic trend.",
    details: [
      "Overview: CE-442 methods project on Brazilian federal tax revenue during COVID. The assignment called for time-series modeling, not a chart of receipts trending down.",
      "Problem: Lockdowns hit collections hard, but revenue was already on a path before 2020. The analysis needed to separate the pandemic shock from the underlying trend.",
      "Approach: Fit seasonal ARIMA models in R on pre-pandemic monthly receipts (Box-Jenkins workflow). Used the fitted series as a counterfactual for what revenue would have been without COVID. Measured the gap between counterfactual and actuals during lockdown months as the intervention effect.",
      "Results: Paper puts a monthly figure on how much federal tax revenue lockdowns cost above the pre-COVID trend, which matters for sizing emergency spending and later tax debates. Residual checks (Ljung-Box, normality, variance) are documented before the policy section.",
      "Stack: R, SARIMA/ARIMA, intervention analysis, Box-Jenkins methodology.",
    ],
    tags: ["R", "ARIMA/SARIMA", "Time Series", "Fiscal Analysis", "Forecasting"],
    files: [{ label: "Project Report", href: "/projects/covid-impact/report.pdf" }],
  },
];