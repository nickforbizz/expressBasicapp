const router = require('express').Router();

const productCategoryController = require('../controllers/productCategoryController.js');

// Middlewares
const routesMiddleware = require('../middleware/verifyTokenMiddleware')


router.get('/', 
        routesMiddleware, 
        productCategoryController.getCategories);

router.get('/all', 
        routesMiddleware, 
        productCategoryController.getAllCategories);
        
router.post('/', 
        routesMiddleware,
        productCategoryController.createCategory);

router.post('/update/:id', 
        routesMiddleware,
        productCategoryController.updateCategory);


router.post('/delete/:id', 
        routesMiddleware, 
        productCategoryController.deleteCategory);





module.exports = router;