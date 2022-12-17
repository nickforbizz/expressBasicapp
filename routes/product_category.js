const router = require('express').Router();

const productCategoryController = require('../controllers/productCategoryController.js');

// Middlewares
const routesMiddleware = require('../middleware/verifyTokenMiddleware')


router.get('/', 
        routesMiddleware, 
        productCategoryController.getCategories);

router.get('/', 
        routesMiddleware, 
        productCategoryController.getAllCategories);
        
router.post('/', 
        routesMiddleware,
        productCategoryController.createCategory);


router.post('/delete/:id', 
        routesMiddleware, 
        productCategoryController.deleteCategory);





module.exports = router;