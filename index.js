const express  = require('express');
const app = express();
const dotenv = require('dotenv')
const mongoose = require('mongoose');
var cors = require('cors');
const cookieParser = require('cookie-parser')
const corsOptions = require('./helpers/corsOptions')
dotenv.config();

// Import Routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/users')
const postsRoutes = require('./routes/posts');
const User = require('./models/User');






// Connect to DB
const db = require("./models");
db.sequelize.sync({ force: true })
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });





app.use(cors(corsOptions))

// Middleware
app.use(express.json()) 
app.use(cookieParser())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));








// Route Middleware
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/posts', postsRoutes);

app.listen(5000, () => console.log("server running"))