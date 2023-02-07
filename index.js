const express  = require('express');
const app = express();
const dotenv = require('dotenv')
var cors = require('cors');
var bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const corsOptions = require('./helpers/corsOptions')
dotenv.config();

// Import Routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/users')
const postsRoutes = require('./routes/posts');
const makesRoutes = require('./routes/vehicle_make');
const modelsRoutes = require('./routes/vehicle_model');
const productCategoryRoutes = require('./routes/product_category');
const productsRoutes = require('./routes/products');
const salesRoutes = require('./routes/sales');
const businessRoutes = require('./routes/business');
const settingsRoutes = require('./routes/settings');







// Connect to DB
const db = require("./models");
db.sequelize.sync() // creates new tables added
// db.sequelize.sync({ force: false }) // nothing happens to your db
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
app.use(bodyParser.json())







// Route Middleware
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/makes', makesRoutes);
app.use('/api/models', modelsRoutes);
app.use('/api/product_category', productCategoryRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/business', businessRoutes);

app.listen(5000, () => console.log("server running"))