import "dotenv/config";
import express from "express";
import cors from "cors";
import { connect, isDb, listMachines, addScore, topScores } from "./store.js";
import { quizPool } from "../client/src/data/quiz.js";

const app = express();
const origins = (process.env.CORS_ORIGIN || "*").split(",").map((s) => s.trim());
app.use(cors({ origin: origins.includes("*") ? true : origins }));
app.use(express.json({ limit: "10kb" }));

// Very small per-IP rate limit for score submissions.
const hits = new Map();
function limit(req, res, next) {
  const now = Date.now();
  const list = (hits.get(req.ip) || []).filter((t) => now - t < 60_000);
  if (list.length >= 10) return res.status(429).json({ error: "Too many requests" });
  list.push(now);
  hits.set(req.ip, list);
  next();
}

app.get("/api/health", (_req, res) => res.json({ ok: true, database: isDb() ? "mongodb" : "memory" }));

app.get("/api/machines", async (_req, res, next) => {
  try {
    res.json(await listMachines());
  } catch (e) {
    next(e);
  }
});

app.get("/api/machines/:id", async (req, res, next) => {
  try {
    const m = (await listMachines()).find((x) => x.id === req.params.id);
    m ? res.json(m) : res.status(404).json({ error: "Machine not found" });
  } catch (e) {
    next(e);
  }
});

app.get("/api/quiz", (_req, res) => res.json(quizPool));

app.get("/api/leaderboard", async (_req, res, next) => {
  try {
    res.json(await topScores(10));
  } catch (e) {
    next(e);
  }
});

app.post("/api/scores", limit, async (req, res, next) => {
  try {
    const { name, score, total } = req.body || {};
    const clean = String(name ?? "Explorer").replace(/[<>]/g, "").trim().slice(0, 20) || "Explorer";
    if (!Number.isInteger(score) || !Number.isInteger(total) || total < 1 || total > 10 || score < 0 || score > total) {
      return res.status(400).json({ error: "Invalid score" });
    }
    await addScore({ name: clean, score, total });
    res.status(201).json({ ok: true });
  } catch (e) {
    next(e);
  }
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Server error" });
});

const port = process.env.PORT || 4000;
connect(process.env.MONGODB_URI).then(() => app.listen(port, () => console.log(`API on :${port}`)));
