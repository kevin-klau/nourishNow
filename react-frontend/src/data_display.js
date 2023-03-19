import React, { useEffect, useState } from "react";

export default function data({state}){
    function clickBack(){
        document.getElementById('title').scrollIntoView();
    }
    function clickForward(){
        document.getElementById('searchTitle').scrollIntoView();
    }

    

    return(
        <div id="DataInfo">
            <div className="row">
                <div className="col-lg-1"></div>
                <button className="btn btn-light col-lg-2" id="button_home" onClick={clickBack}><strong>Click New State</strong></button>
                {(state === "Please Click On A State!")
                    ? <h1 id="state_header" className="col-lg-6">{state}</h1>
                    : <h1 id="state_header" className="col-lg-6">{state} Stats</h1>
                }
                <button className="btn btn-light col-lg-2" id="button_home" onClick={clickForward}><strong>Check Out Food!</strong></button>
            </div>
        </div>
    );
}