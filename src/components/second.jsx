import { React ,useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import Car from "./cars";
import useList from "../hooks/useList";

function CustomHookComp() {

  const [cars, setCars] = useState([
    { name: "benz", rpm: 10000 },
    { name: "audi", rpm: 5000 },
    { name: "mahindra", rpm: 3000 },
  ]);
  const [editable, setEditable] = useState(false);
  const [newCar, setNewCar] = useState({ name: "", rpm: 0 });
  const handleAddCar = () => {
    if (newCar.name && newCar.rpm) {
      setCars([...cars, newCar]);
      setNewCar({ name: "", rpm: 0 });
    }
  }
  const removeLowHandle = () => {
    setCars(cars.filter((car) => car.rpm > 4000));
  };
  const removeInChildHandle = (e) => {    
    setCars(cars.filter((car) => car.name !== e.target.name));       
  };
  const makeEditableHandle = () => {
    setEditable(true);
  };
  const keyPressHandle = (e, i) => {
    if (e.key === "Enter") {
      setEditable(false);
      cars.saveItem(i,e.target.value)
    }
  };

  return (
    <div className="App">
      <header className="App-header">
      <h2>Car List</h2>
        {cars.map((v, k) => {
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
        <form>
          <fieldset>
            <legend>Car Details</legend>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" onChange={(e) => setNewCar({...newCar, name: e.target.value})} />
            <br />
            <label htmlFor="rpm">RPM:</label>
            <input type="number" id="rpm" name="rpm" onChange={(e) => setNewCar({...newCar, rpm: parseInt(e.target.value)})} />
          </fieldset>
        </form>
        <button onClick={handleAddCar} className="add-button">
          Add Car
        </button>
        <button onClick={removeLowHandle} className="remove-button">
          Remove low RPM
        </button>
        <br />
        <Link to="/">
          <button>Home</button>
        </Link>
      </header>
    </div>
  );
}

export default CustomHookComp;
