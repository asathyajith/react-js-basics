import { useDebugValue, useState, useEffect } from "react";

/*
 * useDebugValue — adds a label to a CUSTOM HOOK that shows up in
 * React DevTools next to the hook's name. Purely a developer aid;
 * it does nothing at runtime for users.
 *
 * useDebugValue(value)
 * useDebugValue(value, formatFn)  // formatFn runs only when DevTools inspects
 */

// 1. Label a custom hook's state in DevTools
export function useFriendStatus(friendId) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    // pretend subscription
    const id = setTimeout(() => setIsOnline(friendId % 2 === 0), 500);
    return () => clearTimeout(id);
  }, [friendId]);

  // DevTools shows:  FriendStatus: "Online" (instead of raw true/null)
  useDebugValue(isOnline === null ? "Loading" : isOnline ? "Online" : "Offline");

  return isOnline;
}

// 2. Expensive formatting — deferred with the second argument
export function useCart(items) {
  // The Date/format work runs ONLY when someone opens DevTools,
  // not on every render.
  useDebugValue(items, (list) =>
    `${list.length} items, updated ${new Date().toLocaleTimeString()}`
  );
  return items;
}

export function FriendListItem({ friend }) {
  const isOnline = useFriendStatus(friend.id);

  return (
    <li style={{ color: isOnline ? "green" : "gray" }}>
      {friend.name} {isOnline === null && "(checking…)"}
    </li>
  );
}

/*
 * Guidance: only worth adding to shared/library hooks with
 * non-obvious internal state. Don't sprinkle it on every hook.
 */
