import { useDeferredValue, useState, useMemo, memo } from "react";

/*
 * useDeferredValue (React 18) — returns a "lagging" copy of a value.
 * During urgent updates React first re-renders with the OLD value,
 * then re-renders in the background with the new one.
 *
 * const deferred = useDeferredValue(value);
 *
 * Use when an expensive part of the UI depends on a fast-changing
 * value (usually text input) and you can't/don't want to wrap the
 * state update itself in startTransition.
 */

// Expensive child — memo() matters! It lets React skip re-rendering it
// while only the non-deferred parts changed.
const SlowResults = memo(function SlowResults({ query }) {
  const items = useMemo(() => {
    const out = [];
    for (let i = 0; i < 250; i++) {
      const start = performance.now();
      while (performance.now() - start < 1) {} // burn ~1ms per item
      out.push(`${query} — match ${i}`);
    }
    return out;
  }, [query]);

  return <ul>{items.map((t) => <li key={t}>{t}</li>)}</ul>;
});

export function DeferredSearch() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  // While typing: query updates instantly, deferredQuery lags behind,
  // so the input never janks.
  const isStale = query !== deferredQuery;

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="type fast…"
      />
      <div style={{ opacity: isStale ? 0.4 : 1 }}>
        <SlowResults query={deferredQuery} />
      </div>
    </div>
  );
}

/*
 * Notes:
 * - This is NOT debouncing: there's no fixed delay, and the background
 *   render is interruptible — React abandons it if the value changes again.
 * - Combine with memo() on the expensive child, otherwise the child
 *   still re-renders with every parent render and you gain nothing.
 * - `value !== deferredValue` tells you the shown content is stale.
 */
