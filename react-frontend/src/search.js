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
      
        const response = completion.data.choices[0].message.content+"HIHI";
        console.log(response);
        let response1 = response.replace(/\n/g,"<br>");
        let response2 = response1.replace("Ingredients:","<div class='row' style={{marginBottom:'-50px'}}><div class='col-lg-4'><h2 id='IngredientsTitle'><strong>Ingredients:</strong></h2><h4 id='Ingredients'>");
        let response3 = response2.replace("Instructions:","</div><div class='col-lg-8'></h4><h2 id='IntructionsTitle'><strong>Instructions:</strong></h2><h4 id='Instructions'>")
        let response4 = response3.replace("Directions:","</div><div class='col-lg-8'></h4><h2 id='DirectionsTitle'><strong>Directions:</strong></h2><h4 id='Directions'>")
        
        let response5 = response4.replace("HIHI","</h4></div></div>")
        document.getElementById('k').innerHTML = (response5);

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
            <div id="k" style={{ overflowWrap: "break-word", maxWidth: "100%" }}></div>
            
        </div>
    );

}