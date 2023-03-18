import logo from './logo.svg';
import './App.css';
import React from "react";
import image from "./images/image-1.jpg"
import plane from "./images/image-2.png"

function App() {
  return (
    <div className="container-center-horizontal">
      <div className="home">
        <h1 className="title inknutantiqua-normal-black-55px">
          <span className="inknutantiqua-normal-black-55px">M</span>
          <span className="span1">ealMapper</span>
        </h1>
        <div className = "overlap-group">
          <img className = "image-1" src={image} alt="image 1" />
          <div className = "ellipse-3"></div>
          <img className = "image-2" src={plane} alt="image 2" />
          <img className = "image-3" src={plane} alt="image 3" />
          <div className="rectangle-2"></div>
          <div className="demo">
            Demo
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
