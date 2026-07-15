import { useLayoutEffect, useEffect, useRef, useState } from "react";

/*
 * useLayoutEffect — identical API to useEffect, but it fires
 * SYNCHRONOUSLY after React updates the DOM and BEFORE the browser
 * paints the screen.
 *
 * Timeline for a render:
 *   render -> React commits DOM changes -> useLayoutEffect -> paint -> useEffect
 *
 * Use it only when you must MEASURE the DOM and re-render before the
 * user sees anything — otherwise the UI would visibly "flicker".
 * For everything else use useEffect (it doesn't block painting).
 */

// 1. Measure an element's size before paint (no flicker)
export function MeasureBox() {
  const boxRef = useRef(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    // runs before paint — the user never sees height = 0
    setHeight(boxRef.current.getBoundingClientRect().height);
  }, []);

  return (
    <div>
      <div ref={boxRef} style={{ padding: 20, border: "1px solid" }}>
        Some content whose height we need
      </div>
      <p>The box above is {height}px tall</p>
    </div>
  );
}

// 2. Position a tooltip so it never renders in the wrong place first
export function Tooltip({ targetRef, children }) {
  const tipRef = useRef(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    if (!targetRef.current || !tipRef.current) return;
    const t = targetRef.current.getBoundingClientRect();
    const tip = tipRef.current.getBoundingClientRect();

    // flip above the target if there's no room below
    const fitsBelow = t.bottom + tip.height < window.innerHeight;
    setPos({
      top: fitsBelow ? t.bottom : t.top - tip.height,
      left: t.left,
    });
  }, [targetRef]);

  return (
    <div ref={tipRef} style={{ position: "fixed", ...pos, background: "#222", color: "#fff", padding: 4 }}>
      {children}
    </div>
  );
}

// 3. Side-by-side: same effect, different timing
export function TimingDemo() {
  useEffect(() => console.log("useEffect: after paint"));
  useLayoutEffect(() => console.log("useLayoutEffect: before paint"));
  return <p>Open the console — layout effect logs first</p>;
}

/*
 * Rule of thumb: start with useEffect; switch to useLayoutEffect only
 * if you see a flicker caused by a DOM measurement + state update.
 * useLayoutEffect blocks painting, so heavy work here hurts performance.
 */
