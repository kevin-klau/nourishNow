import './App.css';
import React, { useEffect, useState } from "react";
import USAMap from "react-usa-map";
import abb from "./state_transfer";
import Data from "./data_display";
import image1 from "./images/circle.png";

function App() {
  let gpt_response = "HAIDHOWAHI";
  const [a, setA] = useState("A");
  async function callgpt(input){
    
    const { Configuration, OpenAIApi } = require("openai");
    
    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
     
    

    
    const msg = input;
    
    const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: msg}],
    });
  
    const response = completion.data.choices[0].message.content;
    console.log(completion.data.choices[0].message.content);
    gpt_response = response;
    const name = document.createTextNode(gpt_response);
    document.getElementById("gpt_result").appendChild(name);
  };

  const [text, setText] = useState('insert state')
  function handleClick (abbreviate) {
    setText(abb(abbreviate));
    document.getElementById('DataInfo').scrollIntoView();
    callgpt("how do cows eat");
    
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
        <h1 id="title" style={{display:'inline-block'}}><strong>Meal <h1 id="titleBlue" style={{display:'inline-block'}}>Mapper</h1></strong></h1>
      </div>
        <div className="container-center-horizontal">
          <h2 id="description"> Select a state down below to view the food scarcity statistics</h2>
        </div>
      <div id="map">
        <USAMap
          onClick={(event) => handleClick(event.target.dataset.name)}
        />
      </div>
    </div>
    {/*<h1 id = "gpt_result"></h1>*/}
    <Data id="theData" state={text}></Data>
    </>
  );
}

export default App;
