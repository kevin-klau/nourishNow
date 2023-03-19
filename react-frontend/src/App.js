import './App.css';
import React, { useEffect, useState } from "react";
import USAMap from "react-usa-map";
import abb from "./state_transfer";
import Data from "./data_display";
import image1 from "./images/circle.png";
import statesCustomConfig from './state_colors';
import UserSearch from './search';

function App() {
  

  const [text, setText] = useState('Please Click On A State!')
  function handleClick (abbreviate) {
    setText(abb(abbreviate));
    document.getElementById('DataInfo').scrollIntoView();
  }
  
  return (
    <>
    <head>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous"/>
    </head>
    <div className='rectangle1'/>
    <div className='rectangle2'/>
    <div id="backgroundImages">
      <div id="website"  className="container-center-horizontal">
        <h1 id="title" style={{display:'inline-block'}}><strong>  nourish<h1 id="titleBlue" style={{display:'inline-block'}}>Now</h1></strong></h1>
      </div>
        <div className="container-center-horizontal">
          <h2 id="description"> Select a state down below to view the food scarcity statistics</h2>
        </div>
      <div id="map">
        <USAMap
          onClick={(event) => handleClick(event.target.dataset.name)}
          customize={statesCustomConfig()}
        />
      </div>
    </div>
    {/*<h1 id = "gpt_result"></h1>*/}
    <Data id="theData" state={text}></Data>
    <UserSearch state={text}></UserSearch>
    </>
  );
}

export default App;
