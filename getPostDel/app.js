// express app
const express = require('express');
const app = express();
// 3rd party middleware app(morgan)
const morgan = require('morgan');
// mongoose module
const mongoose = require('mongoose');
// Importing the model from /models/blog file
const Blog = require('./models/blog');
// Getting the username and password of the database from another file
const pass = require('./.password');

// connect to mongoDB
const DBConn = 'mongodb+srv://'+pass.USER+':'+pass.PASSWORD+'@cluster0.bk8r1ze.mongodb.net/'+pass.DB_NAME+'?retryWrites=true&w=majority';
mongoose.connect(DBConn)
  .then((result) => {app.listen(3100)})
  .catch((err) => {console.log(err)});

  // view engines and middleware functions and static files
app.set("view engine", "ejs");
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({extended: true})); 

app.get('/', function(req, res){
    // console.log(req.url, req.method);
    res.redirect('/blogs');
});

// Outputting documents in views
app.get('/blogs', (req, res)=>{
  Blog.find().sort({ createdAt: -1}) // sorting in descending order
    .then((result)=>{
      res.render('index', {title: 'All Blogs', b: result});
    })
    .catch(err =>{
      console.log(err);
    });
});

// Adding a new blog and then redirecting to the home page
app.post('/blogs', (req, res)=>{
  // console.log(req.body);
  const blog = new Blog(req.body);
  blog.save()
    .then((result)=>{
      res.redirect('/blogs');
    })
    .catch(err=>{
      console.log(err);
    });
});

app.get("/blogs/create", (req, res)=>{
  res.render('create', {title: 'Create a blog'});
});

// Getting a single blog
app.get('/blogs/:id', (req, res)=>{
  const id = req.params.id;
  Blog.findById(id)
    .then((result)=>{
      res.render('blog-details', {title: 'Blog Details', blog: result});
    })
    .catch(err=>{
      console.log(err);
    });
});

// Deleting a blog from the database and showing the remaining blogs after deleting
app.delete("/blogs/:id", (req, res)=>{ // As this is an ajax request, so we can't use redirect method here
// That's why we will be sending a json to the frontend part, and then from the frontend we will redirect to the home page
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({redirect: '/blogs'});
    })
    .catch(err => console.log(err));
});

app.get('/about', function(req, res){
    res.render('about', {title: 'About'});
});

app.use(function(req, res){
    res.status(404).render('error', {title: '404 error'});
});


