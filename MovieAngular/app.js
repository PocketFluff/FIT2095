//https://hub.packtpub.com/building-movie-api-express/
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const actors = require('../MovieAngular/routers/actor');
const movies = require('../MovieAngular/routers/movie');
let path = require('path');

const app = express();

app.listen(8080);

app.use("/", express.static(path.join(__dirname, "dist/movieAng")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/movies', function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');

});

//Configuring Endpoints
//Actor RESTFul endpoionts
app.get('/actor', actors.getAll);

app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.post('/actors/:id/movies', actors.addMovie);
app.delete('/actors/:id', actors.deleteOne);
app.delete('/actors/:actorId/:movieId', actors.removeMovie);
app.put('/actors/', actors.addYears);


//Movie RESTFul  endpoints
app.delete('/movie/:delYear', movies.deleteMovieYear);
app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);
app.delete('/movies/:id', movies.deleteMovieById);
app.delete('/movies/:movieId/:actorId', movies.removeActor);
app.post('/movies/:movieId/:actorId', movies.addActor);
app.get('/movies/:year1/:year2', movies.getMovieYear);

