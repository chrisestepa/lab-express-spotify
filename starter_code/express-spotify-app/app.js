const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

app.use(expressLayouts);
app.set('layout', 'index');

app.set('views', __dirname + '/views/layouts');
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));


var SpotifyWebApi = require('spotify-web-api-node');

var clientId = 'xxxxx',
    clientSecret = 'xxxxx';

var spotifyApi = new SpotifyWebApi({
  clientId : clientId,
  clientSecret : clientSecret
});

// Retrieve an access token.
spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    spotifyApi.setAccessToken(data.body['access_token']);
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err);
});


app.get('/', (req, res, next) => {
  res.render('index');
  next(res.query)
});


app.get('/artist', (req, res) => {
  spotifyApi.searchArtists(req.query.artist)
  .then((response) => {
    res.render('artist', {
      prueba: response
    });
  }).catch((err) => {
    console.log("Unable to find the requested artist.");
  });
});




let port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
