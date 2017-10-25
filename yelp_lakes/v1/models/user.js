var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = mongoose.Schema({
    username: String,
    password: String
});

//what does this do??
userSchema.plugin(passportLocalMongoose);

//and this?
module.exports = mongoose.model("Lake", userSchema);