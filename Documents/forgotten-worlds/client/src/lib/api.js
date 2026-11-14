import { useEffect, useState } from "react";
import { machines as localMachines } from "../data/machines.js";

const BASE = (import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "");

async function request(path, options) {
  const res = await fetch(BASE + path, { ...options, signal: AbortSignal.timeout(5000) });
  if (!res.ok) throw new Error("API " + res.status);
  return res.json();
}

// Machines are bundled with the site, so pages work with no backend.
// If the API answers, its (database) copy replaces the bundled one.
export function useMachines() {
  const [machines, setMachines] = useState(localMachines);
  useEffect(() => {
    let live = true;
    request("/machines")
      .then((data) => live && Array.isArray(data) && data.length && setMachines(data))
      .catch(() => {});
    return () => {
      live = false;
    };
  }, []);
  return machines;
}

const LB_KEY = "fw-leaderboard-v1";
const readLocal = () => {
  try {
    return JSON.parse(localStorage.getItem(LB_KEY)) || [];
  } catch {
    return [];
  }
};

export async function getLeaderboard() {
  try {
    const rows = await request("/leaderboard");
    return { rows, source: "online" };
  } catch {
    return { rows: readLocal(), source: "this device" };
  }
}

export async function submitScore(name, score, total) {
  try {
    await request("/scores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, score, total })
    });
    return "online";
  } catch {
    const rows = [...readLocal(), { name, score, total, createdAt: new Date().toISOString() }]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    try {
      localStorage.setItem(LB_KEY, JSON.stringify(rows));
    } catch {
      /* ignore */
    }
    return "this device";
  }
}
