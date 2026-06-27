const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to Project 3 - Database Integration!");
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});