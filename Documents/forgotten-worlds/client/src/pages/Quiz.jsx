import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { pickQuiz } from "../data/quiz.js";
import { useProgress, BADGES } from "../lib/progress.jsx";
import { getLeaderboard, submitScore } from "../lib/api.js";

export default function Quiz() {
  const { score: saveScore, badges } = useProgress();
  const [qs, setQs] = useState(() => pickQuiz(5));
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [name, setName] = useState("");
  const [saved, setSaved] = useState(null);
  const [board, setBoard] = useState({ rows: [], source: "" });

  const q = qs[i];
  const choose = (n) => {
    if (picked !== null) return; // no repeated points on the same question
    setPicked(n);
    if (n === q.answer) setScore((s) => s + 1);
  };
  const next = () => {
    if (i + 1 < qs.length) {
      setI(i + 1);
      setPicked(null);
    } else {
      setDone(true);
      saveScore(score);
    }
  };
  const again = () => {
    setQs(pickQuiz(5));
    setI(0);
    setPicked(null);
    setScore(0);
    setDone(false);
    setSaved(null);
  };
  useEffect(() => {
    getLeaderboard().then(setBoard);
  }, [saved]);

  const save = async (e) => {
    e.preventDefault();
    const where = await submitScore(name.trim().slice(0, 20) || "Explorer", score, qs.length);
    setSaved(where);
  };

  return (
    <section className="page narrow">
      <h1>Space knowledge quiz</h1>
      {!done ? (
        <div className="quiz">
          <div className="progress" role="progressbar" aria-valuemin="0" aria-valuemax={qs.length} aria-valuenow={i + (picked !== null ? 1 : 0)}>
            <motion.div animate={{ width: ((i + (picked !== null ? 1 : 0)) / qs.length) * 100 + "%" }} />
          </div>
          <p className="muted">Question {i + 1} of {qs.length} · Score {score}</p>
          <AnimatePresence mode="wait">
            <motion.div key={q.id} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <h2>{q.q}</h2>
              <div className="options">
                {q.options.map((o, n) => {
                  const state = picked === null ? "" : n === q.answer ? "right" : n === picked ? "wrong" : "dim";
                  return (
                    <motion.button key={o} className={`opt ${state}`} onClick={() => choose(n)} disabled={picked !== null} whileTap={{ scale: 0.97 }} animate={state === "wrong" ? { x: [0, -8, 8, -4, 0] } : {}}>
                      {o} {state === "right" && "✅"}{state === "wrong" && "❌"}
                    </motion.button>
                  );
                })}
              </div>
              {picked !== null && (
                <motion.div className={`feedback ${picked === q.answer ? "ok" : "no"}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} role="status">
                  <b>{picked === q.answer ? "Correct!" : "Not quite."}</b> {q.why}{" "}
                  <Link to={`/machine/${q.machine}`}>Read the story →</Link>
                  <div><button className="btn small" onClick={next}>{i + 1 < qs.length ? "Next question" : "See my score"}</button></div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <motion.div className="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="big-score">{score}<small>/{qs.length}</small></div>
          <p>{score === qs.length ? "Perfect! You're a Space Knowledge Master. 🏆" : score >= 3 ? "Great job, explorer! 🚀" : "Good try! Read a few stories and play again. 🌍"}</p>
          {saved ? (
            <p className="muted">Saved to the leaderboard ({saved}).</p>
          ) : (
            <form onSubmit={save} className="row center">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name (optional)" maxLength={20} aria-label="Your name" />
              <button className="btn small">Save my score</button>
            </form>
          )}
          <button className="btn" onClick={again}>Play again</button>
        </motion.div>
      )}

      <aside className="board">
        <h3>Leaderboard <span className="muted small">({board.source || "…"})</span></h3>
        {board.rows.length ? (
          <ol>{board.rows.map((r, n) => <li key={n}><span>{r.name}</span><b>{r.score}/{r.total}</b></li>)}</ol>
        ) : (
          <p className="muted">No scores yet. Be the first!</p>
        )}
      </aside>

      <aside className="badges">
        <h3>Your badges</h3>
        <div className="grid2">
          {BADGES.map((b) => (
            <div key={b.id} className={"badge" + (badges.includes(b.id) ? " got" : "")}>
              <span>{b.emoji}</span><div><b>{b.title}</b><br /><small>{b.how}</small></div>
            </div>
          ))}
        </div>
      </aside>
    </section>
  );
}
