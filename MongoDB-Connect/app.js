// express app
const express = require('express');
const app = express();
// 3rd party middleware app(morgan)
const morgan = require('morgan');
// mongoose module
const mongoose = require('mongoose');
// Importing the model from /models/blog file
const Blog = require('./models/blog');

// connect to mongoDB
const DBConn = 'mongodb+srv://arpitmallick99:arpit5492@cluster0.bk8r1ze.mongodb.net/BlogDB?retryWrites=true&w=majority';
mongoose.connect(DBConn)
  .then((result) => {app.listen(3000)})
  .catch((err) => {console.log(err)});

app.set("view engine", "ejs");
app.use(morgan('dev'));
app.use(express.static('public')); 

// mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) =>{
  const blog = new Blog({
    title: 'Blog 2',
    snippet: 'I have a pet dog named Kimi',
    body: 'Welcome to my second blog'
  });
  blog.save()
    .then((result) =>{
      res.send(result);
    })
    .catch((err) =>{
      console.log(err);
    })
})

app.get('/all-blogs', (req, res)=>{
  Blog.find()
    .then((result) =>{
      res.send(result);
    })
    .catch(err =>{
      throw(err);
    });
});

app.get('/single-blog', (req, res)=>{
  Blog.findById('655565569130761650a6e58c')
    .then((result) => {
      res.send(result);
    })
    .catch(err=>{
      console.log(err);
    });
});

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

app.use(function(req, res){
    res.status(404).render('error', {title: '404 error'});
});


