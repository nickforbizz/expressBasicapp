const router = require('express').Router();
const fileUpload = require('express-fileupload');

const postController = require('../controllers/PostController.js');

// Middlewares
const fileExtLimiter = require('../middleware/fileExtLimiter.js');
const fileSizeLimiter = require('../middleware/fileSizeLimiter.js');
const routesMiddleware = require('../middleware/verifyTokenMiddleware')


router.get('/', 
        routesMiddleware, 
        postController.getPosts);


router.get('/all', 
        routesMiddleware, 
        postController.getAllPosts);


router.post('/', 
        routesMiddleware, 
        fileUpload({
            createParentPath: true
        }),
        fileSizeLimiter,
        fileExtLimiter(['.png', '.jpg', '.jpeg']),
        postController.createPost);


router.post('/delete/:id', 
        routesMiddleware, 
        postController.deletePost);





module.exports = router;