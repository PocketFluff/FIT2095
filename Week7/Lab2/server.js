var express = require('express');				//Get instance of Express
let bodyParser = require('body-parser');		//Get instance of Body Parser
const mongodb = require('mongodb');				//Get instance of MongoDb
const mongoose = require('mongoose');           //Get instance of Mongoose

var app = express();							//Get express object as app

const MongoClient = mongodb.MongoClient;		//Reference Monogodb client
const Task = require('./models/task');
const Developer = require('./models/developer');
let database;									//Used to reference the Mongodb database??

app.engine('html', require('ejs').renderFile);  //Setup the view Engine
app.set('view engine', 'html');
app.use(express.static('Public/images'));              //Setup the static assets directories
app.use(express.static('Public/css'));
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
  
    Developer.find({}, function(error, result){
        if (error){
            console.log('Error with developer list.');
        } else {
            response.render('listDeveloper.html', {
                db: result
            });
        }
    });
});

app.get('/showTaskPage', function(request, response){

    Task.find({}, function(error, result){
        if (error){
            console.log('Error with list');
        } else{
            Developer.find({}, function(err, res){
                if (err){
                    console.log('Error with developer');
                } else{
                    response.render('listTask.html', {
                        db: result,
                        devdb: res
                    });
                }
            })
          
        }
    });
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

app.post('/insertDeveloper', function(request, response){
    developerID = Math.floor(Math.random() * 1000);

    var newDeveloper = new Developer({
        _ID: developerID,
        name: {
            firstName : request.body.firstName,
            lastName : request.body.lastName
        },
        level: request.body.level,
        address: {
            state: request.body.state,
            suburb: request.body.suburb,
            street: request.body.street,
            unit: request.body.unit
        }
    });

    newDeveloper.save(function(error){
        if (error){
            console.log('Error adding developer to collection.');
            throw error;
        } else{
            console.log('New developer successfully added to collection.')
        }
    });

    console.log(newDeveloper);

    response.redirect('/showDeveloperPage');
});

app.post('/insertTask', function(request, response){
    taskID = Math.floor(Math.random() * 1000);		//Integer from 0-1000.
    taskStatus = 'In Progress';
    taskDate = new Date(request.body.dueDate);

    Developer.find({'_ID' : request.body.assigned}, '_id', function (error, result){
        if (error){
            console.log('Developer not in collection.');
        }
        else {
            var newTask = new Task({
                _ID : taskID,
                name: request.body.taskName,
                assignTo: result[0],
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
        }
    });
    response.redirect('/showTaskPage');
});

app.post('/deleteTask', function(request, response){
    taskID = request.body.taskID;

    Task.deleteOne({'_ID' : taskID}, function(error, result){
        if (error){
            console.log('Error deleting task' + taskID);
            throw error;
        }
    });
    response.redirect('/showTaskPage');
});

app.post('/deleteAllTask', function(request, response){

    Task.deleteMany({}, function (error, result){
        if (error){
            console.log('Error deleting all tasks.')
            throw error;
        }
    });
    response.redirect('/showTaskPage');
});


app.post('/updateTask', function(request, response){
    taskID = request.body.taskID;
    taskStatus = request.body.status;

    let filter = { '_ID': taskID };
	let update = { $set: { 'status': taskStatus}};
    Task.updateOne(filter, update, function(err, result){
        if (err){
            console.log('Error updating a task.');
            throw err;
        }
    });
    response.redirect('/showTaskPage');
});

app.listen(8080);