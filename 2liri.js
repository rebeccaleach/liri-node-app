// LIRIbot

// TWITTER TWITTER TWITTER TWITTER TWITTER TWITTER

var keys = require('./keys.js');
var twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');

var client = new twitter(keys.twitterKeys);

if (process.argv[2] == 'my-tweets') {
  console.log('I typed "my tweets" yayyyy');
  // print the content and timestamp of last 20 tweets in the terminal
  var params = {screen_name: 'paperflye', count: 20};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for (var i = 0; i < 20; i++) {
        console.log(tweets[i].text)
        console.log(tweets[i].created_at);
      }
    }
  });
}


// SPOTIFY SPOTIFY SPOTIFY SPOTIFY SPOTIFY SPOTIFY 

if (process.argv[2] == 'spotify-this-song') {
  // print song name, artist, preview link from spotify, album name
  // if no song is provided after "spotify-this-song," print "The Sign" by Ace of Base as the default
  var track = process.argv[3];

  if (track === undefined) {
    track = 'The Sign - Ace of Base';
  }

  trackPlus = track.split(' ').join('+');

  spotify.search({type: 'track', query: trackPlus}, function(err, data) {
    if (err) {
      console.log('Error' + err);
      return;
    }
    console.log('Song Name: ' + data.tracks.items[0].name);
    console.log('Album: ' + data.tracks.items[0].album.name);
    console.log('Artist: ' + data.tracks.items[15].artists[0].name);
    console.log('Spotify Preview: ' + data.tracks.items[0].preview_url);
  })
}

// MOVIE MOVIE MOVIE MOVIE MOVIE MOVIE MOVIE MOVIE

if (process.argv[2] == 'movie-this') {
  // print title, release year, IMDB rating, country where it was produced, language, plot, actors, rotten tomatoes rating, rotten tomatoes url
  var title = process.argv[3];

  if (title === undefined) {
    title = "Mr. Nobody";
  }

  var titlePlus = title.split(' ').join('+');
  request.get('http://www.omdbapi.com/?t=' + titlePlus + '&r=json', function(error, response, body) {
    // if (!error && response.statusCode == 200) {
    //  console.log(body);
    // }
    console.log(JSON.parse(response.body).Title);
  })
  // if no movie title is provided, use "Mr. Nobody" as the default movie
}


// RANDOM TEXT RANDOM TEXT RANDOM TEXT RANDOM TEXT

if (process.argv[2] == 'do-what-it-says') {
  console.log('randommmmmm');
  // use the text inside random.txt to run one of the LIRI commands (tweets, spotify, or movies)

  fs.readFile('random.txt', 'utf8', function(error, data) {
    
    var arr = data.split(',');

    for (var i = 0; i < arr.length; i++) {
      console.log(process.argv[2]);
      console.log(process.argv[3]);
    }
  });
}