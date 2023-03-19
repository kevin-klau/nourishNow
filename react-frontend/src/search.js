import React, { useEffect, useState } from "react";

export default function UserSearch({state}){
    const [userInput, setUserInput] = useState("");
    function userType(e){
        e.preventDefault();
        setUserInput(e.target.value);
    };
    const [gptText, setGPTText] = useState("");
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
        console.log(response);
        document.getElementById('k').innerHTML = (response.replace(/\n/g,"<br>"));

    };
    
    function userEnter(e){
        e.preventDefault();
        callgpt("Give me a recipe in "+state+" with "+userInput);

    }
    
    return(
        <div id="searchContainer">
            <div id="titleSection">
                <h1 id="searchTitle"><strong>RECIPES</strong></h1>
            </div>
            <form id="restSection" onSubmit={userEnter}>
                <input onChange={userType} id="input" className="form-control me-2 d-flex clear" type="search" placeholder="Enter Subject Here" aria-label="Search"></input>
                <button id="inputButton" className="btn btn-outline-success" type="submit" onClick={userEnter}>🔎︎</button>
            </form>
            <p id="k"></p>
        </div>
    );

}