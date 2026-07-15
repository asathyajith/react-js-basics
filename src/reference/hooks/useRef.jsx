import { useRef, useState, useEffect } from "react";

/*
 * useRef — a mutable box ({ current: ... }) that survives re-renders.
 *
 * const ref = useRef(initialValue);
 *
 * Two main uses:
 *   1. Holding a DOM node:  <input ref={ref} />  ->  ref.current is the node
 *   2. Storing any mutable value that should persist across renders
 *      WITHOUT causing a re-render when it changes (unlike state).
 *
 * Changing ref.current does NOT re-render the component.
 */

// 1. DOM access — focus an input
export function FocusInput() {
  const inputRef = useRef(null);

  return (
    <div>
      <input ref={inputRef} placeholder="click the button" />
      <button onClick={() => inputRef.current.focus()}>Focus</button>
    </div>
  );
}

// 2. Mutable value — count renders without causing renders
export function RenderCounter() {
  const renders = useRef(0);
  const [text, setText] = useState("");

  renders.current += 1; // mutating a ref never triggers a render

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <p>This component rendered {renders.current} times</p>
    </div>
  );
}

// 3. Holding a timer id so any handler can clear it
export function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  const start = () => {
    if (intervalRef.current) return; // already running
    intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  useEffect(() => stop, []); // cleanup on unmount

  return (
    <div>
      <p>{seconds}s</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}

// 4. Previous value pattern
export function PreviousValue({ count }) {
  const prev = useRef();

  useEffect(() => {
    prev.current = count; // stored AFTER render, so it lags one render behind
  }, [count]);

  return (
    <p>
      Now: {count}, before: {prev.current ?? "—"}
    </p>
  );
}

/*
 * ref vs state:
 * - state: rendering depends on it -> setter triggers re-render.
 * - ref:   rendering does NOT depend on it (DOM nodes, timer ids,
 *          previous values, "instance variables").
 * Don't read/write ref.current during render logic (except lazily
 * initializing it) — do it in handlers or effects.
 */
