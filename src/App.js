import './App.css';
import React, {Component} from "react";
import Button from "./components/CustomButtonComponent";
import Routes from './Routes';

function App() {
  return(                                
    <div className="App">
      <Button />
      <Routes />
    </div>
  );
}

export default App;
