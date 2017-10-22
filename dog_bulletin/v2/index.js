var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user") //models sets up User class
 


    
//APP CONFIG
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/dog_bulletin_v2", {useMongoClient: true});
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
    console.log("Dog Bulletin v2 has started!");
});

