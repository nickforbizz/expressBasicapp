const router = require('express').Router();
const userController = require('../controllers/UserController');
const routesMiddleware = require('../middleware/verifyTokenMiddleware');



router.get('/', routesMiddleware, userController.getUsers);
router.post('/update', routesMiddleware, userController.updateUsers);
router.post('/create', routesMiddleware, userController.createUsers);
router.post('/delete/:id', routesMiddleware, userController.deleteUsers);



module.exports = router;
