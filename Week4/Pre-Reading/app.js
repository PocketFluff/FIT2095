let express = require('express');
let url = require('url');
let app = express();

let db = [];
let rec1 = {
    name: 'Ben',
    age: '26',
    address: 'Mel'
};
db.push(rec1);

function generateList() {
    returnString = 'Name  Age  Address </br>';

    for (let i = 0; i < db.length; i++){
        returnString += db[i].name + ' |' + db[i].age + ' |' + db[i].address + '</br>';
    }

    return returnString
}

function deleteUser(userID) {
    userID = parseInt(userID, 10);
    db.splice(userID - 1, 1);
}

app.get('/', function (request, response){
    response.send("Homepage");
});

app.get('/list', function (request, response){
    response.send(generateList());
});

app.get('/newuser', function (request, resposne){
    let currentURL = request.url;
    console.log(currentURL);

    let parsedData = url.parse(currentURL, true).query; //???
    console.log (parsedData);

    let newRecord = {
        name: parsedData.name,
        age: parsedData.age,
        address: parsedData.address
    };

    db.push(newRecord);
    resposne.send(generateList());
});

app.get('/delete/:userId2Delete', function (req, res) {
    console.log(req.params);
    deleteUser(req.params.userId2Delete);
    res.send(generateList());
    })

app.listen(8080);
