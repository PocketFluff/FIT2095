var Actor = require('../models/actor');
var Movie = require('../models/movie');
const mongoose = require('mongoose');

module.exports = {

    getAll: function (req, res) {
        Movie.find().populate('actors').exec(function(err,movies){
            if (err) return res.status(400).json(err);

            res.json(movies);
        });
    },


    createOne: function (req, res) {
        console.log("!!!!!!!!!!!");
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();

        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);

            res.json(movie);
        });
    },


    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();

                res.json(movie);
            });
    },


    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();

            res.json(movie);
        });
    },

    // Lab Tasks Below:

    deleteMovieById: function (req, res) {
        Movie.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);

            res.json();
        });
    },

    removeActor: function (req, res) {
        Movie.findOne ({ _id: req.params.movieId}, function(err, movie){
            if (err) return res.status(400).json(err);
            if(!movie) return res.status(404).json();

            // variable actor is an Object. Find index of the movie to remove, splice it.
            actorIndex = movie.actors.indexOf(req.params.actorId);
            movie.actors.splice(actorIndex, 1);

            movie.save(function (err) {
                if (err) return res.status(500).json(err);

                res.json(movie);
            });
            
        });
    },

    addActor: function (req, res) {
        Actor.findOne ( { _id: req.params.actorId}, function(err, actor){
            if (err) return res.status(400).json(err);
            if(!actor) return res.status(404).json();

            Movie.findOne ( { _id: req.params.movieId}, function (err, movie){
                if (err) return res.status(400).json(err);
                if(!movie) return res.status(404).json();

                movie.actors.push(actor._id);
                // actor.movies.push(movie._id);
                // actor.save(function (err) {
                //     if (err) return res.status(500).json(err);

                //     res.json(actor);
                // });
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(movie);
                });

            });
        });
    },

    getMovieYear: function (req, res) {
        Movie.find( { year: {$gte: req.params.year2, $lte: req.params.year1}}, function(err, movie){
            if (err) return res.status(400).json(err);
            if(!movie) return res.status(404).json();

            res.json(movie);
        });
    },

    deleteMovieYear: function (req, res) {
        
        integerMovie = parseInt(req.params.delYear);
        Movie.deleteMany( {year: {$lte: integerMovie}}, function(err, movie){
            if (err) return res.status(400).json(err);

            res.json(movie);
        });

        // Movie.findOneAndRemove({year: 1990}, function(err,movie){
        //     if (err) return res.status(400).json(err);

        //     res.json(movie);
        // });
    }

};