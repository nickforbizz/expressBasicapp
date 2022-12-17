const router = require('express').Router();

const soldProductController = require('../controllers/soldProductController.js');

// Middlewares
const routesMiddleware = require('../middleware/verifyTokenMiddleware')


router.get('/', 
        routesMiddleware, 
        soldProductController.getProducts);


router.get('/', 
        routesMiddleware, 
        soldProductController.getAllProducts);

router.post('/', 
        routesMiddleware,
        soldProductController.createProduct);


router.post('/delete/:id', 
        routesMiddleware, 
        soldProductController.deleteProduct);





module.exports = router;