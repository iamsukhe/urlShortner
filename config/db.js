const mongoose = require("mongoose");

const URI =
  "mongodb+srv://singh:singh12345@cluster0.e1gjl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(URI, { useNewUrlParser: true });
    console.log("DB connnected");
  } catch (error) {
    console.log(error);
    process.exit(-1);
  }
};

module.exports = connectDB;
