const mongoose = require('mongoose');

const Actor = require('../models/actor');
const Movie = require('../models/movie');
var d = new Date();

module.exports = {

    getAll: function (req, res) {
        Actor.find().populate('movies').exec(function (err, actors) {
            if (err) return res.status(404).json(err);
                res.json(actors);
            
        });
    },

    createOne: function (req, res) {
        let newActorDetails = req.body;
        newActorDetails._id = new mongoose.Types.ObjectId();

        let actor = new Actor(newActorDetails);
        actor.save(function (err) {
            res.json(actor);
        });
    },

    getOne: function (req, res) {
        Actor.findOne({ _id: req.params.id })
            .populate('movies')
            .exec(function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                res.json(actor);
            });
    },


    updateOne: function (req, res) {
        Actor.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();

            res.json(actor);
        });
    },


    deleteOne: function (req, res) {
        /*
        Actor.findOne({ _id: req.params.id }, function (err, actor){
            
            var len = actor.movies.length;
            for (var i = 0; i < len; i++){
                Movie.deleteOne({_id : actor.movies[i]}, function (err){
                    if (err) return res.status(400).json(err);
                });
            }
            res.json();

        });*/
        
        Actor.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);

            res.json();
        });
        
    },


    addMovie: function (req, res) {
        Actor.findOne({ _id: req.params.id }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            
            Movie.findOne({ _id: req.body.id }, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();

                actor.movies.push(movie._id);
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);

                    res.json(actor);
                });
            })
        });
    },

    //Lab Tasks Below:

    removeMovie: function (req, res) {
        Actor.findOne ({ _id: req.params.actorId}, function(err, actor){
            if (err) return res.status(400).json(err);
            if(!actor) return res.status(404).json();

            // variable actor is an Object. Find index of the movie to remove, splice it.
            movieIndex = actor.movies.indexOf(req.params.movieId);

            actor.movies.splice(movieIndex, 1);

            actor.save(function (err) {
                if (err) return res.status(500).json(err);

                res.json(actor);
            });
            
        });
    },

    
    addYears: function (req, res) {

        currYear = d.getFullYear() - 50;

        Actor.updateMany({bYear: {$lte : currYear}}, {$inc: {bYear: -4}}, function(err, actor){
            if (err) return res.status(400).json(err);
            if(!actor) return res.status(404).json();
            console.log('success');

            res.json();
        });

    },

    findTwo: function(req, res) {
        Actor.find().populate('movies').exec(function (err, actors) {
            if (err) return res.status(404).json(err);
            let tempDB = [];

            for (let i = 0; i < actors.length; i++){
                if (actors[i].movies.length >= 2){
                    tempDB.push(actors[i]);
                }
            }
            res.json(tempDB);
        });
    }

};