(this.webpackJsonpcircle=this.webpackJsonpcircle||[]).push([[0],{18:function(e,t,n){e.exports=n(42)},23:function(e,t,n){},24:function(e,t,n){},42:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(12),o=n.n(c),s=(n(23),n(13)),l=n(14),i=n(16),u=n(17),m=n(15),g=n.n(m),d=(n(24),n(2)),v=n.n(d),f=function(e){Object(u.a)(n,e);var t=Object(i.a)(n);function n(){var e;Object(s.a)(this,n);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={currentSong:null,refreshToken:"",songData:{}},e.onLogin=function(){v.a.get("/login").then((function(e){window.location.assign(e.data)}))},e}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=this,t=g.a.get("SPOTIFY_REFRESH_TOKEN");t&&(this.getCurrentTrack(t),this.interval=setInterval((function(){e.getCurrentTrack(t)}),8e3))}},{key:"getCurrentTrack",value:function(e){var t=this;v.a.get("/current_track").then((function(n){t.setState({refreshToken:e});var a=n.data;t.setState({songData:a}),console.log(n.data)}))}},{key:"componentWillUnmount",value:function(){this.interval&&clearInterval(this.interval)}},{key:"render",value:function(){return this.state.refreshToken?r.a.createElement(h,{songData:this.state.songData}):r.a.createElement("div",{className:"scene"},r.a.createElement("div",{className:"scene-description"},r.a.createElement("h3",{className:"login-text"},"Log into your Spotify account to render a scene based off of what you are currently listening to."),r.a.createElement("button",{className:"get-started-button",onClick:this.onLogin},"Get started")))}}]),n}(a.Component),h=function(e){var t=e.songData,n=t.current_song_title;if(!n)return r.a.createElement("div",{className:"scene empty-scene"},r.a.createElement("h2",{className:"empty-scene-text"},"Please start playing a song from Spotify!!"));var a=0;return t.danceability>=.5&&t.energy>=.65&&(a=1),1===a?r.a.createElement(E,{currentSong:n}):r.a.createElement(y,{currentSong:n})},E=function(e){var t=e.currentSong;return r.a.createElement("div",{className:"scene sunny-scene"},r.a.createElement("div",{className:"clouds"}),r.a.createElement("div",{className:"circle sun"}),r.a.createElement("div",{className:"clouds"}),r.a.createElement("p",{className:"sun-font"},"Currently playing: ",t))},y=function(e){var t=e.currentSong;return r.a.createElement("div",{className:"scene moon-scene"},r.a.createElement("div",{className:"clouds"}),r.a.createElement("div",{className:"circle moon"}),r.a.createElement("div",{className:"clouds"}),r.a.createElement("p",{className:"moon-font"},"Currently playing: ",t))},p=f;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(p,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[18,1,2]]]);
//# sourceMappingURL=main.a9cdb4a6.chunk.js.map