let express = require('express');
let router = express.Router();
let http = require('http');
let app = express();

let database = [];

router.get('/', function(request, response){
    response.send("Week 4 Lab");
});

router.get('/newItem/:name/:quantity/:price', function(request, response){
    let newItem = {
        id : (Math.round(Math.random()*1000)),
        name : request.params.name,
        quantity : request.params.quantity,
        price : request.params.price
    };

    database.push(newItem);
    console.log(newItem);
    response.send(newItem);
});

router.get('/listAllItems', function(request, response){
    response.send(listItems());
});

function listItems(){
    let dbList = 'ID  ItemName   Quantity   Price  </br>';
    for (let i = 0; i < database.length; i++) {
        let costI = parseInt(database[i].price);
        let quantityI = parseInt(database[i].quantity);
        let total = costI * quantityI;

        dbList += database[i].id + ' | ' + database[i].name + ' | ' + database[i].quantity + ' | ' + database[i].price + ' | ' + total + ' </br> ';
    }
    return dbList;
}

router.get('/deleteItem/:itemID', function(request, response){

    getID = request.params.itemID

    for (let i = 0; i < database.length; i++){
        tempID = database[i].id;

        if (tempID == getID){
            database.splice(i, 1);
        }
    }

    response.send('Deleted Product ID ' + getID + '</br>' + listItems());
});

// LOOK AT ARRAY.REDUCE - > Total sum of a value in an array.
router.get('/totalValue', function(request, response){
    let total = 0;

    for (let i = 0; i < database.length; i++){
        let cost = database[i].quantity * database[i].price;
        total += cost;
    }
    response.end('Total of warehouse is:' + total);
});

module.exports = router;