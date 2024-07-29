const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

main().then(() => {
  console.log("Connected to database!");
  initDB();
}).catch((err) => {
  console.log(err);
});

// Connect to MongoDB
async function main() {
  await mongoose.connect('mongodb://localhost:27017/Airbnb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

// Initialize database (delete existing data if any)
async function initDB() {
  try {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("Data initialized..!");
  } catch (error) {
    console.error("Error initializing data:", error);
  } finally {
    // Close the MongoDB connection after initializing data
    await mongoose.connection.close();
  }
}
