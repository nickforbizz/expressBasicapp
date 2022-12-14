const router = require('express').Router();

const parameterController = require('../controllers/parameterController.js');

// Middlewares
const routesMiddleware = require('../middleware/verifyTokenMiddleware')


router.get('/', 
        routesMiddleware, 
        parameterController.getParameters);

        
router.get('/all', 
        routesMiddleware, 
        parameterController.getAllParameters);

router.post('/', 
        routesMiddleware,
        parameterController.createParameter);

router.post('/update/:id', 
        routesMiddleware,
        parameterController.updateParameter);


router.post('/delete/:id', 
        routesMiddleware, 
        parameterController.deleteParameter);





module.exports = router;