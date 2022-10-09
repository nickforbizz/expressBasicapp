const express  = require('express');
const app = express();
const dotenv = require('dotenv')
const mongoose = require('mongoose');
var cors = require('cors');
const cookieParser = require('cookie-parser')
const corsOptions = require('./helpers/corsOptions')
dotenv.config();

app.use(cors(corsOptions))

// Import Routes
const authRoutes = require('./routes/auth')
const postsRoutes = require('./routes/posts')
require("./routes/users")(app)


// Connect to DB
mongoose.connect(process.env.DB_CONNECT, () => console.log('connected to db'))


// Middleware
app.use(express.json())
app.use(cookieParser())


// Route Middleware
app.use('/api/user', authRoutes);
app.use('/api/posts', postsRoutes);

app.listen(5000, () => console.log("server running"))