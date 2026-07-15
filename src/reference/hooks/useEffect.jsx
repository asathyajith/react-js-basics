import { useEffect, useState } from "react";

/*
 * useEffect — runs side effects after render (data fetching, timers,
 * subscriptions, manually touching the DOM, logging...).
 *
 * useEffect(setupFn, dependencies?)
 *
 * Dependency array controls WHEN the effect re-runs:
 *   useEffect(fn)          -> after EVERY render
 *   useEffect(fn, [])      -> only once, after the first render (mount)
 *   useEffect(fn, [a, b])  -> after mount + whenever a or b changes
 *
 * The setup function may return a CLEANUP function. React calls it
 * before the effect runs again and when the component unmounts.
 */

// 1. Run on every render vs once vs on change
export function EffectTiming({ userId }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("every render");
  });

  useEffect(() => {
    console.log("only on mount");
  }, []);

  useEffect(() => {
    console.log("when userId changes:", userId);
  }, [userId]);

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

// 2. Data fetching on mount (with a stale-response guard)
export function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
      const data = await res.json();
      if (!cancelled) setUser(data); // ignore result if effect re-ran
    }
    load();

    return () => {
      cancelled = true; // cleanup: mark previous request as stale
    };
  }, [userId]);

  return user ? <h2>{user.name}</h2> : <p>Loading…</p>;
}

// 3. Cleanup: timers and subscriptions
export function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id); // stop the timer on unmount
  }, []);

  return <p>{time.toLocaleTimeString()}</p>;
}

export function WindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize); // unsubscribe
  }, []);

  return <p>Width: {width}px</p>;
}

// 4. Syncing with a prop (document title example)
export function TitleUpdater({ title }) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return <p>Check the browser tab title</p>;
}

/*
 * Common mistakes:
 * - Missing dependencies: everything the effect reads from props/state
 *   should be in the array (the eslint react-hooks plugin warns you).
 * - Using useEffect for things that aren't side effects — derived
 *   values should be computed during render (or with useMemo) instead.
 * - Forgetting cleanup, which leaks timers/listeners.
 */
