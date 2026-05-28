require('dotenv').config(); // Loads your .env variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import the routes we created earlier
const authRoutes = require('./routes/authRoutes');

const app = express();

// --- Middleware ---
app.use(express.json()); // Allows your server to understand incoming JSON data
app.use(cors());         // Allows your Vite frontend (port 5173) to talk to this backend (port 5000)

// --- Routes ---
// We mount this at the root '/' so it perfectly matches the axios calls we wrote in the React components
app.use('/', authRoutes);

// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB!');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});