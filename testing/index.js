var express = require("express"),
    app = express(),
    bodyParser = require("body-parser");
    
    
//APP CONFIG

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

 
    
//RESTFUL ROUTES
app.get("/", function(req, res){
    res.render("main");
});



app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Testing has started!");
});

