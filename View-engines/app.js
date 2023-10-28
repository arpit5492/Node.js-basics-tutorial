// express app
const express = require('express');
const app = express();

// register view engine
app.set("view engine", "ejs"); // By default express and ejs will look into the views folder
// But we can also set a different folder like below:
// app.set("views", "folder name");

app.get('/', function(req, res){
    // console.log(req.url, req.method);
    let blogs = [
        {
          title: "Getting Started with JavaScript",
          snippet: "Learn the basics of JavaScript programming language, including variables, data types, and control structures."
        },
        {
          title: "Mastering CSS Grid Layout",
          snippet: "Explore the power of CSS Grid layout for creating complex and responsive web page layouts."
        },
        {
          title: "Building a RESTful API with Node.js",
          snippet: "A step-by-step guide to creating a RESTful API using Node.js, Express, and MongoDB."
        },
        {
          title: "Introduction to React: Components and Props",
          snippet: "Get familiar with React by understanding components, props, and how to build reusable UI elements."
        },
        {
          title: "The Art of Debugging: Tips and Techniques",
          snippet: "Learn effective debugging strategies for identifying and fixing bugs in your code."
        }
    ];      
    res.render('index', {title: 'home', b: blogs});
});

app.get('/about', function(req, res){
    res.render('about', {title: 'About'});
});

app.get("/blogs/create", (req, res)=>{
    res.render('create', {title: 'Create a blog'});
});

// 404 error page
app.use(function(req, res){
    res.status(404).render('error', {title: '404 error'});
});

// listen for requests

app.listen(3000, (err)=>{ // By default it's set to "localhost"
    if(err) throw err;
    console.log("Listening for requests from the client side");
});