import './App.css';
import React, { useEffect, useState } from "react";
import USAMap from "react-usa-map";
import abb from "./state_transfer"



function App() {
  const [text, setText] = useState('insert state')

  const handleClick = (event) => {
    let abbreviate = event.target.dataset.name;
    setText(abb(abbreviate));
  }
  
  return (
    <>
    <div id="website"  className="container-center-horizontal">
      <h1 id="title">Meal Mapper</h1>
    </div>
    <div id="map">
      <USAMap
        onClick={handleClick}
      />
    </div>
    </>
  );
}

export default App;
