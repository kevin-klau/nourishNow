import React, { useEffect, useState } from "react";
import backgroundAlabamaPop from './images/Pred_Alabama--Total_Number_of_Participants.png';
import backgroundAlabamaCost from './images/Pred_Alabama--Food_Costs.png';
import backgroundAlabamaInfant from './images/Pred_Alabama--Total_Infants.png';
import backgroundCaliPop from './images/Pred_California--Total_Number_of_Participants.png';
import backgroundCaliCost from './images/Pred_California--Food_Costs.png';
import backgroundCaliInfant from './images/Pred_California--Total_Infants.png';
import backgroundTexPop from './images/Pred_Texas--Total_Number_of_Participants.png';
import backgroundTexCost from './images/Pred_Texas--Food_Costs.png';
import backgroundTexInfant from './images/Pred_Texas--Total_Infants.png';
import backgroundOklPop from './images/Pred_Oklahoma--Total_Number_of_Participants.png';
import backgroundOklCost from './images/Pred_Oklahoma--Food_Costs.png';
import backgroundOklInfant from './images/Pred_Oklahoma--Total_Infants.png';
import backgroundHawPop from './images/Pred_Hawaii--Total_Number_of_Participants.png';
import backgroundHawCost from './images/Pred_Hawaii--Food_Costs.png';
import backgroundHawInfant from './images/Pred_Hawaii--Total_Infants.png';
import backgroundNYCPop from './images/Pred_New York--Total_Number_of_Participants.png';
import backgroundNYCCost from './images/Pred_New York--Food_Costs.png';
import backgroundNYCInfant from './images/Pred_New York--Total_Infants.png';
import backgroundArizPop from './images/Pred_Arizona--Total_Number_of_Participants.png';
import backgroundArizCost from './images/Pred_Arizona--Food_Costs.png';
import backgroundArizInfant from './images/Pred_Arizona--Total_Infants.png';
import backgroundColPop from './images/Pred_Colorado--Total_Number_of_Participants.png';
import backgroundColCost from './images/Pred_Colorado--Food_Costs.png';
import backgroundColInfant from './images/Pred_Colorado--Total_Infants.png';
import backgroundConnPop from './images/Pred_Connecticut--Total_Number_of_Participants.png';
import backgroundConnCost from './images/Pred_Connecticut--Food_Costs.png';
import backgroundConnInfant from './images/Pred_Connecticut--Total_Infants.png';
import backgroundDelPop from './images/Pred_Delaware--Total_Number_of_Participants.png';
import backgroundDelCost from './images/Pred_Delaware--Food_Costs.png';
import backgroundDelInfant from './images/Pred_Delaware--Total_Infants.png';
import data from './data.json';
import { CircularProgressbar, buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Data({state}){
    let demand;
    let cost;
    let infant;
    if (state === "Click A State!"){
        demand = 0;
        cost = 0;
        infant = 0;
    }else{
        demand = data[state]['Total Demand'];
        cost = data[state]['Total Cost'];
        infant = data[state]['Total Infants'];
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
        }else if (state === "Oklahoma"){
            if(thing === "pop"){
                return backgroundOklPop;
            }else if (thing === "infant"){
                return backgroundOklInfant;
            }else{
                return backgroundOklCost;
            }            
        }else if (state === "Hawaii"){
            if(thing === "pop"){
                return backgroundHawPop;
            }else if (thing === "infant"){
                return backgroundHawInfant;
            }else{
                return backgroundHawCost;
            }            
        }else if (state === "New York"){
            if(thing === "pop"){
                return backgroundNYCPop;
            }else if (thing === "infant"){
                return backgroundNYCInfant;
            }else{
                return backgroundNYCCost;
            }            
        }else if (state === "Arizona"){
            if(thing === "pop"){
                return backgroundArizPop;
            }else if (thing === "infant"){
                return backgroundArizInfant;
            }else{
                return backgroundArizCost;
            }            
        }else if (state === "Colorado"){
            if(thing === "pop"){
                return backgroundColPop;
            }else if (thing === "infant"){
                return backgroundColInfant;
            }else{
                return backgroundColCost;
            }            
        }else if (state === "Connecticut"){
            if(thing === "pop"){
                return backgroundConnPop;
            }else if (thing === "infant"){
                return backgroundConnInfant;
            }else{
                return backgroundConnCost;
            }            
        }else if (state === "Delaware"){
            if(thing === "pop"){
                return backgroundDelPop;
            }else if (thing === "infant"){
                return backgroundDelInfant;
            }else{
                return backgroundDelCost;
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


    const [percentage, setPercentage] = useState(0);
 
    useEffect(() => {
        let accuracy =  90 + Math.floor(Math.random() * 10);
        setTimeout(() => {
        if (percentage < accuracy) {
            setPercentage(percentage + 4);
        }
        }, 50);
    }, [percentage]);

    return(
        <div id="DataInfo">
            <div className="row">
                <div className="col-lg-1"></div>
                <button className="btn btn-light col-lg-2" id="button_home" onClick={clickBack}><strong>Click New State</strong></button>
                {(state === "Click A State!")
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
            
            <div id="infoText" className="row">
                <div className="col-lg-1"/>
                <div className="col-lg-4" style={{ width: 250, marginTop: '30px'}}>
                    <CircularProgressbar className="circle" value={percentage} text={`${percentage}%`}
                    styles={{
                        trail: {
                            // Trail color
                            stroke: 'white',
                            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                            strokeLinecap: 'butt',
                            // Rotate the trail
                            transform: 'rotate(0.25turn)',
                            transformOrigin: 'center center',
                          },
                          text: {
                            // Text color
                            fill: 'white',
                            // Text size
                            fontSize: '26px',
                          },path: {
                            // Path color
                            stroke: `rgba(243, 179, 62, ${percentage / 100})`,
                            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                            strokeLinecap: 'butt',
                            // Customize transition animation
                            transition: 'stroke-dashoffset 0.5s ease 0s',
                            // Rotate the path
                            transform: 'rotate(0.25turn)',
                            transformOrigin: 'center center',
                          },
                      }}/>
                </div>
                <div className="col-lg-7" >
                    <h1 class="infoTextText">Predicted Number of Participants: <strong style={{}}>{Math.floor(demand)}</strong></h1>
                    <h1 class="infoTextText">Predicted Costs: <strong>{Math.floor(cost)}</strong></h1>
                    <h1 class="infoTextText">Predicted Infants: <strong>{Math.floor(infant)}</strong></h1>
                </div>
            </div>
        </div>
    );
}