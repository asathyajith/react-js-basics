# React Hooks Reference

One file per hook, each with commented, runnable examples (React 18).

## State
| Hook | File | Use for |
|---|---|---|
| `useState` | [useState.jsx](useState.jsx) | Local component state |
| `useReducer` | [useReducer.jsx](useReducer.jsx) | Complex/related state via a reducer + dispatched actions |

## Side effects
| Hook | File | Use for |
|---|---|---|
| `useEffect` | [useEffect.jsx](useEffect.jsx) | Fetching, timers, subscriptions, syncing with external systems |
| `useLayoutEffect` | [useLayoutEffect.jsx](useLayoutEffect.jsx) | DOM measurement before the browser paints (avoid flicker) |

## Context
| Hook | File | Use for |
|---|---|---|
| `useContext` | [useContext.jsx](useContext.jsx) | Reading shared data (theme, auth) without prop drilling |

## Refs
| Hook | File | Use for |
|---|---|---|
| `useRef` | [useRef.jsx](useRef.jsx) | DOM nodes + mutable values that shouldn't trigger re-renders |
| `useImperativeHandle` | [useImperativeHandle.jsx](useImperativeHandle.jsx) | Exposing a custom API (focus/open/clear) through a forwarded ref |

## Performance
| Hook | File | Use for |
|---|---|---|
| `useMemo` | [useMemo.jsx](useMemo.jsx) | Caching expensive computed values / stable object identity |
| `useCallback` | [useCallback.jsx](useCallback.jsx) | Caching function identity for memoized children & deps arrays |
| `useTransition` | [useTransition.jsx](useTransition.jsx) | Marking your own slow state updates as interruptible (React 18) |
| `useDeferredValue` | [useDeferredValue.jsx](useDeferredValue.jsx) | Letting a received value lag behind urgent updates (React 18) |

## Other
| Hook | File | Use for |
|---|---|---|
| `useId` | [useId.jsx](useId.jsx) | Unique SSR-safe ids for label/aria attributes |
| `useSyncExternalStore` | [useSyncExternalStore.jsx](useSyncExternalStore.jsx) | Subscribing to state outside React (browser APIs, stores) |
| `useDebugValue` | [useDebugValue.jsx](useDebugValue.jsx) | Labeling custom hooks in React DevTools |
| Custom hooks | [customHooks.jsx](customHooks.jsx) | `useToggle`, `useLocalStorage`, `useFetch`, `useDebounce`, `useInterval` |

> `useInsertionEffect` also exists in React 18 but is intended only for CSS-in-JS library authors (injecting styles before layout effects read the DOM) — apps almost never need it.

## Rules of hooks
1. Only call hooks at the **top level** — never inside loops, conditions, or nested functions.
2. Only call hooks from **React function components** or **other custom hooks**.
3. Custom hook names must start with `use` so the linter can enforce rules 1–2.
