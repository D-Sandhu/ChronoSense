// Import the MongoClient class from the 'mongodb' package
const { MongoClient } = require("mongodb");

// Load .env file contents into process.env.
require("dotenv").config();
// Grab MONGO_URI and DB_NAME from process.env
const { MONGO_URI, DB_NAME } = process.env;

// Set connection options to avoid deprecation warnings
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Create a new instance of MongoClient
const client = new MongoClient(MONGO_URI, options);

// Define an async arrow function to connect to the database
const connect = async () => {
  try {
    // Connect to the database
    await client.connect();
    console.log("Connected to MongoDB Atlas");
  } catch (err) {
    // If an error occurs, log the error message
    console.error("Failed to connect to MongoDB Atlas:", err);
  }
};

// Define an async arrow function to disconnect from the database
const disconnect = async () => {
  try {
    // Disconnect from the database
    await client.close();
    console.log("Disconnected from MongoDB Atlas");
  } catch (err) {
    // If an error occurs, log the error message
    console.error("Failed to disconnect from MongoDB Atlas:", err);
  }
};

// Export the connect function, disconnect function, and the client instance
module.exports = {
  DB_NAME,
  connect,
  disconnect,
  client,
};
