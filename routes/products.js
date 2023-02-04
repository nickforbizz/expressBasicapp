const router = require('express').Router();

const fileUpload = require('express-fileupload');
const productController = require('../controllers/productController.js');

// Middlewares
const fileExtLimiter = require('../middleware/fileExtLimiter.js');
const fileSizeLimiter = require('../middleware/fileSizeLimiter.js');
const routesMiddleware = require('../middleware/verifyTokenMiddleware');

router.get('/', routesMiddleware, productController.getProducts);

router.get('/all', routesMiddleware, productController.getAllProducts);

router.get('/stock', routesMiddleware, productController.getStockedProducts);

router.post(
  '/',
  routesMiddleware,
  fileUpload({
    createParentPath: true,
  }),
  fileSizeLimiter,
  fileExtLimiter(['.png', '.jpg', '.jpeg']),
  routesMiddleware,
  productController.createProduct
);

router.post(
  '/update/:id',
  routesMiddleware,
  fileUpload({
    createParentPath: true,
  }),
  fileSizeLimiter,
  fileExtLimiter(['.png', '.jpg', '.jpeg']),
  routesMiddleware,
  productController.updateProduct
);

router.post('/delete/:id', routesMiddleware, productController.deleteProduct);

module.exports = router;
