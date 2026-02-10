const mongoose = require("mongoose")


const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in .env");
}

 async function connectDB() {

  try {
    await mongoose.connect(MONGODB_URI,{
       serverSelectionTimeoutMS: 30000,
    });
    console.log("MongoDB connected via Mongoose");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
   
  }
}

module.exports = {
    connectDB
}