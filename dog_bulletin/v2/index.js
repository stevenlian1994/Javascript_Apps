var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose")
 
    

    
//APP CONFIG
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/dog_bulletin_v2", {useMongoClient: true});
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

 app.get("/", function(req, res){
    res.render("landing"); 
 });
    


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Dog Bulletin v2 has started!");
});

