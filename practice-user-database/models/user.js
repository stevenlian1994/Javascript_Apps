var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = mongoose.model({
    username: String,
    password: String
})

UserSchema.plugin(passportLocalMongoose);

module.exports = ("User", UserSchema);

