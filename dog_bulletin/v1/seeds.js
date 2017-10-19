var mongoose = require("mongoose");
var Bulletin = require("./models/bulletin");
var Comment = require("./models/comment")

var data = [
        {   name: "Dog 1",
            image: "https://i.pinimg.com/736x/63/0f/0e/630f0ef3f6f3126ca11f19f4a9b85243--dachshund-puppies-weenie-dogs.jpg",
            description: "dog 1"
        },
        {   name: "Scotty",
            image: "https://www.runnersworld.com/sites/runnersworld.com/files/styles/listicle_slide_custom_user_phone_1x/public/beagle2.jpg?itok=lv5EvG-2",
            description: "next dog"
        },
        {   name: "Mr Fuji",
            image: "https://www.what-dog.net/Images/faces2/scroll004.jpg",
            description: "dog 3"
        }
    ]

function seedDB(){
    //Remove all bulletin posts
    Bulletin.remove({}, function(err){
        if (err){
            console.log(err);
        } else {
        console.log("removed Bulletin posts!");
        //add a few bulletin posts
        data.forEach(function(seed){
            Bulletin.create(seed, function(err, bulletin){
                if(err){
                    console.log(err);
                } else {
                    console.log("added a Bulletin");
                    //add a few comments
                    Comment.create(
                        {
                            text: "This dog is great, but cats are better",
                            author: "Homer"
                    }, function(err,comment){
                        if(err) {
                            console.log(err);
                        } else {
                        bulletin.comments.push(comment)
                        bulletin.save();
                        console.log("Created a new comment");
                        }
                    });
                    }
            });
        });
        }
    });

   
}

module.exports = seedDB;