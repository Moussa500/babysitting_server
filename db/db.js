const mongoose = require("mongoose");
module.exports.connectToMongoDB = async () => {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.DATABASE_URL).then(() => {
        console.log("connect to DB");
    }).catch((error) => {
        console.log(error);
    })
}