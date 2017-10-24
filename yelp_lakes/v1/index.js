var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user"), //models sets up User class
    Lake = require("./models/lake");
 


    
//APP CONFIG
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/yelp_lakes", {useMongoClient: true});
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty cutest",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

// ============

 app.get("/", function(req, res){
    res.render("landing"); 
 });
 
 app.get("/lakes", function(req, res){
     Lake.find({}, function(err, allLakes){
         if(err) {
             console.log(err);
         } else 
             res.render("lakes", {lakes: allLakes}); 
     });
     
 });
 
 app.post("/lakes", function(req, res){
     var newLake = new Lake({name: req.body.name, image: req.body.image})
     Lake.create(newLake, function(err, lake){
         if(err){
             console.log(err);
             return res.render("landing");
         } else {
             res.render("lakes");
         }
     });
 });
    
app.get("/welcome_page", isLoggedIn, function(req, res){
    res.render("welcome_page");
});
    
    

// ============
// AUTH ROUTES
// ============
app.get("/register", function(req, res){
    res.render("register");
})

//handle sign up logic
app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register")
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/welcome_page");
        });
    });
});

//show login form
app.get("/login", function(req, res){
    res.render("login");
});

//handling login logic
app.post("/login", passport.authenticate("local",
    {
        successRedirect: "/welcome_page",
        failureRedirect: "/login"
    }), function(req, res){
    
});


app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}



app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpLakes has started!");
});

