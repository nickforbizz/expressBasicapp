const express  = require('express');
const app = express();
const dotenv = require('dotenv')
const mongoose = require('mongoose');

// Import Routes
const authRoutes = require('./routes/auth')

dotenv.config();

// Connect to DB
mongoose.connect(process.env.DB_CONNECT, () => console.log('connected to db'))


// Middleware
app.use(express.json())

// Route Middleware
app.use('/api/user', authRoutes);

app.listen(5000, () => console.log("server running"))