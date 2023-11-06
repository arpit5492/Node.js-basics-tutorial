const http = require('http');
const fs = require('fs');
const { ok } = require('assert');
const lo = require('lodash');

// if node-module is deleted, then we can install all the dependencies using "npm install" command
// and it will istall all the dependencies mentioned in "package.json" file.

const server = http.createServer((request, response)=>{
    // lodash
    const rand = lo.random(0,20);
    console.log(rand);

    const greet = lo.once(()=>{
        console.log("Hello World!!");
    });

    greet();
    greet();
    greet();

    let path = "./views";
    switch(request.url){
        case '/':
            path += "/index.html";
            response.statusCode = 200;
            break;
        case '/about':
            path += "/about.html";
            response.statusCode = 200;
            break;
        case '/about-me':
            response.statusCode = 301;
            response.setHeader('Location', '/about');
            response.end();
        default:
            path += "/error.html";
            response.statusCode = 404;
            break;
    }
    fs.readFile(path, (err, data)=>{
        if(err){
            console.log(err);
            response.end();
        }
        else{
            response.end(data);
        }
    });

});

server.listen(3000, "localhost", (err)=>{
    if(err) console.log(err);
    console.log("Listening for requests from the client side");
});