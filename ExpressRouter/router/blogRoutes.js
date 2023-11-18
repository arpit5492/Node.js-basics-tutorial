const express = require('express');
const routes = express();

const blogController = require('../controller/blogController');


// Outputting documents in views
routes.get('/', blogController.blogIndex);
  
  // Adding a new blog and then redirecting to the home page
  routes.post('/', blogController.blogAdd);
  
  routes.get("/create", blogController.blogCreate);
  
  // Getting a single blog
  routes.get('/:id', blogController.blogDetails);
  
  // Deleting a blog from the database and showing the remaining blogs after deleting
  routes.delete("/:id", blogController.blogDel); // As this is an ajax request, so we can't use redirect method here
  // That's why we will be sending a json to the frontend part, and then from the frontend we will redirect to the home page


  module.exports = routes;