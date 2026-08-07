type StackIcon = { src: string; label: string };

const clusters: Record<string, StackIcon[]> = {
  "ticket-labeller": [
    { src: "/images/stack/python.svg", label: "Python" },
    { src: "/images/stack/fastapi.svg", label: "FastAPI" },
    { src: "/images/stack/ollama.svg", label: "Ollama / Qwen" },
    { src: "/images/stack/microsoftazure.svg", label: "Azure" },
  ],
  "cursor-hackathon": [
    { src: "/images/stack/cursor.svg", label: "Cursor" },
    { src: "/images/stack/google.svg", label: "Google Auth" },
    { src: "/images/stack/nextdotjs.svg", label: "Next.js" },
    { src: "/images/stack/gmail.svg", label: "Gmail API" },
  ],
  "credit-risk-analysis": [
    { src: "/images/stack/python.svg", label: "Python" },
    { src: "/images/stack/flask.svg", label: "Flask" },
    { src: "/images/stack/scikitlearn.svg", label: "Scikit-learn" },
    { src: "/images/stack/sqlite.svg", label: "SQLite" },
  ],
  "ai-grading-system": [
    { src: "/images/stack/html5.svg", label: "HTML mockup" },
    { src: "/images/stack/css.svg", label: "CSS" },
    { src: "/images/stack/figma.svg", label: "UX / wireframes" },
  ],
  "capcon-ev-analysis": [
    { src: "/images/stack/python.svg", label: "Python" },
    { src: "/images/stack/geopandas.svg", label: "GeoPandas" },
    { src: "/images/stack/numpy.svg", label: "NumPy / Monte Carlo" },
    { src: "/images/stack/scipy.svg", label: "SciPy" },
  ],
  "daan-statistical-analysis": [
    { src: "/images/stack/microsoftexcel.svg", label: "Excel" },
    { src: "/images/stack/f1.svg", label: "F1 / OpenF1" },
  ],
  "daan-predictive-analytics": [
    { src: "/images/stack/r.svg", label: "R" },
    { src: "/images/stack/posit.svg", label: "Posit / RStudio" },
  ],
  "monograph-capstone": [
    { src: "/images/stack/unicamp.png", label: "UNICAMP" },
    { src: "/images/stack/mono-research.svg", label: "Research" },
    { src: "/images/stack/mono-thesis.svg", label: "Monograph" },
  ],
  "fortune-1000": [
    { src: "/images/stack/python.svg", label: "Python" },
    { src: "/images/stack/scikitlearn.svg", label: "Scikit-learn" },
    { src: "/images/stack/pandas.svg", label: "Pandas" },
    { src: "/images/stack/numpy.svg", label: "NumPy" },
  ],
  "inss-covid-impact": [
    { src: "/images/stack/r.svg", label: "R" },
    { src: "/images/stack/posit.svg", label: "Posit / RStudio" },
  ],
};

export function ProjectMark({
  slug,
  className,
  title,
}: {
  slug: string;
  className?: string;
  title?: string;
}) {
  const icons = clusters[slug] ?? clusters["fortune-1000"];
  return (
    <div
      className={className ?? "index-row__mark"}
      data-count={icons.length}
      role="img"
      aria-label={title ?? "Project stack"}
    >
      {icons.map((icon) => (
        <span
          key={icon.src}
          className="index-row__mark-glyph"
          title={icon.label}
          aria-hidden="true"
          style={{
            maskImage: `url(${icon.src})`,
            WebkitMaskImage: `url(${icon.src})`,
          }}
        />
      ))}
    </div>
  );
}
