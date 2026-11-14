import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useProgress } from "../lib/progress.jsx";

export default function Toast() {
  const { toast, clearToast } = useProgress();
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(clearToast, 4500);
    return () => clearTimeout(t);
  }, [toast, clearToast]);
  return (
    <AnimatePresence>
      {toast && (
        <motion.div className="toast" role="status" initial={{ opacity: 0, y: -20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }}>
          <span className="toast-emoji">{toast.emoji}</span>
          <div><b>Badge unlocked!</b><br />{toast.title}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
