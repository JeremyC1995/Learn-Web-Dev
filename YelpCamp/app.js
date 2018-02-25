const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      passport = require('passport'),
      LocalStrategy = require('passport-local');
      Campground = require("./models/campground"),
      Comment = require('./models/comment'),
      User = require('./models/user'),
      seedDB = require('./seeds');

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/public`))
seedDB();

// PASSPORT CONFIG
app.use(require('express-session')({
    secret: 'jeremycheng',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// check user is logged in or not
const isLoggedIn = (req, res, next)=>req.isAuthenticated() ? next() : res.redirect("/login");


app.get("/", (req, res)=>{
    res.render("landing");
});
// INDEX
app.get("/campgrounds", (req, res)=>{
    // get all campgrounds from DB
    Campground.find({}, (err, all)=>{
        if (err) {
           console.log(err);
       } else {
           res.render("campgrounds/index",{campgrounds: all});
       }
    })
});

// CREATE
app.post("/campgrounds", (req,res)=>{
    const name =req.body.name;
    const img =req.body.image;
    const desc =req.body.description;
    const newCampground = {name: name, image: img, description: desc};
    Campground.create(newCampground, (err)=>{
      if (err) {
          console.log(err);
      } else {
          res.redirect("/campgrounds");
      }
    });
});

// NEW
app.get("/campgrounds/new", (req,res)=>{
    res.render("campgrounds/new");
});

// SHOW
app.get("/campgrounds/:id", (req,res)=>{
    Campground.findById(req.params.id).populate('comments').exec((err, campground)=>{
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: campground});
        }
    });
});

// comment ===========================================
// NEW COMMENT FORM
app.get("/campgrounds/:id/comments/new", isLoggedIn, (req,res)=>{
    Campground.findById(req.params.id,(err, campground)=>{
        err ? console.log(err) : res.render("comments/new", {campground: campground});
    });
});

// CREATE NEW COMMENT
app.post("/campgrounds/:id/comments", isLoggedIn, (req,res)=>{
    Campground.findById(req.params.id,(err, campground)=>{
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else{
            Comment.create(req.body.comment, (err,comment)=>{
                if(err){
                    console.log(err);
                } else {
                    campground.comments.push(comment._id);
                    campground.save();
                    res.redirect(`/campgrounds/${req.params.id}`);
                }
            });
        }
    });
});

// AUTH ===================================
// REG FORM
app.get("/register", (req,res)=>{
    res.render('register');
});

// sign up logic
app.post("/register", (req,res)=>{
    const newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user)=>{
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate('local')(req, res, ()=>{
            res.redirect("/campgrounds");
        });
    });
})

// login form
app.get("/login", (req,res)=>{
    res.render("login");
});
// login logic
app.post("/login", passport.authenticate('local', 
    { 
        successRedirect: "campgrounds",
        failureRedirect: "/login"
    }), (req,res)=>{ 
});

// logout
app.get("/logout", (req,res)=>{
    req.logout();
    res.redirect("/campgrounds");
});
const port = 5000;
app.listen(port,()=>console.log(`Server is running on port ${port}`));