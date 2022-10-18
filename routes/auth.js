const router = require('express').Router();
const jwt = require('jsonwebtoken');
const AuthController = require('../controllers/AuthController');




// REGISTER
router.post('/register', AuthController.register);

// LOGIN
router.post('/login',AuthController.login);


router.post('/logout',AuthController.logout);

const tokenRefresh = (req, res, next) => {
  const postData = req.body;
  if (postData.refreshToken && postData.refreshToken in tokenList) {
    const decoded_user = jwt.verify(
      postData.refreshToken,
      process.env.SECRET_REFRESH_TOKEN
    );

    const token = generateAccessToken(decoded_user._id, decoded_user.email);
    const refreshToken = generateRefreshToken(
      decoded_user._id,
      decoded_user.email
    );
    req.content = {
      user: decoded.user,
      email: decoded.email,
      level: decoded.level,
    };
    req.token = token;
    req.refreshToken = refreshToken;
    tokenList[refreshToken] = auth;
  } else {
    return res.status(401).send(tokenList);
  }
  next();
};

// Reflesh Token
router.get('/refresh', AuthController.refresh);





module.exports = router;
