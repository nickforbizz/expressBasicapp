const express  = require('express');
const app = express();
const dotenv = require('dotenv')
const mongoose = require('mongoose');
var cors = require('cors');
const cookieParser = require('cookie-parser')
const corsOptions = require('./helpers/corsOptions')
dotenv.config();

// Connect to DB
const connectDatabase = async () => {
    try {
    
    await mongoose.connect(
        process.env.DB_CONNECT, 
        { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
        () => console.log('connected to database successfully')
        );

        console.log("users");
        let users = await User.find();
//   res.send(users);

    console.log(users);
    console.log("users...");   
    } catch (error) {
    console.log(error);
    process.exit(1);
    }
};

// connectDatabase(); 
mongoose.connect(
    process.env.DB_CONNECT, 
    { useNewUrlParser: true, 
        useUnifiedTopology: true 
    },
    () => console.log('connected to db')
);



app.use(cors(corsOptions))



// Import Routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/users')
const postsRoutes = require('./routes/posts');
const User = require('./models/User');




// Middleware
app.use(express.json()) 
app.use(cookieParser())


// Route Middleware
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/posts', postsRoutes);

app.listen(5000, () => console.log("server running"))