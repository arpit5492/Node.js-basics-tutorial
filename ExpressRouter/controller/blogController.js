const Blog = require('../models/blog');

const blogIndex = (req, res) => {
    Blog.find().sort({ createdAt: -1}) // sorting in descending order
      .then((result)=>{
        res.render('blogs/index', {title: 'All Blogs', b: result});
      })
      .catch(err =>{
        console.log(err);
    });
};

const blogAdd = (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
      .then((result)=>{
        res.redirect('/blogs');
      })
      .catch(err=>{
        console.log(err);
    });
};

const blogDetails = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
      .then((result)=>{
        res.render('blogs/blog-details', {title: 'Blog Details', blog: result});
      })
      .catch(err=>{
        res.status(400).render("error", {title: 'Blog not found'});
    });
};

const blogDel = (req, res) => {
    const id = req.params.id;
  
    Blog.findByIdAndDelete(id)
      .then((result) => {
        res.json({redirect: '/blogs'});
      })
      .catch(err => console.log(err));
};

const blogCreate = (req, res) => {
    res.render('blogs/create', {title: 'Create a blog'});
};

module.exports = {
    blogIndex,
    blogAdd,
    blogDetails,
    blogDel,
    blogCreate
};