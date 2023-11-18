const Blog = require('../models/blog');

const express = require('express');
const routes = express();


// Outputting documents in views
routes.get('/blogs', (req, res)=>{
    Blog.find().sort({ createdAt: -1}) // sorting in descending order
      .then((result)=>{
        res.render('index', {title: 'All Blogs', b: result});
      })
      .catch(err =>{
        console.log(err);
      });
  });
  
  // Adding a new blog and then redirecting to the home page
  routes.post('/blogs', (req, res)=>{
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
  
  routes.get("/blogs/create", (req, res)=>{
    res.render('create', {title: 'Create a blog'});
  });
  
  // Getting a single blog
  routes.get('/blogs/:id', (req, res)=>{
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
  routes.delete("/blogs/:id", (req, res)=>{ // As this is an ajax request, so we can't use redirect method here
  // That's why we will be sending a json to the frontend part, and then from the frontend we will redirect to the home page
    const id = req.params.id;
  
    Blog.findByIdAndDelete(id)
      .then((result) => {
        res.json({redirect: '/blogs'});
      })
      .catch(err => console.log(err));
  });

  module.exports = routes;