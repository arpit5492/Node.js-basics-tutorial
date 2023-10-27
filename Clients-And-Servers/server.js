const http = require('http');

const server = http.createServer((request, response)=>{ // For creating the server
    console.log("Request made"); 
});

server.listen(3785, "localhost", (err)=>{ // listening for the request from the client side
    if(err) console.log(err);
    console.log("Listening for requests from the client side");
});