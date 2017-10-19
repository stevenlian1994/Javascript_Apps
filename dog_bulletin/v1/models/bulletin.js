//MONGOOSE/ MODEL CONFIG
var mongoose = require("mongoose");


var bulletinSchema = new mongoose.Schema({
    title: String,
    image: String,
    description: String,
    created: {type: Date, default: Date.now},
    comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
      ]
});


module.exports = mongoose.model("Bulletin", bulletinSchema);

