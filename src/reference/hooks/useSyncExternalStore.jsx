import { useSyncExternalStore } from "react";

/*
 * useSyncExternalStore (React 18) — subscribe to state that lives
 * OUTSIDE React (browser APIs, a hand-rolled store, most state
 * libraries use it under the hood).
 *
 * const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?);
 *
 * - subscribe(callback): register callback with the store, return an
 *   unsubscribe function. React calls callback when the store changes.
 * - getSnapshot(): return the current value (must be cached/immutable —
 *   returning a new object each call causes infinite re-renders).
 * - getServerSnapshot(): value used during server rendering (optional).
 */

// 1. Browser API: online/offline status
function subscribeOnline(callback) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

export function useOnlineStatus() {
  return useSyncExternalStore(
    subscribeOnline,
    () => navigator.onLine, // client snapshot
    () => true              // assume online during SSR
  );
}

export function StatusBar() {
  const isOnline = useOnlineStatus();
  return <p>{isOnline ? "✅ Online" : "❌ Offline"}</p>;
}

// 2. A tiny external store (Redux in 20 lines)
function createStore(initialState) {
  let state = initialState;
  const listeners = new Set();

  return {
    getState: () => state,
    setState(update) {
      state = { ...state, ...update };
      listeners.forEach((l) => l()); // notify React
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

const counterStore = createStore({ count: 0 });

export function useCounterStore() {
  return useSyncExternalStore(counterStore.subscribe, counterStore.getState);
}

export function ExternalCounter() {
  const { count } = useCounterStore();

  return (
    <div>
      <p>Count (lives outside React): {count}</p>
      <button onClick={() => counterStore.setState({ count: count + 1 })}>
        +1
      </button>
    </div>
  );
}

// Both components stay in sync because they read the same store.
export function TwinCounters() {
  return (
    <div>
      <ExternalCounter />
      <ExternalCounter />
    </div>
  );
}

/*
 * When to use: integrating non-React state sources. For normal app
 * state, prefer useState/useReducer — they're simpler and React-native.
 */
