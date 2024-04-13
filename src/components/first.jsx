import { React, useState } from "react";
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
      </header>
    </div>
  );
}

export default FirstComp;
