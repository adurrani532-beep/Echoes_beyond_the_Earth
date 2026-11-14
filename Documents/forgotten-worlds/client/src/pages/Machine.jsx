import { lazy, Suspense, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMachines } from "../lib/api.js";
import { useProgress } from "../lib/progress.jsx";
import Timeline from "../components/Timeline.jsx";
const ModelViewer = lazy(() => import("../components/ModelViewer.jsx"));
import Media from "../components/Media.jsx";

const sections = [
  ["why", "Why was it sent?"],
  ["journey", "Its journey"],
  ["did", "What did it do?"],
  ["afterward", "What happened afterward?"],
  ["legacy", "Why should we remember it?"]
];

export default function Machine() {
  const { id } = useParams();
  const machines = useMachines();
  const { visit, milestone } = useProgress();
  const [view, setView] = useState("photo");
  const [photo, setPhoto] = useState(0);
  const idx = machines.findIndex((m) => m.id === id);
  const m = machines[idx];
  useEffect(() => {
    if (m) visit(m.id);
    setView("photo");
    setPhoto(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!m) {
    return (
      <section className="page center">
        <h1>Machine not found</h1>
        <Link className="btn" to="/explore">Back to Explore</Link>
      </section>
    );
  }
  const prev = machines[(idx - 1 + machines.length) % machines.length];
  const next = machines[(idx + 1) % machines.length];
  const shots = m.gallery && m.gallery.length ? m.gallery : null;
  const facts = [
    ["Destination", m.destination],
    ["Type", m.type],
    ["Launch", m.launchDate],
    ["Arrival", m.arrivalDate],
    ["Where is it now?", m.location],
    ["Status", m.status]
  ];

  return (
    <article className="page machine">
      <Link to="/explore" className="back">← All machines</Link>
      <h1>{m.name}</h1>
      <p className="lead">{m.hook}</p>

      <div className="media-box">
        <div className="tabs small-tabs" role="tablist">
          <button role="tab" aria-selected={view === "photo"} className={view === "photo" ? "on" : ""} onClick={() => setView("photo")}>📷 Photos</button>
          <button role="tab" aria-selected={view === "3d"} className={view === "3d" ? "on" : ""} onClick={() => setView("3d")}>🧊 3D view</button>
        </div>
        {view === "photo" ? (
          shots ? (
            <figure>
              <img className="big" src={shots[photo].src} alt={shots[photo].caption} />
              <figcaption>{shots[photo].caption} <span className="muted">Credit: {shots[photo].credit}.</span></figcaption>
              {shots.length > 1 && (
                <div className="thumbs">
                  {shots.map((s, n) => (
                    <button key={s.src} onClick={() => setPhoto(n)} aria-label={`Show photo ${n + 1}`} className={n === photo ? "on" : ""}>
                      <img src={s.src} alt="" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
            </figure>
          ) : (
            <Media machine={m} className="big" />
          )
        ) : (
          <div>
            <Suspense fallback={<p className="muted">Loading 3D viewer…</p>}>
              <ModelViewer model={m.model} fallback={<Media machine={m} className="big" />} />
            </Suspense>
            <p className="credit">{m.model.credit}</p>
          </div>
        )}
      </div>

      <dl className="facts">
        {facts.map(([k, v]) => (
          <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
        ))}
      </dl>

      {sections.map(([key, title], i) => (
        <section key={key} className="story-block">
          <h2><span>{i + 1}</span>{title}</h2>
          <p>{m.story[key]}</p>
        </section>
      ))}

      <section className="story-block">
        <h2><span>6</span>Mission timeline</h2>
        <Timeline events={m.timeline} onSelect={milestone} />
      </section>

      <section className="story-block">
        <h2><span>7</span>Sources</h2>
        <ul className="sources">
          {m.sources.map((s) => (
            <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.title}</a></li>
          ))}
        </ul>
        <p className="muted small">Story text was written for this project from these sources and may be simplified for students.</p>
      </section>

      <nav className="pager" aria-label="Other machines">
        <Link to={`/machine/${prev.id}`}>← {prev.name}</Link>
        <Link to={`/machine/${next.id}`}>{next.name} →</Link>
      </nav>
    </article>
  );
}
