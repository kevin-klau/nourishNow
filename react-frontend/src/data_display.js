import React, { useEffect, useState } from "react";
import background from './images/circle.png';
import backgroundAlabamaPop from './images/Pred_Alabama--Total_Number_of_Participants.png';
import backgroundAlabamaCost from './images/Pred_Alabama--Food_Costs.png';
import backgroundAlabamaInfant from './images/Pred_Alabama--Total_Infants.png';
import backgroundCaliPop from './images/Pred_California--Total_Number_of_Participants.png';
import backgroundCaliCost from './images/Pred_California--Food_Costs.png';
import backgroundCaliInfant from './images/Pred_California--Total_Infants.png';
import backgroundTexPop from './images/Pred_Texas--Total_Number_of_Participants.png';
import backgroundTexCost from './images/Pred_Texas--Food_Costs.png';
import backgroundTexInfant from './images/Pred_Texas--Total_Infants.png';
import data from './data.json';

export default function Data({state}){
    let demand;
    let cost;
    let infant;
    if (state === "Please Click On A State!"){
        demand = 0;
        cost = 0;
        infant = 0;
    }else{
        demand = data[state]['Total Demand'];
        cost = data[state]['Total Cost'];
        infant = data[state]['Total Infant'];
    }
    const [display, setDisplay] = useState("pop");
    const [styles, setStyle] = useState(changeStyle("pop"))
    
    function clickBack(){
        document.getElementById('title').scrollIntoView();
    }
    function clickForward(){
        document.getElementById('searchTitle').scrollIntoView();
    }
    function clickPop(){
        setDisplay("pop");
    }
    function clickInfant(){
        setDisplay("infant");
    }
    function clickCost(){
        setDisplay("cost");
    }

    
    function changeStyle(thing){
        if (state === "Texas"){
            if(thing === "pop"){
                return backgroundTexPop;
            }else if (thing === "infant"){
                return backgroundTexInfant;
            }else{
                return backgroundTexCost;
            }
        }else if (state === "California"){
            if(thing === "pop"){
                return backgroundCaliPop;
            }else if (thing === "infant"){
                return backgroundCaliInfant;
            }else{
                return backgroundCaliCost;
            }
        }else{
            if(thing === "pop"){
                return backgroundAlabamaPop;
            }else if (thing === "infant"){
                return backgroundAlabamaInfant;
            }else{
                return backgroundAlabamaCost;
            }
        }
    }

    return(
        <div id="DataInfo">
            <div className="row">
                <div className="col-lg-1"></div>
                <button className="btn btn-light col-lg-2" id="button_home" onClick={clickBack}><strong>Click New State</strong></button>
                {(state === "Please Click On A State!")
                    ? <h1 id="state_header" className="col-lg-6" style={{marginBottom:'40px'}}>{state}</h1>
                    : <h1 id="state_header" className="col-lg-6" style={{marginBottom:'40px'}}>{state}</h1>
                }
                <button className="btn btn-light col-lg-2" id="button_home" onClick={clickForward}><strong>Check Out Food!</strong></button>
            </div>
            <div id="chartPlace">
                <h1 style={{fontSize:'20px', marginTop:'-30px', color:'white', marginBottom:'40px'}}>Powered By LSTM AI Algorithmn</h1>
            <div className="rectangle3" style={{backgroundImage:`url(${changeStyle(display)})`}}></div>
            </div>
            <div id="buttons">
                <button id="theButtons" className="btn btn-light" onClick={clickPop}>Total Population</button>
                <button id="theButtons" className="btn btn-light" onClick={clickInfant}>Total Infant</button>
                <button id="theButtons" className="btn btn-light" onClick={clickCost}>Total Cost</button>
            </div>

            <h1>{demand}</h1>
        </div>
    );
}