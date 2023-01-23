const router = require('express').Router();

const settingsController = require('../controllers/settingsController.js');

// Middlewares
const routesMiddleware = require('../middleware/verifyTokenMiddleware')


router.get('/stats', 
        routesMiddleware, 
        settingsController.getStats);




router.post('/delete/:id', 
        routesMiddleware, 
        settingsController.deleteItem);





module.exports = router;