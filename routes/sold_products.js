const router = require('express').Router();

const soldProductController = require('../controllers/soldProductController.js');

// Middlewares
const routesMiddleware = require('../middleware/verifyTokenMiddleware')


router.get('/', 
        routesMiddleware, 
        soldProductController.getSoldProducts);


router.get('/all', 
        routesMiddleware, 
        soldProductController.getAllSoldProducts);

router.post('/', 
        routesMiddleware,
        soldProductController.createSoldProduct);

router.post('/update/:id', 
        routesMiddleware,
        soldProductController.updateSoldProduct);


router.post('/delete/:id', 
        routesMiddleware, 
        soldProductController.deleteSoldProduct);





module.exports = router;