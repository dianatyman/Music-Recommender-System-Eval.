import './CBased.css';
import React, {Component} from "react";

class CBased extends Component{

  constructor(){
    super();
    this.state = {
      songs:[],
      songs_audio:[],
      songs_img:[],
      artName:[],
      full: false
    }
  }

  
  componentDidMount() {

    let songIDS = this.props.songID
    let accessToken = this.props.token
    let artistID = this.props.artistID
    let genres = this.props.genres

    if (!accessToken)
      return;
    // Get audio analysis features from the user's songs
    const energy = [];      //low level feature
    const key = [];         //high level feature
    const loudness = [];    //low level feature -- can be negative
    const acoustic = [];    //low level feature (?)
    const instrum = [];     //low level feature (?)
    const liveness = [];    //low level feature (?)
    const valence = [];     //low level feature (?)
    const tempo = [];       //high level feature
    const duration = [];    //song duration in ms!

    const recom_songs = [];
    const recom_songs_audio = [];
    const recom_songs_img = [];
    const artistName = [];

    fetch('https://api.spotify.com/v1/audio-features?ids=' + songIDS, {
      method: 'GET',
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json' , 'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => {
      if(!data.audio_features){
          return;
        }
          
          data.audio_features.map((audio, i) => {
            
            energy.push(Number(audio.energy))
            key.push(audio.key)
            loudness.push(audio.loudness)
            acoustic.push(audio.acousticness)
            instrum.push(audio.instrumentalness)
            liveness.push(audio.liveness)
            valence.push(audio.valence)
            tempo.push(audio.tempo)
            duration.push(audio.duration_ms)
          });
          const avg_energy = (energy.reduce((sum, curr) => sum + curr, 0)/energy.length).toFixed(3) ;            
          const avg_key = (key.reduce((sum, curr) => sum + curr, 0)/key.length).toFixed() ;                     
          const avg_loud = (loudness.reduce((sum, curr) => sum + curr, 0)/loudness.length).toFixed(3) ;          
          const avg_acous = (acoustic.reduce((sum, curr) => sum + curr, 0)/acoustic.length).toFixed(3) ;           
          const avg_instr = (instrum.reduce((sum, curr) => sum + curr, 0)/instrum.length).toFixed(3) ;           
          const avg_liveness = (liveness.reduce((sum, curr) => sum + curr, 0)/liveness.length).toFixed(3) ;      
          const avg_val = (valence.reduce((sum, curr) => sum + curr, 0)/valence.length).toFixed(3) ;
          const avg_tempo = (tempo.reduce((sum, curr) => sum + curr, 0)/tempo.length).toFixed(3) ;
          const avg_duration = (duration.reduce((sum, curr) => sum + curr, 0)/duration.length).toFixed() ;      

          // Get the most popular genre of the user
          const words = genres.split(',');
          const wordCounts = { };

          for(var i = 0; i < words.length; i++)
            wordCounts[words[i]] = (wordCounts[words[i]] || 0) + 1;

          const getMax = object => {
            return Object.keys(object).filter(x => {
                 return object[x] == Math.max.apply(null, 
                 Object.values(object));
            });
          };

          const userGenreMAX = getMax(wordCounts)           // get most popular genre among user's song
          const userGenre = userGenreMAX[0].toString();
          const song_seed = songIDS.split(',');             //get user's top song for recommendation seed

          // Get 20 recommendations of content based for the user
          fetch("https://api.spotify.com/v1/recommendations?limit=20&market=ES&seed_artists=" + artistID + "&seed_genres=" + userGenre +
                    "&seed_tracks=" + song_seed[0] + "&target_acousticness=" + avg_acous + "&target_duration_ms=" + avg_duration + 
                    "&target_energy=" + avg_energy + "&target_instrumentalness=" + avg_instr + "&target_key=" + avg_key + "&target_liveness=" + avg_liveness +
                    "&target_loudness=" + avg_loud + "&target_tempo=" + avg_tempo + "&target_valence=" + avg_val, {
              method: 'GET',
              headers: {'Authorization': 'Bearer ' + accessToken}
          }).then(response => response.json())
          .then(data => {
            if(!data){
              return;
            }else{
              console.log(data)
              data.tracks.map(song =>{
                recom_songs.push(song.name)                       // song name
                recom_songs_audio.push(song.preview_url)          // audio sample of song
                recom_songs_img.push(song.album.images[2].url)    // small album image
                artistName.push(song.artists[0].name)             // artists name
              })

              this.setState({
                songs: recom_songs,
                songs_img: recom_songs_img,
                songs_audio: recom_songs_audio,
                artName: artistName,
                full: true
              })
            }
          });
    });
  }


  render() {
	   
      if(this.state.full){
        return(
          
          <div className="CB">
          {
            Object.keys(this.state.songs).map(index =>{
              return (
                <ul>
                  <a href={this.state.songs_audio[index]} target={"_blank"} rel="noreferrer">
                  <img src={this.state.songs_img[index]} style={{width: '60px'}}/> {this.state.songs[index] + " - " + this.state.artName[index]} <br />
                  </a>
                </ul>
              )
            })
          }
          
          </div>
          
        );
      }else{

        return(
          <div className="CB">
            <p>The recommended songs are not loading...please recharge the web page, excuse the inconvenience.</p>
          </div>
        );
      }
  }
    
}

export default CBased;