import React, { useState, useEffect } from 'react';

function MyComponent() {
  // State declaration
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  const [data, setData] = useState(null);

  // Event handlers
  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  // Helper functions
  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  // useEffect hook for fetching data
  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch data
  const fetchData = async () => {
    try {
      const response = await fetch('api/data');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Component JSX
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={incrementCount}>Increment</button>
      <input type="text" value={text} onChange={handleInputChange} />
      <div>{data ? <p>Data: {JSON.stringify(data)}</p> : <p>Loading...</p>}</div>
    </div>
  );
}

export default MyComponent;
