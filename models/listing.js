const mongoose = require("mongoose");
const  Review = require("./review.js")

// const mongoUrl = "mongodb://127.0.0.1:27017/Wanderlust";

// main().then((res) => {
//     console.log("Connection successful");
// })
// .catch((err) => {
//     console.log(err);
// });

// async function main() {
//     await mongoose.connect(mongoUrl);
// }

const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    }, 
    image: {
        url: String,
        filename: String,
        // type: String,
        // default: "https://plus.unsplash.com/premium_photo-1686090450346-f418fff5486e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        // set: (v) => v === "" ? "https://plus.unsplash.com/premium_photo-1686090450346-f418fff5486e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
    },
    price: {
        type: Number,
    },
    location: {
        type: String,
    },
    country: {
        type: String,
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review",
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
});

listingSchema.post("findOneAndDelete", async (listing)=> {
   if(listing) {
    await Review.deleteMany({_id : {$in: listing.reviews}});
   }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;