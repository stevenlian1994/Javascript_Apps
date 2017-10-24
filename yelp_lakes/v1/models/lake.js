var mongoose = require("mongoose");

var lakeSchema = new mongoose.Schema({
    name : String,
    image : String 
});



module.exports = mongoose.model("Lake", lakeSchema);




