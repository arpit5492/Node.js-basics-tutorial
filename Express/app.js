const http = require('http');
const fs = require('fs');
const { ok } = require('assert');
const lo = require('lodash');
const express = require('express');
const app = express();

app.get('/', function(req, res){
    console.log(req.url, req.method);
    res.sendFile("./views/index.html", {root: __dirname}); // It automatically sends a status code
});

app.get('/about', function(req, res){
    console.log(req.url, req.method);
    res.sendFile("./views/about.html", {root: __dirname}); // It automatically sends a status code
});

// redirects
app.get('/about-me', function(req, res){
    console.log(req.url, req.method);
    res.redirect('/about'); // It automatically sends a status code
});

// 404 error page
app.use(function(req, res){ // use() doesn't automatically send a status code
    console.log(req.url, req.method);
    res.status(404).sendFile('./views/error.html', {root: __dirname});
});
// And error page is always written in the last, because JS will go from top to bottom
// checking all the url one by one

// listen for requests

app.listen(3000, (err)=>{ // By default it's set to "localhost"
    if(err) throw err;
    console.log("Listening for requests from the client side");
});


