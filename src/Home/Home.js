// import React, { Component } from "react";
// import window from 'global';
// import querystring from 'querystring';
// import Button from "./../components/CustomButtonComponent";
// import history from './../history';
// import "./Home.css";
// import CBased from "./../CBased/CBased";

// const fs = require('fs')
// const SpotifyWebApi = require('spotify-web-api-node');
// const spotifyApi = new SpotifyWebApi();

// export default class Home extends Component {

//   constructor() {
//     super();
//     this.state = {
//       userName:'',
//       isActive:false,
//       token:'',
//       songName:[],
//       songID:[],
//       limit:10
//     }
//   }

//   getData (accessToken) {
//     fetch('https://api.spotify.com/v1/me/top/tracks?limit=' + this.state.limit, {
//       method: 'GET',
//       headers: {'Authorization': 'Bearer ' + accessToken,
//                 'Content-Type': 'application/json',}
//     }).then(response => response.json())
//     .then(data => this.setState(state => {
//       //data.items.map(i => state.userData.push(!i.name))
//       //console.log(data);
//       data.items.map(function(i){
//         if (!state.songName.includes(i.name) && !state.songID.includes(i.id)){
//           state.songName.push(i.name);
//           state.songID.push(i.id);
//         }
//         return state.songName && state.songID;
//       })
//     }));

//     // Check if it retreives song name and id correctly
//     //console.log(this.state.songName);
//     //console.log(this.state.songID);
//   }

//   componentDidMount() {
//     // let parsed = querystring.parse(window.location.search);
//     // let accessToken = parsed.access_token;

//     const url = new URL(window.location.href);
//     const accessToken = url.searchParams.get('access_token');

//     //console.log(accessToken);

//     //Fetch User's profile information
//     fetch('https://api.spotify.com/v1/me', {
//       method: 'GET',
//       headers: {'Authorization': 'Bearer ' + accessToken}
//     }).then(response => response.json())
//     .then(data => this.setState({
//       userName: data.display_name
//     }));

//     if(accessToken){
//       this.getData(accessToken);
//     };

//     this.setState({
//         token: accessToken
//     });

//   }

//   showHandler = ()=>{
//       this.setState({
//           isActive: true
//       })
//   }

//   // hideHandler = () =>{
//   //     this.setState({
//   //         isActive: false
//   //     })
//   // }

//   render() {

//     return (
//       <div className="Home">

//         {this.state.isActive ? 
//           <div>
//             <h1>Music Recommendation System Evaluation</h1>
//             <p>
//               Music recommendation system where users can choose which recommendation algorithm they enjoy better. 
//               This app is part of my final project for my degree in data science imparted by University Pompeu Fabra.
//             </p>

//             <h1 style={{'fontSize': '15px','marginTop': '5px' }}>User name: {this.state.userName} </h1>

//             <Button
//               border="none"
//               color="pink"
//               height = "200px"
//               onClick={() => history.push('/CBased' + '/?access_token=' + this.state.token)}
//               radius = "50%"
//               width = "200px"
//               children = "Content Based Recommender System"
//             />

//             <div style={{width:"25%", display:'inline-block'}}/>
//             <Button
//               border="none"
//               color="#9DC183"
//               height = "200px"
//               onClick={() => history.push('/CollabFiltering' + '/?access_token=' + this.state.token)}
//               radius = "50%"
//               width = "200px"
//               children = "Collaborative Filtering"
//             />

//           </div> : <button onClick={() => window.location='http://localhost:8888/login' }>Sign in with Spotify</button>                                                                      

//           } 

//           <button onClick={this.showHandler}>Click here to continue</button>

//           {/* arreglar esto, esconder el botón o cambiarlo para que funcione con el api */}

//     </div>
    
//     );
//   }

// }










