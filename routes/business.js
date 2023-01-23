const router = require('express').Router();

const businessController = require('../controllers/businessController.js');

// Middlewares
const routesMiddleware = require('../middleware/verifyTokenMiddleware')


router.get('/', 
        routesMiddleware, 
        businessController.getBusinesses);

router.get('/all', 
        routesMiddleware, 
        businessController.getAllBusinesses);
        
router.post('/', 
        routesMiddleware,
        businessController.createBusiness);

router.post('/update/:id', 
        routesMiddleware,
        businessController.updateBusiness);


router.post('/delete/:id', 
        routesMiddleware, 
        businessController.deleteBusiness);





module.exports = router;