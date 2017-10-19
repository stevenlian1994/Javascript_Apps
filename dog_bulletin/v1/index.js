var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose = require("mongoose"),
    Bulletin = require("./models/bulletin"),
    Comment = require("./models/comment"),
    seedDB = require("./seeds")
    
seedDB();
    
//APP CONFIG
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/dog_bulletin", {useMongoClient: true});
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
 
    
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
            res.render("bulletin/index", {bulletins: foundBulletin});
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
    res.render("bulletin/new");
});

//SHOW ROUTE
app.get("/bulletin/:id", function(req, res){
    Bulletin.findById(req.params.id, function(err, bulletinfound){
        if(err){
            console.log(err);
        } else {
            res.render("bulletin/show", {bulletin: bulletinfound});
        }
    });
});


//EDIT ROUTE
app.get("/bulletin/:id/edit", function(req, res){
    Bulletin.findById(req.params.id, function(err, foundBulletin){
        if(err){
            res.redirect("/bulletin");
        } else {
            res.render("bulletin/edit", {bulletin: foundBulletin});
        }
    });
});

//UPDATE ROUTE
app.put("/bulletin/:id", function(req, res){
    Bulletin.findByIdAndUpdate(req.params.id, req.body.bulletin, function(err, updatedBulletin){
        if(err){
            res.redirect("/bulletin");
        } else {
            res.redirect("/bulletin/" + req.params.id);
        }
    });
});

//DELETE ROUTE
app.delete("/bulletin/:id", function(req, res){
    //destroy bulletin
    Bulletin.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/bulletin");
        } else {
            res.redirect("/bulletin");
        }
    });
});



// =========================
// COMMENTS ROUTES
// =========================

app.get("/bulletin/:id/comments/new", function(req, res){
    Bulletin.findById(req.params.id, function(err, bulletin){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {bulletin: bulletin});
        }
    })
});

app.post("/bulletin/:id/comments", function(req, res){
   //lookup bulletin using ID
   Bulletin.findById(req.params.id, function(err, bulletin){
       if(err){
           console.log(err);
           res.redirect("/index");
       } else {
           Comment.create(req.body.comment, function(err, comment){
               if(err){
                   console.log(err);
               } else {
                   bulletin.comments.push(comment);
                   bulletin.save();
                   res.redirect("/bulletin/" + bulletin._id);
               }
           });
           
       }
   })
   //create new comment
   //connect new comment to campground
   //redirect campground show page
});

//need to have campground id in new/create routes => need to use nested routes
//campgrounds/:id/comments/new GET
//campgrounds/:id/comments POST 







app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Dog Bulletin has started!");
});

