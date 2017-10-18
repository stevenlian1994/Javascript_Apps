//MONGOOSE/ MODEL CONFIG
var mongoose = require("mongoose");


var bulletinSchema = new mongoose.Schema({
    title: String,
    image: String,
    description: String,
    created: {type: Date, default: Date.now}
});


module.exports = mongoose.model("Bulletin", bulletinSchema);