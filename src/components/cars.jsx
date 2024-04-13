import React from "react";
import "./cars.css";

function car(props) {
  return (
    <div className="car-text">
      {props.editable ? (
        <input
          type="text"
          onKeyPress={(e)=>props.onKeyPress(e,props.index)}
          defaultValue={props.value.name}
        />
      ) : (
        <p onDoubleClick={props.onDoubleClick}>{props.value.name}</p>
      )}
      <p>{props.value.rpm}</p>
      <button
        onClick={props.onClick}
        name={props.value.name}
        className="remove-one-button"
      >
        Remove one
      </button>
    </div>
  );
}

export default car;
