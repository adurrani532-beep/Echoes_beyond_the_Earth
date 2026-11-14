import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { machines } from "../data/machines.js";

const KEY = "fw-progress-v1";
const Ctx = createContext(null);

export const BADGES = [
  { id: "moon", title: "Moon Explorer", emoji: "🌕", how: "Read every Moon story." },
  { id: "mars", title: "Mars Detective", emoji: "🔴", how: "Read every Mars story." },
  { id: "historian", title: "Mission Historian", emoji: "📜", how: "Open the timeline and select 5 milestones." },
  { id: "master", title: "Space Knowledge Master", emoji: "🏆", how: "Score 5/5 in the quiz." }
];

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {};
  } catch {
    return {};
  }
}

export function ProgressProvider({ children }) {
  const [state, setState] = useState(() => ({ visited: [], milestones: 0, bestScore: 0, badges: [], ...load() }));
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* storage may be unavailable */
    }
  }, [state]);

  const award = useCallback((s) => {
    const earned = new Set(s.badges);
    const moon = machines.filter((m) => m.destination === "Moon").map((m) => m.id);
    const mars = machines.filter((m) => m.destination === "Mars").map((m) => m.id);
    if (moon.every((id) => s.visited.includes(id))) earned.add("moon");
    if (mars.every((id) => s.visited.includes(id))) earned.add("mars");
    if (s.milestones >= 5) earned.add("historian");
    if (s.bestScore >= 5) earned.add("master");
    const fresh = [...earned].filter((b) => !s.badges.includes(b));
    return { next: { ...s, badges: [...earned] }, fresh };
  }, []);

  const update = useCallback(
    (fn) => {
      setState((prev) => {
        const { next, fresh } = award(fn(prev));
        if (fresh.length) {
          const b = BADGES.find((x) => x.id === fresh[0]);
          setTimeout(() => setToast(b), 0);
        }
        return next;
      });
    },
    [award]
  );

  const api = useMemo(
    () => ({
      ...state,
      visit: (id) => update((s) => (s.visited.includes(id) ? s : { ...s, visited: [...s.visited, id] })),
      milestone: () => update((s) => ({ ...s, milestones: s.milestones + 1 })),
      score: (n) => update((s) => ({ ...s, bestScore: Math.max(s.bestScore, n) })),
      reset: () => setState({ visited: [], milestones: 0, bestScore: 0, badges: [] }),
      toast,
      clearToast: () => setToast(null)
    }),
    [state, toast, update]
  );

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export const useProgress = () => useContext(Ctx);
