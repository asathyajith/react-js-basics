/*
 * Props — how a parent passes data INTO a component. Read-only:
 * a component must never modify its own props (data flows one way,
 * top -> down).
 */

// 1. Receiving props (usually destructured in the signature)
export function Welcome({ name, age }) {
  return (
    <p>
      {name} is {age} years old
    </p>
  );
}

// equivalent, without destructuring:
export function WelcomeVerbose(props) {
  return <p>{props.name} is {props.age} years old</p>;
}

// 2. Default values
export function Button({ label = "Click me", color = "steelblue" }) {
  return <button style={{ background: color }}>{label}</button>;
}

// 3. Passing anything: strings, numbers, objects, arrays, functions, JSX
export function PropsShowcase() {
  const user = { name: "Ada" };

  return (
    <div>
      <Welcome name="Ada" age={36} />              {/* number needs {} */}
      <Button />                                    {/* uses defaults */}
      <Button label="Save" color="seagreen" />
      <UserCard user={user} tags={["admin", "dev"]} icon={<span>⭐</span>} />
    </div>
  );
}

function UserCard({ user, tags, icon }) {
  return (
    <div>
      {icon} {user.name} — {tags.join(", ")}
    </div>
  );
}

// 4. Function props — the child notifies the parent (events flow UP)
export function Parent() {
  const handleChildClick = (msg) => alert(`Child says: ${msg}`);
  return <Child onAction={handleChildClick} />;
}

function Child({ onAction }) {
  return <button onClick={() => onAction("hi!")}>Notify parent</button>;
}

// 5. children — the special prop holding nested JSX
export function Panel({ title, children }) {
  return (
    <section style={{ border: "1px solid #ddd", padding: 8 }}>
      <h3>{title}</h3>
      {children}
    </section>
  );
}

export function PanelDemo() {
  return (
    <Panel title="About">
      <p>Anything can go here.</p>
      <Button label="Even buttons" />
    </Panel>
  );
}

// 6. Spreading props (forwarding everything you didn't use)
export function TextInput({ label, ...rest }) {
  return (
    <label>
      {label} <input {...rest} />
    </label>
  );
}
// usage: <TextInput label="Email" type="email" placeholder="a@b.c" required />
