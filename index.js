const express  = require('express');
const app = express();
const dotenv = require('dotenv')
const mongoose = require('mongoose');

// Import Routes
const authRoutes = require('./routes/auth')
const postsRoutes = require('./routes/posts')

dotenv.config();

// Connect to DB
mongoose.connect(process.env.DB_CONNECT, () => console.log('connected to db'))


// Middleware
app.use(express.json())

// Route Middleware
app.use('/api/user', authRoutes);
app.use('/api/posts', postsRoutes);

app.listen(5000, () => console.log("server running"))