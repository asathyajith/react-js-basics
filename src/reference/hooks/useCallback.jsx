import { useCallback, useState, memo } from "react";

/*
 * useCallback — caches a FUNCTION between renders so it keeps the same
 * identity until its dependencies change.
 *
 * const handler = useCallback(() => doSomething(a), [a]);
 *
 * Why identity matters: every render normally creates brand-new
 * function objects. That breaks:
 *   - React.memo children (new prop -> child re-renders anyway),
 *   - dependency arrays of other hooks (effect re-runs every render).
 */

// A child wrapped in React.memo only re-renders when its props change
// by reference. Logs so you can see it.
const AddButton = memo(function AddButton({ onClick }) {
  console.log("AddButton rendered");
  return <button onClick={onClick}>Add item</button>;
});

export function ShoppingList() {
  const [items, setItems] = useState([]);
  const [dark, setDark] = useState(false); // unrelated state

  // Same function identity across renders -> AddButton doesn't
  // re-render when only `dark` changes.
  const handleAdd = useCallback(() => {
    setItems((prev) => [...prev, `item ${prev.length + 1}`]);
    // note: functional update means we DON'T need `items` as a dep
  }, []);

  // Without useCallback this would be a new function each render:
  // const handleAdd = () => setItems([...items, "x"]);  // memo defeated

  return (
    <div style={{ background: dark ? "#333" : "#fff" }}>
      <button onClick={() => setDark(!dark)}>Toggle theme</button>
      <AddButton onClick={handleAdd} />
      <ul>{items.map((i) => <li key={i}>{i}</li>)}</ul>
    </div>
  );
}

// With dependencies: the function is recreated only when `query` changes
export function Search({ onSearch = console.log }) {
  const [query, setQuery] = useState("");

  const submit = useCallback(() => {
    onSearch(query);
  }, [onSearch, query]);

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={submit}>Search</button>
    </div>
  );
}

/*
 * When to use:
 * - Passing callbacks to React.memo-wrapped children.
 * - A function is a dependency of useEffect/useMemo.
 * - Functions returned from custom hooks (callers may put them in deps).
 *
 * When NOT to bother: plain handlers on regular DOM elements —
 * wrapping everything in useCallback adds noise for zero gain.
 */
