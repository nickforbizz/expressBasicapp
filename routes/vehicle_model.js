const router = require('express').Router();

const vehicleModelController = require('../controllers/vehicleModelController.js');

// Middlewares
const routesMiddleware = require('../middleware/verifyTokenMiddleware')


router.get('/', 
        routesMiddleware, 
        vehicleModelController.getModels);

router.get('/all', 
        routesMiddleware, 
        vehicleModelController.getAllModels);
        
router.post('/', 
        routesMiddleware,
        vehicleModelController.createModel);

router.post('/update/:id', 
        routesMiddleware,
        vehicleModelController.updateModel);


router.post('/delete/:id', 
        routesMiddleware, 
        vehicleModelController.deleteModel);





module.exports = router;