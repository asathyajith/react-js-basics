/*
 * JSX & Components — the foundation of React.
 *
 * JSX is syntax sugar for React.createElement calls. It looks like HTML
 * but it's JavaScript, so:
 *   - {expression} embeds any JS expression
 *   - attributes are camelCase: className, onClick, tabIndex
 *   - style takes an object, not a string
 *   - every component must return ONE root element (or a Fragment)
 *
 * A component is just a function that returns JSX. Its name MUST be
 * Capitalized — lowercase tags are treated as HTML elements.
 */

// 1. The simplest component
export function Hello() {
  return <h1>Hello, world!</h1>;
}

// 2. Embedding expressions with { }
export function Greeting() {
  const user = { firstName: "Ada", lastName: "Lovelace" };
  const formatName = (u) => `${u.firstName} ${u.lastName}`;

  return (
    <div>
      <h1>Hello, {formatName(user)}!</h1>
      <p>2 + 2 = {2 + 2}</p>
      <p>Today is {new Date().toLocaleDateString()}</p>
    </div>
  );
}

// 3. JSX attribute differences from HTML
export function AttributeDemo() {
  return (
    <div
      className="card"                         // not class
      style={{ color: "teal", fontSize: 16 }}  // object, camelCase keys
    >
      <label htmlFor="name">Name</label>       {/* not for */}
      <input id="name" onChange={() => {}} />  {/* camelCase events */}
      <img src="logo.png" alt="logo" />        {/* self-closing required */}
    </div>
  );
}

// 4. One root element — use a Fragment (<>...</>) to avoid extra divs
export function FragmentDemo() {
  return (
    <>
      <h2>Title</h2>
      <p>No wrapper div was added to the DOM.</p>
    </>
  );
}

// 5. Composition — components render other components
function Avatar({ src }) {
  return <img src={src} alt="" width={48} style={{ borderRadius: "50%" }} />;
}

function Card({ children }) {
  // `children` is whatever you nest inside <Card>...</Card>
  return <div style={{ border: "1px solid #ccc", padding: 12 }}>{children}</div>;
}

export function Profile() {
  return (
    <Card>
      <Avatar src="https://i.pravatar.cc/48" />
      <h3>Ada Lovelace</h3>
    </Card>
  );
}

/*
 * What JSX compiles to:
 *   <h1 className="big">Hi</h1>
 * becomes
 *   React.createElement("h1", { className: "big" }, "Hi")
 * — which is why you could write React without JSX (nobody does).
 */
