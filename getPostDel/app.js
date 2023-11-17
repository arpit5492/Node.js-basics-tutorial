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
  .then((result) => {app.listen(3000)})
  .catch((err) => {console.log(err)});

  // view engines and middleware functions and static files
app.set("view engine", "ejs");
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({extended: true})); 

app.get('/', function(req, res){
    // console.log(req.url, req.method);
    res.redirect('/All-blogs');
});

// Outputting documents in views
app.get('/All-blogs', (req, res)=>{
  Blog.find().sort({ createdAt: -1}) // sorting in descending order
    .then((result)=>{
      res.render('index', {title: 'All Blogs', b: result});
    })
    .catch(err =>{
      console.log(err);
    });
});

app.post('/All-blogs', (req, res)=>{
  // console.log(req.body);
  const blog = new Blog(req.body);
  blog.save()
    .then((result)=>{
      res.redirect('All-blogs');
    })
    .catch(err=>{
      console.log(err);
    });
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


