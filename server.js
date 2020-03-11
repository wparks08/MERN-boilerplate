const express = require("express");
const path = require("path");
const morgan = require("morgan");

// Create app and define PORT
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware added here
// - Web form and JSON handling
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// - Logging
app.use(morgan("dev"));

// Static assets for production
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// API Routes here

// Route all other requests to frontend
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
    console.log(`API Server running on port ${PORT}`);
});
