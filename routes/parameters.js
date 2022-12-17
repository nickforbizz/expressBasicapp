const router = require('express').Router();

const parameterController = require('../controllers/parameterController.js');

// Middlewares
const routesMiddleware = require('../middleware/verifyTokenMiddleware')


router.get('/', 
        routesMiddleware, 
        parameterController.getParameters);


router.post('/', 
        routesMiddleware,
        parameterController.createParameter);


router.post('/delete/:id', 
        routesMiddleware, 
        parameterController.deleteParameter);





module.exports = router;