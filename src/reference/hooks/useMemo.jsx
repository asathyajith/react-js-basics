import { useMemo, useState } from "react";

/*
 * useMemo — caches (memoizes) the RESULT of a calculation between
 * renders. Recomputes only when a dependency changes.
 *
 * const value = useMemo(() => computeSomething(a, b), [a, b]);
 *
 * Use it for:
 *   - genuinely expensive calculations (filtering/sorting big lists),
 *   - keeping object/array identity stable so memoized children or
 *     other hooks' dependency arrays don't see a "new" value each render.
 *
 * It is an OPTIMIZATION, not a semantics tool — the code must work
 * correctly without it.
 */

// 1. Expensive computation cached
export function PrimeCounter() {
  const [limit, setLimit] = useState(1000);
  const [theme, setTheme] = useState("light"); // unrelated state

  // Without useMemo this would re-run on EVERY render,
  // including when only `theme` changes.
  const primeCount = useMemo(() => {
    console.log("counting primes up to", limit);
    let count = 0;
    for (let n = 2; n <= limit; n++) {
      let isPrime = true;
      for (let d = 2; d * d <= n; d++) {
        if (n % d === 0) { isPrime = false; break; }
      }
      if (isPrime) count++;
    }
    return count;
  }, [limit]); // recompute only when limit changes

  return (
    <div style={{ background: theme === "dark" ? "#333" : "#fff" }}>
      <input
        type="number"
        value={limit}
        onChange={(e) => setLimit(Number(e.target.value))}
      />
      <p>{primeCount} primes ≤ {limit}</p>
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        Toggle theme (does NOT recount)
      </button>
    </div>
  );
}

// 2. Derived data: filter + sort a list only when inputs change
export function FilteredList({ items = ["apple", "banana", "cherry", "avocado"] }) {
  const [query, setQuery] = useState("");

  const visible = useMemo(
    () =>
      items
        .filter((i) => i.toLowerCase().includes(query.toLowerCase()))
        .sort(),
    [items, query]
  );

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <ul>{visible.map((i) => <li key={i}>{i}</li>)}</ul>
    </div>
  );
}

// 3. Stable object identity for a memoized child / dependency array
export function StableObjectDemo({ userId }) {
  // Without useMemo, `options` would be a brand-new object every render,
  // defeating React.memo on the child and re-triggering effects.
  const options = useMemo(() => ({ id: userId, verbose: true }), [userId]);

  return <pre>{JSON.stringify(options)}</pre>;
}

/*
 * useMemo vs useCallback:
 *   useMemo(fn, deps)      caches fn's RETURN VALUE
 *   useCallback(fn, deps)  caches fn ITSELF
 *   useCallback(fn, deps) === useMemo(() => fn, deps)
 */
