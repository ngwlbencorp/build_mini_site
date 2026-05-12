import { useEffect, useState } from "react";
import { Home } from "./pages/Home";
import { Problem } from "./pages/Problem";
import { Solution } from "./pages/Solution";
import { Research } from "./pages/Research";
import { Impact } from "./pages/Impact";
import { Video } from "./pages/Video";
import { Cost } from "./pages/Cost";

export type PageKey = "home" | "problem" | "solution" | "research" | "impact" | "video" | "cost";

const VALID: PageKey[] = ["home", "problem", "solution", "research", "impact", "video", "cost"];

function readHash(): PageKey {
  if (typeof window === "undefined") return "home";
  const raw = window.location.hash.replace(/^#\/?/, "") as PageKey;
  return VALID.includes(raw) ? raw : "home";
}

export default function App() {
  const [page, setPage] = useState<PageKey>("home");

  useEffect(() => {
    setPage(readHash());
    const onHash = () => setPage(readHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }, [page]);

  const navigate = (next: PageKey) => {
    try {
      window.location.hash = next === "home" ? "/" : `/${next}`;
    } catch {
      setPage(next);
    }
  };
  const goHome = () => navigate("home");

  return (
    <div className="min-h-screen w-full bg-slate-50">
      {page === "home" && <Home navigate={navigate} />}
      {page === "problem" && <Problem onBack={goHome} navigate={navigate} />}
      {page === "solution" && <Solution onBack={goHome} />}
      {page === "research" && <Research onBack={goHome} />}
      {page === "impact" && <Impact onBack={goHome} />}
      {page === "video" && <Video onBack={goHome} />}
      {page === "cost" && <Cost onBack={goHome} />}
    </div>
  );
}
