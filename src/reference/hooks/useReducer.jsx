import { useReducer } from "react";

/*
 * useReducer — like useState, but state transitions live in one pure
 * "reducer" function. Best when:
 *   - the next state depends on the previous state in several ways,
 *   - multiple pieces of state change together,
 *   - update logic is complex enough to deserve its own testable function.
 *
 * const [state, dispatch] = useReducer(reducer, initialState);
 *
 * reducer(state, action) -> newState   (must be pure, never mutate state)
 * dispatch({ type: "...", ...payload }) triggers it.
 */

// 1. Counter with multiple actions
function counterReducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "set":
      return { count: action.value };
    case "reset":
      return { count: 0 };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "set", value: 100 })}>=100</button>
      <button onClick={() => dispatch({ type: "reset" })}>reset</button>
    </div>
  );
}

// 2. Todo list — the classic useReducer use case
let nextId = 1;

function todosReducer(todos, action) {
  switch (action.type) {
    case "added":
      return [...todos, { id: nextId++, text: action.text, done: false }];
    case "toggled":
      return todos.map((t) =>
        t.id === action.id ? { ...t, done: !t.done } : t
      );
    case "deleted":
      return todos.filter((t) => t.id !== action.id);
    default:
      return todos;
  }
}

export function Todos() {
  const [todos, dispatch] = useReducer(todosReducer, []);

  const handleAdd = (e) => {
    e.preventDefault();
    const input = e.target.elements.todo;
    if (input.value.trim()) {
      dispatch({ type: "added", text: input.value });
      input.value = "";
    }
  };

  return (
    <div>
      <form onSubmit={handleAdd}>
        <input name="todo" placeholder="New todo" />
        <button>Add</button>
      </form>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            <label style={{ textDecoration: t.done ? "line-through" : "none" }}>
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => dispatch({ type: "toggled", id: t.id })}
              />
              {t.text}
            </label>
            <button onClick={() => dispatch({ type: "deleted", id: t.id })}>
              x
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/*
 * useState vs useReducer:
 * - useState: independent, simple values.
 * - useReducer: related values updated by well-defined events;
 *   pairs well with useContext to build a mini global store
 *   (Provider passes down state + dispatch).
 */
