const router = require('express').Router();

const vehicleMakeController = require('../controllers/vehicleMakeController.js');

// Middlewares
const routesMiddleware = require('../middleware/verifyTokenMiddleware')


router.get('/', 
        routesMiddleware, 
        vehicleMakeController.getMakes);


router.get('/all', 
        routesMiddleware, 
        vehicleMakeController.getAllMakes);


router.post('/', 
        routesMiddleware,
        vehicleMakeController.createMake);


router.post('/delete/:id', 
        routesMiddleware, 
        vehicleMakeController.deleteMake);





module.exports = router;