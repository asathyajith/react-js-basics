import { useImperativeHandle, forwardRef, useRef, useState } from "react";

/*
 * useImperativeHandle — customizes what a parent gets when it puts a
 * ref on your component. Used together with forwardRef.
 *
 * useImperativeHandle(ref, () => ({ ...methods }), deps?)
 *
 * Instead of exposing the raw DOM node, you expose a small "API"
 * (focus, clear, open, scrollTo...). Keeps the parent from poking at
 * your internals.
 */

// Child: exposes focus() and clear() instead of the raw <input>
const FancyInput = forwardRef(function FancyInput(props, ref) {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current.focus();
    },
    clear() {
      inputRef.current.value = "";
    },
    // deliberately NOT exposing inputRef.current itself
  }));

  return <input ref={inputRef} placeholder="fancy input" {...props} />;
});

export function Parent() {
  const fancyRef = useRef(null);

  return (
    <div>
      <FancyInput ref={fancyRef} />
      <button onClick={() => fancyRef.current.focus()}>Focus</button>
      <button onClick={() => fancyRef.current.clear()}>Clear</button>
    </div>
  );
}

// A modal that exposes open()/close() imperatively
const Modal = forwardRef(function Modal({ children }, ref) {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setVisible(true),
    close: () => setVisible(false),
  }));

  if (!visible) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.5)" }}>
      <div style={{ background: "#fff", margin: "20% auto", padding: 20, width: 300 }}>
        {children}
        <button onClick={() => setVisible(false)}>Close</button>
      </div>
    </div>
  );
});

export function ModalDemo() {
  const modalRef = useRef(null);
  return (
    <div>
      <button onClick={() => modalRef.current.open()}>Open modal</button>
      <Modal ref={modalRef}>Hello from the modal</Modal>
    </div>
  );
}

/*
 * Use sparingly — most communication should be props (declarative).
 * Reach for this only for imperative actions that don't map to props:
 * focus, text selection, scrolling, media playback, opening dialogs.
 */
