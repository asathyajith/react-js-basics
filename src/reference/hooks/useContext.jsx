import { createContext, useContext, useState } from "react";

/*
 * useContext — reads a value from the nearest matching <Context.Provider>
 * above in the tree. Solves "prop drilling" (passing props through many
 * layers that don't use them).
 *
 * Steps:
 *   1. const MyContext = createContext(defaultValue)
 *   2. Wrap a subtree:  <MyContext.Provider value={...}>
 *   3. Read anywhere below:  const value = useContext(MyContext)
 *
 * When the Provider's value changes, every component that reads the
 * context re-renders.
 */

// 1. Theme context (classic example)
const ThemeContext = createContext("light"); // default used if no Provider

export function ThemeApp() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={theme}>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle theme
      </button>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  // no theme prop needed here — that's the point
  return <ThemedButton />;
}

function ThemedButton() {
  const theme = useContext(ThemeContext); // "light" | "dark"
  const style =
    theme === "dark"
      ? { background: "#222", color: "#fff" }
      : { background: "#eee", color: "#000" };

  return <button style={style}>I am {theme}</button>;
}

// 2. Context that also exposes an updater (state + setter in one value)
const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (name) => setUser({ name });
  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

// 3. Custom hook wrapper — nicer API + fails loudly outside the Provider
export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used inside <UserProvider>");
  return ctx;
}

export function LoginStatus() {
  const { user, login, logout } = useUser();

  return user ? (
    <p>
      Hello {user.name} <button onClick={logout}>Logout</button>
    </p>
  ) : (
    <button onClick={() => login("Sathya")}>Login</button>
  );
}

/*
 * Notes:
 * - Context is for data many components need: theme, auth user,
 *   locale/language, app settings.
 * - It is NOT a full state manager; for complex state combine it with
 *   useReducer (see useReducer.jsx) or use a library.
 */
