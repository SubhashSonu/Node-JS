const mongoose = require("mongoose");

function connectMongoDb(url){
   // connection
  return mongoose.connect(url)
       .then(() => console.log("MongoDB Connected"))
       .catch((error) => console.log("Mongo Error", error));
}

module.exports = {
    connectMongoDb,
};