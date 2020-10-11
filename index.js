const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const SpotifyWebApi = require('spotify-web-api-node');

dotenv.config()
const app = express();
app.use(cookieParser());
app.use(cors());

const scopes = ['user-read-currently-playing', 'user-read-playback-state'];

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI
});

// Prompt the user to login
app.get('/login', (req, res) => {
    res.send(spotifyApi.createAuthorizeURL(scopes));
});

// Redirect endpoint that gets called after user logins
app.get('/callback', (req, res) => {
    const error = req.query.error;
    const code = req.query.code;
    console.log(code)

    spotifyApi.authorizationCodeGrant(code).then(data => {
      const access_token = data.body['access_token'];
      const refresh_token = data.body['refresh_token'];
      const expires_in = data.body['expires_in'];
      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);
      // Set cookies if need to access on client side
      res.cookie('SPOTIFY_ACCESS_TOKEN', access_token);
      res.cookie('SPOTIFY_REFRESH_TOKEN', refresh_token);
      setInterval(async () => {
        const new_token_data = await spotifyApi.refreshAccessToken();
        const access_token = new_token_data.body['access_token'];
        console.log('The access token has been refreshed!');
        spotifyApi.setAccessToken(access_token);
        // Reset cookie with correct access_token
        res.cookie('SPOTIFY_ACCESS_TOKEN', access_token);
      }, expires_in / 2 * 1000);
      res.redirect(APP_BASE_URI)
    });
});

app.get('/current_track', async (req, res) => {
    if (!spotifyApi.getAccessToken()) {
        const refreshToken = req.cookies['SPOTIFY_REFRESH_TOKEN']
        spotifyApi.setRefreshToken(refreshToken);
        const new_token_data = await spotifyApi.refreshAccessToken();
        const access_token = new_token_data.body['access_token'];
        spotifyApi.setAccessToken(access_token);
        // Reset cookie with correct access_token
        res.cookie('SPOTIFY_ACCESS_TOKEN', access_token);
    }
    spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        if (data.body && data.body.is_playing) {
            const current_song_title = data.body.item.name
            const current_song_id = data.body.item.id
            console.log("User is currently playing something!");
            return {"current_song_title": current_song_title, "current_song_id": current_song_id}
        } 
        else {
            console.log("Not currently playing something")
            return {"current_song_title": null, "current_song_id": null}
        }
    }).then((song_data) => {
        if (song_data.current_song_id) {
            spotifyApi.getAudioFeaturesForTrack(song_data.current_song_id).then((data) => {
                if (data.body) {
                    res.send({
                        "current_song_title": song_data.current_song_title,
                        "danceability": data.body.danceability,
                        "energy": data.body.energy
                        }
                    );
                }
            });
        }
        else {
            res.send("Please play track from spotify")
        }
    });
});

app.listen(8080, function () {
    console.log('Serving on port 8080');
});