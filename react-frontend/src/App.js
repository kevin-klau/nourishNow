import './App.css';
import React, { useEffect, useState } from "react";
import USAMap from "react-usa-map";
import abb from "./state_transfer";

function App() {
  let gpt_response = "HAIDHOWAHI";
  const [a, setA] = useState("A");
  async function callgpt(input){

    const { Configuration, OpenAIApi } = require("openai");
  
    const configuration = new Configuration({
    apiKey: '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',
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
  const handleClick = (event) => {
    let abbreviate = event.target.dataset.name;
    setText(abb(abbreviate));
    callgpt("how do cows eat");
    
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
    <h1 id = "gpt_result"></h1>
    </>
  );
}

export default App;
