// Status Codes:
// 200 - OK
// 301 - Resource moved
// 404 - Not found
// 500 - Internal server error

// 100 range - informational responses
// 200 range - success codes
// 300 range - codes for redirects
// 400 range - user or client error codes
// 500 range - server error codes

const http = require('http');
const fs = require('fs');
const { ok } = require('assert');

const server = http.createServer((request, response)=>{ // For creating the server
    console.log(request.url, request.method);  // Gives the url of the client side and also the method(GET, POST, UPDATE)

    // Response object
    // Response header
    // response.setHeader("Content-Type", "text/html");
    // response.write("<head><link rel='stylesheet' href='#'></head>");
    // response.write("<h1>Hello World!!</h1>");
    // response.write("<h3>Hi I am Arpit</h3>");
    // response.end();

    // But this will be messy if we add more html tags like this, instead we can write the html codes in a
    // separate html file and then write the code inside the browser using file system modeule

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
        case '/about-me': // redirecting a url to the about page
            response.statusCode = 301;
            response.setHeader('Location', '/about');
            // response.end(); // Optional
        default:
            path += "/error.html";
            response.statusCode = 404;
            break;
    } // This process of using switch statements is good when the code is small, but as we go along, the code
      // becomes more complex, and here we can use framework called Express.js
    fs.readFile(path, (err, data)=>{
        if(err){
            console.log(err);
            response.end();
        }
        else{
            // response.write(data); 
            response.end(data); // If there is only one file to write on the web page, then we can use this method
        }
    });

});

server.listen(3785, "localhost", (err)=>{ // listening for the request from the client side
    if(err) console.log(err);
    console.log("Listening for requests from the client side");
});