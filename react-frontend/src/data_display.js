import React, { useEffect, useState } from "react";
import background from './images/circle.png';

export default function Data({state}){
    const [display, setDisplay] = useState("pop");
    
    function clickBack(){
        document.getElementById('title').scrollIntoView();
    }
    function clickForward(){
        document.getElementById('searchTitle').scrollIntoView();
    }
    function clickPop(){
        setDisplay("pop");
    }
    function clickAcc(){
        setDisplay("acc");
    }
    function clickCost(){
        setDisplay("pop");
    }
    const imageUrl = "./images/circle.png";

    return(
        <div id="DataInfo">
            <div className="row">
                <div className="col-lg-1"></div>
                <button className="btn btn-light col-lg-2" id="button_home" onClick={clickBack}><strong>Click New State</strong></button>
                {(state === "Please Click On A State!")
                    ? <h1 id="state_header" className="col-lg-6" style={{marginBottom:'40px'}}>{state}</h1>
                    : <h1 id="state_header" className="col-lg-6" style={{marginBottom:'40px'}}>{state} Stats</h1>
                }
                <button className="btn btn-light col-lg-2" id="button_home" onClick={clickForward}><strong>Check Out Food!</strong></button>
            </div>
            <div id="chartPlace">
            <div className="rectangle3" style={{ backgroundImage: `url(${background})` }}></div>
            <img src={`url(${imageUrl})`}></img>
            </div>
            <div id="buttons">
                <button id="theButtons" className="btn btn-light" onClick={clickPop}>Total Population</button>
                <button id="theButtons" className="btn btn-light" onClick={clickAcc}>Total Acc.</button>
                <button id="theButtons" className="btn btn-light" onClick={clickCost}>Total Cost</button>
            </div>
        </div>
    );
}