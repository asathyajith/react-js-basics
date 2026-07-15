import { useState, useEffect, useRef, useCallback } from "react";

/*
 * Custom hooks — plain functions whose names start with "use" and that
 * call other hooks. They let you extract and REUSE stateful logic
 * (each component using the hook gets its OWN independent state).
 *
 * Rules of hooks apply: call them at the top level of a component or
 * another hook — never inside loops, conditions, or event handlers.
 */

// 1. useToggle — the simplest useful custom hook
export function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  const toggle = useCallback(() => setOn((v) => !v), []);
  return [on, toggle];
}

// 2. useLocalStorage — useState that persists across page reloads
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// 3. useFetch — data fetching with loading/error state
export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => !cancelled && setData(json))
      .catch((err) => !cancelled && setError(err))
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true; // ignore responses from a stale url
    };
  }, [url]);

  return { data, loading, error };
}

// 4. useDebounce — delay a fast-changing value (search-as-you-type)
export function useDebounce(value, delayMs = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(id); // reset the timer on every change
  }, [value, delayMs]);

  return debounced;
}

// 5. useInterval — declarative setInterval with a pausable delay
export function useInterval(callback, delayMs) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback; // always call the latest version
  }, [callback]);

  useEffect(() => {
    if (delayMs === null) return; // pass null to pause
    const id = setInterval(() => savedCallback.current(), delayMs);
    return () => clearInterval(id);
  }, [delayMs]);
}

// --- Demo component combining several custom hooks ---
export function CustomHookDemo() {
  const [dark, toggleDark] = useToggle();
  const [name, setName] = useLocalStorage("demo-name", "");
  const debouncedName = useDebounce(name);
  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/users/1"
  );

  return (
    <div style={{ background: dark ? "#333" : "#fff", color: dark ? "#fff" : "#000" }}>
      <button onClick={toggleDark}>Toggle dark</button>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <p>Debounced (400ms): {debouncedName}</p>
      {loading ? <p>Loading…</p> : error ? <p>{String(error)}</p> : <p>{data?.name}</p>}
    </div>
  );
}
