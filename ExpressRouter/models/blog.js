const mongoose = require('mongoose');
const schema = mongoose.Schema;

const blogSchema = new schema({ // Schema defines the stricture of our database and through model we can communicate with the database
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {timestamps: true}); // timestamps property automatically assigns values to the above properties
// whenever we will be deleting or updating a blog

// Creating a model
const Blog = mongoose.model('blog' /* --> collection name */, blogSchema); // Model variable name always starts with capital letter
module.exports = Blog;