var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");
    
//APP CONFIG
app.use(express.static("public"));
app.set("view engine", "ejs");
    

app.get("/", function(req, res){
    res.render("landing");
});







app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Dog Bulletin has started!");
});

