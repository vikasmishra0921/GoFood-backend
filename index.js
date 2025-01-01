require("dotenv").config();
const express = require("express");
const app = express();
const mongoDB = require("./database");
const cors = require("cors");

const PORT = process.env.PORT || 5000; // Default to 5000 if not set

// List of allowed origins
const allowedOrigins = [
  "http://localhost:3000", // Development
  "https://go-food-flax.vercel.app" // Production
];

// Middleware to handle CORS
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

mongoDB(); // Initialize MongoDB connection

app.use(express.json()); // Middleware for parsing JSON requests

// Routes
app.use("/api", require("./Routes/CreateUsers"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));

// Test route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
