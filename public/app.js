* {
  box-sizing: border-box;
}

:root {
  --bg: #0b1020;
  --panel: #121a2e;
  --panel-strong: #1b2440;
  --border: rgba(148, 163, 184, 0.18);
  --text: #e5eefb;
  --muted: #9aa8c6;
  --accent: #7dd3fc;
  --accent-strong: #38bdf8;
  --shadow: rgba(15, 23, 42, 0.45);
}

body {
  margin: 0;
  min-height: 100vh;
  background: linear-gradient(135deg, #0b1020, #111827 45%, #172554);
  color: var(--text);
  font-family: Inter, 'Segoe UI', sans-serif;
}

.shell {
  max-width: 1100px;
  margin: 0 auto;
  padding: 32px 20px 48px;
}

.topbar {
  margin-bottom: 28px;
}

.brand-group {
  display: flex;
  align-items: center;
  gap: 16px;
}

.brand-mark {
  width: 46px;
  height: 46px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, var(--accent), var(--accent-strong));
  color: #04121d;
  font-size: 1.2rem;
  font-weight: 800;
  box-shadow: 0 14px 35px rgba(56, 189, 248, 0.35);
}

h1 {
  margin: 0;
  font-size: clamp(1.5rem, 3vw, 2.5rem);
}

.brand-group p {
  margin: 4px 0 0;
  color: var(--muted);
}

.content {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.search-bar {
  display: flex;
  gap: 12px;
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 12px 14px;
  box-shadow: 0 16px 36px var(--shadow);
}

.search-bar input {
  flex: 1;
  background: transparent;
  border: none;
  color: var(--text);
  font-size: 1rem;
  outline: none;
}

.search-bar input::placeholder {
  color: var(--muted);
}

.search-bar button,
.suggestion {
  border: none;
  border-radius: 12px;
  padding: 0.8rem 1.1rem;
  background: linear-gradient(135deg, var(--accent), var(--accent-strong));
  color: #04121d;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.15s ease, opacity 0.15s ease;
}

.search-bar button:hover,
.suggestion:hover {
  transform: translateY(-1px);
}

.quick-links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.suggestion {
  background: rgba(148, 163, 184, 0.08);
  color: var(--text);
  border: 1px solid var(--border);
}

.status-panel {
  border: 1px solid var(--border);
  background: rgba(17, 24, 39, 0.9);
  padding: 14px 18px;
  border-radius: 14px;
  color: var(--muted);
}

.results {
  display: grid;
  gap: 14px;
}

.result-card {
  border: 1px solid var(--border);
  background: rgba(17, 24, 39, 0.9);
  border-radius: 16px;
  padding: 16px 18px;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.2);
}

.result-card h2 {
  margin: 0 0 8px;
  font-size: 1.08rem;
}

.result-card a {
  color: var(--accent);
  text-decoration: none;
}

.result-card a:hover {
  text-decoration: underline;
}

.result-card p {
  margin: 0;
  color: var(--muted);
  line-height: 1.55;
}

.empty-state {
  border: 1px dashed var(--border);
  border-radius: 16px;
  background: rgba(17, 24, 39, 0.45);
  color: var(--muted);
  padding: 30px 18px;
  text-align: center;
}

@media (max-width: 640px) {
  .search-bar {
    flex-direction: column;
  }

  .search-bar button {
    width: 100%;
  }
}
