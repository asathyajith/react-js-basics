import { React ,useState } from "react";
import "../App.css";
import Car from "./cars";
import useList from "../hooks/useList";

function CustomHookComp() {
  const initialState = [
    { name: "benz", rpm: 10000 },
    { name: "audi", rpm: 5000 },
    { name: "mahindra", rpm: 3000 },
  ];

  const items = useList(initialState);
  const [editable, setEditable] = useState(false);
  
  const removeLowHandle = () => {
    items.removeParent();
  };
  const removeInChildHandle = (e) => {    
    items.removeChild(e.target.name);       
  };
  const makeEditableHandle = () => {
    setEditable(true);
  };
  const keyPressHandle = (e, i) => {
    if (e.key === "Enter") {
      setEditable(false);
      items.saveItem(i,e.target.value)
    }
  };

  return (
    <div className="App">
      <header className="App-header">
      <h2>Car List</h2>
        {items.list.map((v, k) => {
          return (
            <Car
              key={`${k}${v.name}${v.rpm}`}
              value={v}
              onClick={removeInChildHandle}
              editable={editable}
              onDoubleClick={makeEditableHandle}
              onKeyPress={keyPressHandle}
              index={k}
            ></Car>
          );
        })}
        <button onClick={removeLowHandle} className="remove-button">
          Remove low RPM
        </button>
      </header>
    </div>
  );
}

export default CustomHookComp;
