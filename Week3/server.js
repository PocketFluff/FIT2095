var http = require('http');
let urlParse = require('url');
var fs = require('fs');         //Node.JS module allowing to work with file system.
const {
    parse
} = require('querystring');
let fileName = 'index.html';

//Callback - function that is executed when the content is ready.
http.createServer(function(request, response){ // One parameter that is the callback function, is called with each new request
    const {method,url} = request; // get the URL and method from the request object
    console.log(url, method); // print them out

    let pathName=urlParse.parse(url, true).pathname; //parse pathname from url - get clarification.
    
    if (pathName === '/'){ //If homepage is going to be accessed
        fileName = 'index.html';
        sendFile(response, fileName);
    
    } else if (request.method === 'POST' && url === '/server.js'){ //Check if the user clicks login
        let body = '';

        request.on('data', chunk => { // Event that triggers whenever data is recieved in request body
            body += chunk.toString();
            console.log(1, body);
        });
        console.log(1, body);

        request.on('end', () => { // When data is finished loading from the body into var.body
            let credentials = parse(body); //parse body of request into key-value pairs

            if(credentials.uName === 'admin' && credentials.uPass === 'pass'){ //if credentials match
                fileName = './mainpage.html';
                sendFile(response, fileName);
            } else{
                fileName = './accessdenied.html';
                sendFile(response, fileName);
            }
        });
    }  
}).listen(8080);
console.log('Server running at http://127.0.0.1:8080/');

// Function to output html file.
function sendFile(response, fileName){
    fs.readFile(fileName, function (error, content) {
        response.writeHead(200, {
            'Content-Type': 'text/html'
        });
        response.end(content, 'utf-8');
    });
}