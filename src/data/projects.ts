export type Category = "All" | "Web" | "Data" | "AI";

export type Project = {
  id: "chocolate" | "gdp" | "api" | "portfolio";
  title: string;
  summary: string;
  detail: string;
  category: Exclude<Category, "All">;
  tags: readonly string[];
  repository: string;
  demo?: string;
  image?: string;
};

export const projects: readonly Project[] = [
  {
    id: "chocolate",
    title: "Chocolate sales dashboard",
    summary:
      "Interactive Python and Streamlit dashboard for analyzing sales by country, product, and salesperson.",
    detail:
      "The project presents chocolate sales data through an interactive Streamlit dashboard.",
    category: "Data",
    tags: ["Python", "Streamlit"],
    repository: "https://github.com/SeJay134/Chocolate-Sales-Dashboard-Python",
    demo: "https://sergei-chocolate-sales-dashboard.streamlit.app/",
    image: "/images/chocolate.webp",
  },
  {
    id: "gdp",
    title: "GDP dashboard",
    summary:
      "Python Streamlit application showing GDP data for countries around the world.",
    detail:
      "The project uses Streamlit to present country GDP data in an interactive application.",
    category: "Data",
    tags: ["Python", "Streamlit"],
    repository: "https://github.com/SeJay134/GDP-Dashboard-Python",
    demo: "https://gdp-dashboard-99adkaf6mof.streamlit.app/",
    image: "/images/gdp.webp",
  },
  {
    id: "api",
    title: "Open API explorer",
    summary:
      "Website built with HTML, CSS, and JavaScript that fetches and displays data from an open-source API.",
    detail:
      "The project demonstrates browser-side API consumption using HTML, CSS, and JavaScript.",
    category: "Web",
    tags: ["HTML", "CSS", "JavaScript", "API"],
    repository: "https://github.com/SeJay134/Open-API-Project-JS",
    demo: "https://open-api-project-vert.vercel.app",
  },
  {
    id: "portfolio",
    title: "Portfolio & AI assistant",
    summary:
      "Portfolio assistant using Flask, Ollama, FAISS retrieval, and sentence-transformer embeddings.",
    detail:
      "The assistant accepts independent questions and grounds answers in reviewed portfolio evidence while the portfolio remains usable when the backend is offline.",
    category: "AI",
    tags: ["Flask", "Ollama", "FAISS", "RAG"],
    repository: "https://github.com/SeJay134/Portfolio-JS-HTML-CSS",
  },
] as const;
