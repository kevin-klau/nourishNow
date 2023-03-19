import React, { useEffect, useState } from "react";

export default function data({state}){
    function clickBack(){
        document.getElementById('title').scrollIntoView();
    }
    return(
        <div id="DataInfo">
            <div className="row">
                <div className="col-lg-1"></div>
                <button className="btn btn-light col-lg-2" id="button_home" onClick={clickBack}><strong>Search New State</strong></button>
                <h1 id="state_header" className="col-lg-6">{state} Stats</h1>
            </div>
        </div>
    );
}