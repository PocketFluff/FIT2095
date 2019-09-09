const mongoose = require('mongoose');           //Get instance of Mongoose
var express = require('express');				//Get instance of Express
let bodyParser = require('body-parser');		//Get instance of Body Parser
const mongodb = require('mongodb');				//Get instance of MongoDb

var app = express();							//Get express object as app

const MongoClient = mongodb.MongoClient;		//Reference Monogodb client
const Task = require('./models/task');
const Developer = require('./models/developer');
let database;									//Used to reference the Mongodb database??

app.engine('html', require('ejs').renderFile);  //Setup the view Engine
app.set('view engine', 'html');
app.use(express.static('images'));              //Setup the static assets directories
app.use(express.static('css'));
const url = 'mongodb://localhost:27017/webDB';

/*
    Mongoose Connection
     webDb: database connected to.
*/
mongoose.connect(url, {useNewUrlParser: true}, function(err){
    if (err) {
        console.log('Error in Mongoose connection.');
        throw err;
    }
    else {
        console.log('Successful connection.');

    }
});

app.use(bodyParser.urlencoded({
    extended: false
}));


/*
    GET Methods

    - Index page (Homepage)
    - Add new Developer
    - Add new Task
    - Show all Developers
    - Show all Tasks
    - Delete Task (by ID && by 'Completed' status)
    - Update Task

*/
app.get('/', function(request, response){
    response.render('index.html');
});

app.get('/addDeveloperPage', function(request, response){
    response.render('newDeveloper.html');
});

app.get('/addTaskPage', function(request, response){
    response.render('newTask.html');
});

app.get('/showDeveloperPage', function(request, response){
    response.render('listDeveloper.html');
});

app.get('/showTaskPage', function(request, response){
    response.render('listTask.html');
});

app.get('/deleteTaskPage', function(request, response){
    response.render('deleteTask.html');
});

app.get('/updateTaskPage', function(request, response){
    response.render('updateTask.html');
});

/*
    POST Methods

    - Insert new developer
    - Insert new task
    - Delete task(s)
    - Update task
    
*/

app.post('insertDeveloper', function(request, response){

});

app.post('insertTask', function(request, response){
    taskID = Math.floor(Math.random() * 1000);		//Integer from 0-1000.
    taskStatus = 'In Progress';
    taskDate = new Date(request.body.dueDate);

    var newTask = new Task({
        _ID : new mongoose.Types.ObjectId(),
        name: request.body.taskName,
        assignTo: request.body.assigned,
        dueDate: taskDate,
        status: taskStatus,
        description: request.body.description
    });

    newTask.save(function (error){
        if (error){
            console.log('Error adding task to collection.');
            throw error;
        }
        console.log('New task successfully added to collection.')
    });

    response.redirect('/showTaskPage');
});

app.post('deleteTask', function(request, response){

});

app.post('deleteAllTask', function(request, response){

});


app.post('updateTask', function(request, response){

});