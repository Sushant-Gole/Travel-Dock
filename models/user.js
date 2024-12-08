const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

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

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);