const mongoose = require("mongoose");
const MONGO_URI = process.env.ENV_MONGO_URI;

const connectToDB = () => {
  mongoose.connect(MONGO_URI).then(() => {
    console.log("Connected to MongoDB!");
  });
};

module.exports = connectToDB;
