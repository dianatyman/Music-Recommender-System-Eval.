import './App.css';
import React, { Component } from "react";
import Routes from './Routes';
import CBased from "./CBased/CBased";
import CFiltering from "./CFiltering/CollabFiltering";

class App extends Component {

  	constructor(props){
    	super(props);
    	this.state = {
      		token:'',
      		dataAudio:[],
      		isActive:false,
      		userName:'',
      		songName:[],
      		songID:[],
      		artistID:[],
      		genres:[],
      		audio_feat:[],
      		limit:10				
    	}
  	}

  	componentDidMount() {
    	const url = new URL(window.location.href);
		const accessToken = url.searchParams.get('access_token');

		console.log(accessToken);

		if(!accessToken){
    		return;
    	}else{

		  	this.setState({
	        	token: accessToken
	    	});

	    	// Fetch User's profile information
	    	fetch('https://api.spotify.com/v1/me', {
	      		method: 'GET',
	      		headers: {'Authorization': 'Bearer ' + accessToken}
	    	}).then(response => response.json())
	    	.then(data => this.setState({
	      		userName: data.display_name
	    	}));

	    	// Fetch User's most listened/top songs + songs id's
		    fetch('https://api.spotify.com/v1/me/top/tracks?limit=' + this.state.limit, {
		      	method: 'GET',
		      	headers: {'Authorization': 'Bearer ' + accessToken}
		    }).then(response => response.json())
		    .then(data => {
		    	let id = []
		    	let ids = data.items.map(datas => {
		    		if (!id.includes(datas.id)){
	      				id.push(datas.id)
		        	};
		        	return id;
		    	})

		    	this.setState({
		    		songID: ids[0]
		    	})
		    });

		    // Fetch User's top 3 artists -- nedeed for spotify's api content based recommendations
		    fetch('https://api.spotify.com/v1/me/top/artists?limit=3', {
		      	method: 'GET',
		      	headers: {'Authorization': 'Bearer ' + accessToken}
		    }).then(response => response.json())
		    .then(data => {
		    	if(!data.items){
		    		return;
		    	}
		    	let id = []
		    	let gen = []
		    	let ids = data.items.map(datas => {
		    		if (!id.includes(datas.id)){
	      				id.push(datas.id)
		        	};
		        	return id;
		    	})

		    	let genre = data.items.map(datas => {
		    		if(!gen.includes(datas.genres)){
		    			gen.push(datas.genres)
		    		};

		    		this.setState({
		    			genres: gen.flat()
		    		});

		    		return gen;
		    	})
		    	
		    	this.setState({
		    		artistID: ids[0]
		    	})

		    	
		    });
		}

  	}


  	showHandler = ()=>{
      	this.setState({
        	isActive: true
      	})
  	}

  render(){
    return (
      <div className="App">
        <Routes />
        {this.state.isActive ? 
        	
        	<div>
        	<header className="App-header">
	        <h1>Music Recommendation System Evaluation</h1>
	        <p>
	          Music recommendation system where users can choose which recommendation algorithm they enjoy better. 
	          This app is part of my final project for my degree in data science imparted by University Pompeu Fabra.
	        </p>
	        </header>
	        <br />
	        <br />
	        <h1 style={{'fontSize': '25px','marginTop': '5px', 'textAlign': 'left', 'border': '3px solid #9DC183', 'padding': '10px'}}>Content Based Recommendations for {this.state.userName} </h1>
	        <CBased songID={this.state.songID.toString()} token={this.state.token} artistID={this.state.artistID.toString()} genres={this.state.genres.toString()}/>
	        
	        <br />
	        <br />
	        <h1 style={{'fontSize': '25px','marginTop': '5px', 'textAlign': 'left', 'border': '3px solid #9DC183', 'padding': '10px'}}>Collaborative Filtering Recommendations for {this.state.userName} </h1>
	        <CFiltering userName={this.state.userName} token={this.state.token} artistID={this.state.artistID.toString()} genres={this.state.genres.toString()} />

	        </div> : <button onClick={() => {
            				window.location = window.location.href.includes('localhost') 
              				? 'http://localhost:8888/login' 
              				: 'https://music-recommender-eval-backend.herokuapp.com/login' }
          				}>Sign in with Spotify</button>                                                                      

        } 
        <div>{!this.state.isActive && <button onClick={this.showHandler}>Click here to continue</button>}</div>
        

      </div> 
     
    );
  }
  
}

export default App;
