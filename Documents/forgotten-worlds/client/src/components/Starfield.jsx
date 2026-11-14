import { useEffect, useRef } from "react";

export default function Starfield() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w, h, stars, raf;
    const init = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      const count = Math.min(160, Math.floor((w * h) / 9000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.3,
        t: Math.random() * Math.PI * 2,
        s: Math.random() * 0.02 + 0.004,
        v: Math.random() * 0.08 + 0.02
      }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        s.t += s.s;
        s.y += reduce ? 0 : s.v;
        if (s.y > h) s.y = 0;
        ctx.globalAlpha = 0.45 + Math.sin(s.t) * 0.35;
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    init();
    draw();
    window.addEventListener("resize", init);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", init);
    };
  }, []);
  return <canvas ref={ref} className="starfield" aria-hidden="true" />;
}
