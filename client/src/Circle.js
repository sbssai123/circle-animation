import React, { Component } from 'react';
import Cookies from 'js-cookie';
import './Circle.css';
import axios from 'axios';

class Circle extends Component {

  state = {
    currentSong: null,
    refreshToken: "",
    songData: {}
  }

  componentDidMount() {
    const refreshToken = Cookies.get('SPOTIFY_REFRESH_TOKEN')
    if (refreshToken) {
      this.getCurrentTrack(refreshToken)
      this.interval = setInterval(() => {
        this.getCurrentTrack(refreshToken)
      }, 8000);
    }
  }

  getCurrentTrack(refreshToken) {
    axios.get('/current_track').then(response => {
      this.setState({refreshToken: refreshToken})
      const songData = response.data
      this.setState({songData: songData})
      console.log(response.data)
    })
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  onLogin = () => {
    axios.get('/login').then(response => {
      window.location.assign(response.data)
    });
  }

  render() {
    return (
      !this.state.refreshToken ?
      <div className="scene">
        <div className="scene-description">
          <h3 className="login-text">Log into your Spotify account to render a scene based off of what you are currently listening to.</h3>
          <button className="get-started-button" onClick={this.onLogin}>Get started</button>
        </div>
      </div> :
      <AnimateCircle songData={this.state.songData}/>
    );
  }
}

const AnimateCircle = ({songData}) => {
  const currentSong = songData.current_song_title
  if (!currentSong) {
    return (
      <div className="scene empty-scene">
        <h2 className="empty-scene-text">Please start playing a song from Spotify!!</h2>
      </div>

    );
  }
  let mood = 0;
  if (songData.danceability >= .5 && songData.energy >= .65) {
    mood = 1;
  }
  return (
    mood === 1 ? <SunCircle currentSong={currentSong}/> : <MoonCircle currentSong={currentSong}/>
  )
}

const SunCircle = ({currentSong}) => (
    <div className="scene sunny-scene">
      <div className="clouds"></div>
      <div className="circle sun"></div>
      <div className="clouds"></div>
      <p className="sun-font">Currently playing: {currentSong}</p>
    </div>
)

const MoonCircle = ({currentSong}) => (
    <div className="scene moon-scene">
      <div className="clouds"></div>
      <div className="circle moon"></div>
      <div className="clouds"></div>
      <p className="moon-font">Currently playing: {currentSong}</p>
    </div>
 )
export default Circle;
