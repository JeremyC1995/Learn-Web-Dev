const express = require("express"),
expressSanitizer = require("express-sanitizer"),
methodOverride= require('method-override'),
mongoose      = require("mongoose"),
bodyParser    = require("body-parser"),
app           = express();


// app config
mongoose.connect("mongodb://localhost/blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

// mongoose/model config
const blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
})
const Blog = mongoose.model("Blog", blogSchema);


// HOME
app.get("/", (req,res)=>{
  res.redirect("/blogs");
})
// index
app.get("/blogs", (req,res)=>{
  Blog.find({},(error, blogs)=>{
    error? console.log("ERROR!") : res.render("index", {blogs: blogs});
  })
});
// new
app.get("/blogs/new", (req,res)=>{
  res.render('new');
});
// CREATE
app.post("/blogs", (req,res)=>{
  req.body.blog.body = req.sanitize(req.body.blog.body);
  Blog.create(req.body.blog, (err, newBlog)=>{
    err ? res.render("new") : res.redirect("/blogs");
  });
});
// show
app.get("/blogs/:id", (req,res)=>{
  Blog.findById(req.params.id, (err, foundBlog)=>{
    err ? res.redirect("/blogs") : res.render("show", {blog: foundBlog})
  });
});
// EDIT
app.get("/blogs/:id/edit", (req,res)=>{
  Blog.findById(req.params.id, (err, foundBlog)=>{
    err ? res.redirect("/blogs") : res.render("edit", {blog: foundBlog})
  });
});
// UPDATE
app.put("/blogs/:id", (req,res)=>{
  req.body.blog.body = req.sanitize(req.body.blog.body);  
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog)=>{
    err ? res.redirect("/blogs") : res.redirect("/blogs/" + req.params.id);
  });
});
// DELETE
app.delete("/blogs/:id", (req,res)=>{
  Blog.findByIdAndRemove(req.params.id, (err, updatedBlog)=>{
    err ? res.redirect("/blogs") : res.redirect("/blogs");
  });
});


const port = 5000;
app.listen(port,()=>console.log(`Server is running on port ${port}`));