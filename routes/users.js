const router = require('express').Router();
const fileUpload = require('express-fileupload');
const userController = require('../controllers/UserController');
const fileSizeLimiter = require('../middleware/fileSizeLimiter');
const fileExtLimiter = require('../middleware/fileExtLimiter');
const routesMiddleware = require('../middleware/verifyTokenMiddleware');



router.get('/', routesMiddleware, userController.getUsers);
router.get('/all', routesMiddleware, userController.getAllUsers);
router.post('/update/:id', fileUpload({
    createParentPath: true
  }),
  fileSizeLimiter,
  fileExtLimiter(['.png', '.jpg', '.jpeg']),
  routesMiddleware, userController.updateUsers);
router.post('/delete/:id', routesMiddleware, userController.deleteUsers);



module.exports = router;
