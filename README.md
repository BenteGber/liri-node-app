# liri-node-app

## Language Interpretation and Recognition Interface

CLI that takes passes search queires to Spotify, Bandisintown API, and OMDB and returns data to the CLI:

Video: [![Example Video](Liri-node-app.mov)]( 'Liri-node-app.mov' "Liri-Node-App")

```
concert-this 'band name'
```

### Returns data about events including 
    * Name of Venue
    * Venue Location
    * Date of Event

```
spotify-this-song 'song name here'
```

### Returns 
    * Artist(s)
    * The Song's Official Name
    * A preview link of the song from Spotify
    * The album that the song is from

```
node liri.js movie-this 'movie name here'
```
### Returns
    * Title of the movie.
    * Year the movie came out.
    * IMDB Rating of the movie.
    * Rotten Tomatoes Rating of the movie.
    * Country where the movie was produced.
    * Language of the movie.
    * Plot of the movie.
    * Actors in the movie.

```
node liri.js do-what-it-says
```
### Returns
    *Uses `<fs>` to read a text file and call the ```spotify-this-song``` command using the provided txt file