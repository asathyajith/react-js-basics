import { useTransition, useState } from "react";

/*
 * useTransition (React 18) — marks a state update as a non-urgent
 * "transition". React keeps the UI responsive by letting urgent updates
 * (typing, clicks) interrupt the slow transition render.
 *
 * const [isPending, startTransition] = useTransition();
 *
 * - startTransition(() => setState(...)) : update rendered at low priority
 * - isPending : true while the transition render is in progress
 *   (perfect for spinners/dimming).
 */

// Simulate an expensive list: each item wastes a little CPU to render.
function SlowItem({ text }) {
  const start = performance.now();
  while (performance.now() - start < 1) {
    // burn ~1ms per item
  }
  return <li>{text}</li>;
}

function SlowList({ query }) {
  const items = [];
  for (let i = 0; i < 300; i++) {
    items.push(<SlowItem key={i} text={`${query} — result ${i}`} />);
  }
  return <ul>{items}</ul>;
}

// 1. Keep the input snappy while a heavy list re-renders
export function SearchWithTransition() {
  const [input, setInput] = useState("");   // urgent: what the user typed
  const [query, setQuery] = useState("");   // non-urgent: drives the slow list
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    setInput(e.target.value); // updates immediately — typing stays smooth
    startTransition(() => {
      setQuery(e.target.value); // slow render, interruptible
    });
  };

  return (
    <div>
      <input value={input} onChange={handleChange} placeholder="type fast…" />
      <div style={{ opacity: isPending ? 0.4 : 1 }}>
        <SlowList query={query} />
      </div>
    </div>
  );
}

// 2. Tab switching without freezing the clicked tab
export function Tabs() {
  const [tab, setTab] = useState("home");
  const [isPending, startTransition] = useTransition();

  const select = (next) =>
    startTransition(() => {
      setTab(next); // rendering the heavy tab won't block the click feedback
    });

  return (
    <div>
      {["home", "posts", "about"].map((t) => (
        <button
          key={t}
          onClick={() => select(t)}
          style={{ fontWeight: tab === t ? "bold" : "normal" }}
        >
          {t}
        </button>
      ))}
      {isPending && <p>Loading…</p>}
      {tab === "posts" ? <SlowList query="post" /> : <p>{tab} content</p>}
    </div>
  );
}

/*
 * useTransition vs useDeferredValue:
 * - useTransition: you own the state update -> wrap the setter.
 * - useDeferredValue: you only receive a value (e.g. a prop) -> defer it.
 */
