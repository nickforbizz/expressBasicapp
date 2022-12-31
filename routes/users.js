const router = require('express').Router();
const userController = require('../controllers/UserController');
const routesMiddleware = require('../middleware/verifyTokenMiddleware');



router.get('/', routesMiddleware, userController.getUsers);
router.get('/all', routesMiddleware, userController.getAllUsers);
router.post('/update', routesMiddleware, userController.updateUsers);
router.post('/delete/:id', routesMiddleware, userController.deleteUsers);



module.exports = router;
