const mongoose = require('mongoose');

const connectDB = async () => {
  // Check if a connection already exists
  if (mongoose.connection.readyState === 0) {
    try {
      // Replace with your MongoDB URI (local or cloud-based)
      await mongoose.connect('mongodb://localhost:27017/myDatabase'); // Example: MongoDB URI
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('Database connection error:', err.message);
      process.exit(1); // Exit if the connection fails
    }
  } else {
    console.log('MongoDB is already connected');
  }
};

module.exports = connectDB;
