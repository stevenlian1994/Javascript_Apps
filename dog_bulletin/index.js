var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Bulletin = require("./models/bulletin")
    
//APP CONFIG
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/dog_bulletin", {useMongoClient: true});
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
// app.use(methodOverride("_method"));
 
    
//RESTFUL ROUTES
app.get("/", function(req, res){
    res.render("landing");
});


//INDEX ROUTE
app.get("/bulletin", function(req, res){
    Bulletin.find({}, function(err,foundBulletin){
        if(err){
            console.log(err);
        } else {
            res.render("index", {bulletins: foundBulletin});
        }
    });
});

//CREATE ROUTE
app.post("/bulletin", function(req, res){
    Bulletin.create(req.body.bulletin, function(err, newBulletin){
        if(err){
            console.log(err);
        } else {
            res.redirect("/bulletin");
        }
    });
})


//NEW ROUTE
app.get("/bulletin/new", function(req, res){
    res.render("new");
});

//SHOW ROUTE
app.get("/bulletin/:id", function(req, res){
    Bulletin.findById(req.params.id, function(err, bulletinfound){
        if(err){
            console.log(err);
        } else {
            res.render("show", {bulletin: bulletinfound});
        }
    });
});



app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Dog Bulletin has started!");
});

