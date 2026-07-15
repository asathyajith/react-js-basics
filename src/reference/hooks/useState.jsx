import { useState } from "react";

/*
 * useState — adds local state to a function component.
 *
 * const [value, setValue] = useState(initialValue);
 *
 * - Calling the setter re-renders the component with the new value.
 * - State is preserved between re-renders.
 * - Updates are batched: multiple setter calls in one event handler
 *   cause a single re-render.
 * - NEVER mutate state directly (state.count++ is wrong) — always
 *   create a new value/object/array and pass it to the setter.
 */

// 1. Basic counter
export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}

// 2. Functional (updater) form — use when the new state depends on
//    the previous state. Safe even when updates are batched.
export function DoubleIncrement() {
  const [count, setCount] = useState(0);

  const addTwo = () => {
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1); // works: each gets the latest value
    // setCount(count + 1); setCount(count + 1);  // would only add 1!
  };

  return <button onClick={addTwo}>Count: {count}</button>;
}

// 3. Object state — spread the old object so you don't lose fields
export function ProfileForm() {
  const [form, setForm] = useState({ name: "", email: "" });

  const update = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <form>
      <input name="name" value={form.name} onChange={update} />
      <input name="email" value={form.email} onChange={update} />
      <pre>{JSON.stringify(form)}</pre>
    </form>
  );
}

// 4. Array state — use map/filter/spread, never push/splice
export function TodoList() {
  const [todos, setTodos] = useState(["learn hooks"]);

  const add = () => setTodos([...todos, `todo ${todos.length + 1}`]);
  const remove = (i) => setTodos(todos.filter((_, idx) => idx !== i));

  return (
    <div>
      <button onClick={add}>Add</button>
      <ul>
        {todos.map((t, i) => (
          <li key={t} onClick={() => remove(i)}>{t}</li>
        ))}
      </ul>
    </div>
  );
}

// 5. Lazy initial state — pass a function when the initial value is
//    expensive to compute; it runs only on the first render.
export function ExpensiveInit() {
  const [value] = useState(() => {
    console.log("runs once, not on every render");
    return Array.from({ length: 1000 }, (_, i) => i).reduce((a, b) => a + b);
  });

  return <p>{value}</p>;
}
