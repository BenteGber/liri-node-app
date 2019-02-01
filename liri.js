const log = console.log;

const fs = require('fs');

require('dotenv').config();

const Spotify = require('node-spotify-api')

const axios = require('axios')

const keys = require('../liri-node-app/keys')

let spotify = new Spotify(keys.spotify)

const moment = require('moment')
moment().format()

// Takes arguments from CLI for which function to run
let command = process.argv[2]
// Takes parameters for search
let queryString = process.argv.slice(3).join(' ')


//Assemebles first half of log Entry so that every comand is tracked even if not data is returned
let logEntry = command + ',' + queryString + ',' + moment().format('X') + ',';

//Function for updating log that will be called within each command inside the runCommands fucntion
const update_log = (logEntry, data) => fs.appendFile('log.txt', logEntry + ',' + data, (error) => {
    return error ? log(error) : log('Upadted log')
})


//Run commands takes in cli arguments and determines which operation  to execute
const runCommands = (command, queryString) => {


    switch (command) {

        // ##Bandisintown

        case 'concert-this':
            let concertQueryUrl = 'https://rest.bandsintown.com/artists/' + queryString + '/events?app_id=codingbootcamp'
            axios.get(concertQueryUrl).then((response) => {
                let data = response.data

                data.forEach((e, i) => {

                    if (i < 20) {
                        log(`༼ ºل͟º༼ ºل͟º ༽ºل͟º ༽ºل͟º ༽༼ ºل͟º༼ ºل͟º ༽ºل͟º ༽ºل͟º ༽`)
                        log(`GA TECH Bootcamp presents: `, queryString)
                        log(`Performing at: `, e.venue.name)
                        log(`on: `, moment(e.datetime).format('MM/DD/YYYY'))
                        log(`in beautiful: `, e.venue.city, ",", e.venue.region)
                        log(` `)
                    }
                })
            })
                .catch((error) => {
                    log(error)
                })

            break;


        // ##Spotify 

        case 'spotify-this-song':
            let qParam = queryString
            let type = 'track'
            // https://www.npmjs.com/package/node-spotify-api
            spotify.search({
                type: type,
                query: qParam,
            }, (err, data) => {
                if (err) { log(err) }
                // iterates over the items array 
                data.tracks.items.forEach((e, i) => {
                    // the r object holds our desired response data
                    let r = {
                        // Since the artist name is stored in an array of objects the map fucntion iterates the array and returns the value of the name property
                        artist_name: e.artists.map((x) => x.name),
                        song_name: e.name,
                        album: e.album.name,
                        preview_link: e.preview_url,
                        spotify_link: e.album.external_urls
                    }
                    var z

                    if (i < 10) {
                        log(' ')
                        log(' ')
                        log(`ᕕ(⌐■_■)ᕗ ♪♬`)
                        log(' ')
                        //iterates and logs all Key Value Pairs for the r object
                        for (z in r) { log(z, r[z]) }
                        log(' ')
                        log(`┐(・。・┐) ♪`)
                        log(' ')
                        log(' ')
                    }
                })
            })

            break;


        // ##OMDB

        case 'movie-this':
            let movieQueryUrl = 'http://www.omdbapi.com/?apikey=trilogy&t=' + queryString
            axios.get(movieQueryUrl).then((response) => {
                let data = response.data;
                let r = {
                    title: data.Title,
                    released: moment(data.Released, 'DD-MMM-YYYY').format('dddd, MMMM Do YYYY'),
                    imbd_rating: data.Ratings[0].Value,
                    rotten_tomatoes_rating: data.Ratings[1].Value,
                    produced_in: data.Country,
                    language: data.Language,
                    plot: data.Plot,
                    starring: data.Actors,
                }
                update_log(logEntry, JSON.stringify(r))
                log('')
                log('')
                log('(つ▀¯▀)つ Your Movie ⊂(▀¯▀⊂)')
                for (z in r) { log(z, r[z]) }
                log('')
                log('')
            })
                .catch((error) => {
                    log(error)
                })

            break;

        // ## reads random.txt and executes 

        case 'do-what-it-says':
            fs.readFile('random.txt', 'Utf8', (error, data) => {
                if (error) { log(error) }
                let choices = data.split(',');
                runCommands(choices[0], choices[1])

            })
            break;
        default:
            log("Please see the ReadMe.md for instructions on using this app")
            break;
    }
}

runCommands(command, queryString)
