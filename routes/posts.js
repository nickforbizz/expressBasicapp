const router = require('express').Router();
const routesMiddleware = require('./verifyTokenMiddleware')



router.get('/', routesMiddleware, async (req, res) => {
    res.json({
        posts:{
            user: req.user,
            title: "1st post",
            description: "A post not to be accessed without auth token",
        }
    })
});



module.exports = router;