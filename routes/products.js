const router = require('express').Router();

const productController = require('../controllers/productController.js');

// Middlewares
const routesMiddleware = require('../middleware/verifyTokenMiddleware')


router.get('/', 
        routesMiddleware, 
        productController.getProducts);

router.get('/all', 
        routesMiddleware, 
        productController.getAllProducts);

router.post('/', 
        routesMiddleware,
        productController.createProduct);


router.post('/update/:id', 
        routesMiddleware,
        productController.updateProduct);


router.post('/delete/:id', 
        routesMiddleware, 
        productController.deleteProduct);





module.exports = router;