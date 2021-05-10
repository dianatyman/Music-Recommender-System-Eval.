import React, { Component } from "react";
import Button from "./../components/CustomButtonComponent";
import history from './../history';
import "./Home.css";

export default class Home extends Component {

  /* CallFunction_1(){
    //CB.render();
    window.open("/CollabFiltering");
    
    const script = document.createElement('script');
    script.src = "./CollabFiltering.js";
    script.async = true;
    document.body.appendChild(script);

    window.location.href = script;
    
    //window.open("./CollabFiltering.js");
    //window.reload("./CollabFiltering.js", true);
    //document.location.href = "./CollabFiltering.js";
  } */ 


  render() {
    return (
      <div className="Home">
        <h1>Music Recommendation System Evaluation</h1>
        <p>
          Music recommendation system where users can choose which recommendation algorithm they enjoy better. 
          This app is part of my final project for my degree in data science imparted by University Pompeu Fabra.
        </p>

        <Button
          border="none"
          color="pink"
          height = "200px"
          onClick={() => alert("CB Button")}
          radius = "50%"
          width = "200px"
          children = "Content Based Recommender System"
        />
        <div style={{width:"25%", display:'inline-block'}}/>
        <Button
          border="none"
          color="#9DC183"
          height = "200px"
          onClick={() => history.push('/CollabFiltering')}
          radius = "50%"
          width = "200px"
          children = "Collaborative Filtering"
        />
      </div>
    );
  }
}