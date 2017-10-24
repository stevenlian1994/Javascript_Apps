var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");
    
//APP CONFIG
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/dog_bulletin_v2", {useMongoClient: true});
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));   
    
    
var UserSchema = mongoose.model({
    username: String,
    password: String
})
    
    
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.post("/", function(req, res){
    
})


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Practice User Database has started!");
});