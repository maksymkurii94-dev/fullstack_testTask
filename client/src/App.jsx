import { useEffect, useState } from "react";

export default function App() {
  const [health, setHealth] = useState(null);

  useEffect(() => {
    fetch("/api/health")
      .then((r) => r.json())
      .then(setHealth)
      .catch(() => setHealth({ ok: false }));
  }, []);

  return (
    <main className="app">
      <h1>Partner Dashboard</h1>
      <p>Monorepo: client (Vite) + server (Express)</p>
      <p>API: {health ? JSON.stringify(health) : "loading…"}</p>
    </main>
  );
}
