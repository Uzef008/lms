const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const userRoutes = require('./routes/userRoutes');
const chatbotRoutes = require('./routes/chatbotRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route (Placed BEFORE DB middleware to ensure it works even if DB is down)
app.get('/api/test', (req, res) => {
    res.json({ message: "API working 🚀" });
});

// MongoDB connection optimization
let isConnected = false;

const connectDB = async () => {
    if (isConnected) return;
    if (!process.env.MONGO_URI) {
        console.error("MONGO_URI is not defined in environment variables");
        throw new Error("MONGO_URI is not defined");
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        isConnected = true;
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
        throw error;
    }
};

// Connect to DB before handling other routes using middleware
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        res.status(500).json({ message: "Database connection failed", error: error.message });
    }
});

// API Routes
app.use('/api/auth', authRoutes);

// Wrapped for debug logging
app.use('/api/courses', (req, res, next) => {
    console.log("Courses route hit at " + new Date().toISOString());
    next();
}, courseRoutes);

app.use('/api/users', userRoutes);
app.use('/api/chatbot', chatbotRoutes);

// Mock Payment route
app.post('/api/pay', (req, res) => {
    res.json({ success: true, message: 'Payment successful', transactionId: 'TXN_' + Date.now() });
});

// Root /api route for health check
app.get('/api', (req, res) => {
    res.json({ message: "LMS API Serverless Function" });
});


// Export the app for Vercel (No app.listen() allowed)
module.exports = app;

