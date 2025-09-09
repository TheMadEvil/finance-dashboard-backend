const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend files from "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/finance", require("./routes/finance"));

// Connect to MongoDB and start server
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB connected");
        app.listen(process.env.PORT, () =>
            console.log(`🚀 Server running on port ${process.env.PORT}`)
        );
    })
    .catch((err) => console.error("MongoDB connection error:", err));
