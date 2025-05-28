const mongoose = require("mongoose");
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
async function main() {
    try{
        mongoose.set("strictQuery", true);
        await mongoose.connect(
            "mongodb+srv://" + DB_USER + ":" + DB_PASS + "@cluster0.untwh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
        );
        console.log("Mongo Atlas is Connected");
    }catch(error){
        console.log("Mongo Atlas is not Connected: " + error);
    }
}
module.exports = main;