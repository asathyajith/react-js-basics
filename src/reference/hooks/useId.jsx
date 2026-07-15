import { useId } from "react";

/*
 * useId — generates a unique, stable ID for accessibility attributes
 * (htmlFor/id, aria-describedby...).
 *
 * const id = useId();   // e.g. ":r1:"
 *
 * Why not Math.random() or a counter? Those produce DIFFERENT ids on
 * the server and the client, breaking hydration in SSR apps. useId is
 * consistent across server and client.
 *
 * NOT for list keys — keys should come from your data.
 */

// 1. Label + input pairing
export function EmailField() {
  const id = useId();

  return (
    <div>
      <label htmlFor={id}>Email</label>
      <input id={id} type="email" />
    </div>
  );
}

// 2. One id as a prefix for several related elements
export function PasswordField() {
  const id = useId();

  return (
    <div>
      <label htmlFor={`${id}-input`}>Password</label>
      <input
        id={`${id}-input`}
        type="password"
        aria-describedby={`${id}-hint`}
      />
      <p id={`${id}-hint`}>Must be at least 8 characters.</p>
    </div>
  );
}

// 3. Works even when the component is rendered multiple times —
//    each instance gets its own unique id.
export function SignupForm() {
  return (
    <form>
      <EmailField />
      <EmailField /> {/* second instance gets a different id */}
      <PasswordField />
    </form>
  );
}
