const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment   = require("./models/comment");

const data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Molestias iusto in incidunt. Unde voluptates quibusdam ipsa et reprehenderit nam ullam. Qui est explicabo quod nesciunt nemo ipsa inventore et. Deleniti corporis iure. Quia soluta et. Adipisci temporibus minus qui. Earum sunt architecto quae sint dolorum. Vel quis est. Veritatis repellat in nisi dolores sit doloribus."
    },
    {
        name: "Desert Mesa", 
        image: "https://farm4.staticflickr.com/3859/15123592300_6eecab209b.jpg",
        description: "Deleniti corporis iure. Quia soluta et. Adipisci temporibus minus qui. Earum sunt architecto quae sint dolorum. Vel quis est. Veritatis repellat in nisi dolores sit doloribus. Molestias iusto in incidunt. Unde voluptates quibusdam ipsa et reprehenderit nam ullam. Qui est explicabo quod nesciunt nemo ipsa inventore et."
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Non soluta pariatur repudiandae corrupti. Voluptatum id expedita non. Et et vitae vel at et. Quis vitae et temporibus suscipit aut rerum.blah blah blah Deleniti corporis iure. Quia soluta et. Adipisci temporibus minus qui. Earum sunt architecto quae sint dolorum. Vel quis est. Veritatis repellat in nisi dolores sit doloribus."
    }
]

function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, (err)=>{
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
         //add a few campgrounds
        data.forEach((seed)=>{
            Campground.create(seed, (err, campground)=>{
                if(err){
                    console.log(err)
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, (err, comment)=>{
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment._id);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    }); 
    //add a few comments
}

module.exports = seedDB;
