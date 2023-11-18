// express app
const express = require('express');
const app = express();
// 3rd party middleware app(morgan)
const morgan = require('morgan');
// mongoose module
const mongoose = require('mongoose');

// Getting the username and password of the database from another file
const pass = require('./.password');
const blogRoutes = require('./router/blogRoutes');

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
    res.redirect('/blogs');
});

// All the routes
app.use(blogRoutes);

app.get('/about', function(req, res){
    res.render('about', {title: 'About'});
});

app.use(function(req, res){
    res.status(404).render('error', {title: '404 error'});
});


