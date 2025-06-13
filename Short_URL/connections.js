const mongoose = require("mongoose");

async function connectToMongoDB(url) {
    return mongoose.connect(url)
        .then(() => console.log("MongoDB Connected"))
        .catch((error) => console.log("Mongo Error", error));
}

module.exports = {
    connectToMongoDB,
}