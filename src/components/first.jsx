import { React, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function FirstComp() {
  const [age, setAge] = useState(10);
  const upHandle = () => {
    setAge(age + 1);
  };
  const downHandle = () => {
    setAge(age - 1);
  };
  return (
    <div className="App">
      <header className="App-header">
        <p>Hello counter</p>
        <h2>AGE :{age}</h2>
        <button onClick={upHandle}>Age UP</button>
        <button onClick={downHandle}>Age DOWN</button>
        <br />
        <br />
        <Link to="/custom-hook">
          <button>List Example</button>
        </Link>
      </header>
    </div>
  );
}

export default FirstComp;
