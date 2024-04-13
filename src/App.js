import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FirstComp from "./components/first";
import SecondComp from "./components/second";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstComp/>}></Route>
        <Route path="/second" element={<SecondComp/>} exact></Route>
      </Routes>
    </Router>
  );
}

export default App;