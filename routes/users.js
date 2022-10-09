const router = require('express').Router();
const userController = require('../controllers/UserController');
const routesMiddleware = require('./verifyTokenMiddleware');


module.exports = (app) => {

    router.get('/', routesMiddleware, userController.getUsers);
    app.use('/api/user', router);
}

