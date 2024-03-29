const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('../services/logger');
const {
  loginValidation,
  registerValidation,
} = require('../helpers/validations');
const Models = require('../models');
const { getPagination, getPagingData } = require('../helpers/Pagination');
const User = Models.User; 

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const login = async (req, res) => {
  // validate req data
  let data = req.body;
  const { error } = loginValidation(data);

  if (error) return res.status(400).send(error.details[0].message);

  // check if user in db
  const user = await User.findOne({ email: data.email });
  if (!user) return res.status(400).send(`Email: ${data.email} not found`);

  // check password
  const validPass = await bcrypt.compare(data.password, user.password);
  if (!validPass) return res.status(400).send('Invalid Password');

  //   Create and Assign Token
  const token = generateAccessToken(user._id, user.email);
  const refreshToken = generateRefreshToken(user._id, user.email);
  req.token = token;
  req.refreshToken = refreshToken;

  // Create secure cookie with refresh token
  res.cookie('jwt', refreshToken, {
    httpOnly: true, //accessible only by web server
    secure: true, //https
    sameSite: 'None', //cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
  });

  let auth = {
    user,
    token,
    refreshToken,
  };
  res.header('auth_token', token).send(auth);
};

const logout = async (req, res) => {
    const cookies = req.cookies;

    if(!cookies?.jwt) return res.sendStatus(204);
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.json({ code: 1, msg: "Cookie Cleared" });
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const register = async (req, res) => {
  const file = req.files;
  const { page, size } = req.query;
  const projectRootPath = path.resolve('./');

  
  // validate req data
  let data = req.body;
  // console.log(file);
  
  const { error } = registerValidation(data); 
  if (error)
    return res.status(400).json({
      status: 'error',
      message: error.details[0].message,
    });

  // check if user in db
  const emailExists = await User.findOne({ where: { email: req.body.email }});
  if (emailExists)
    return res.status(400).send(`Email: ${req.body.email} already exists`);

  if(!req.body.password) req.body.password= 'user12345'
  // Hash the Password
  const salt = await bcrypt.genSalt(15);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  // Store Image
  let image = '';
  let image_url = '';
  if(file){
    const avator = file['avator'];
    let ext = '.' + avator.mimetype.split('/')[1];
    let md5 = avator.md5;
    let filename = md5 + ext;

    // store the file
    const filepath = path.join(projectRootPath, 'uploads/user', filename);
    avator.mv(filepath, err=>{
        if(err) return res.status(500).json({
            status: "error",
            message: err
        })
    });
  
    data = {
      image: filename.trim(),
      image_url: filepath.trim(),
      ...data,
    };
  }



  const user = new User({
    name: data.name,
    email: data.email,
    password: hashPassword,
    image: data.image,
    active: data.active,
    imageUrl: data.image_url
  });

  try {
    const savedUser = await user.save();
    let status = savedUser ? 'Success' : 'Error';
    
    return res.send({
      status: status,
      data: savedUser,
      message: status + ' saving record',
    });
  } catch (error) {
    logger.error(error);
    res.status(400).send(error);
  }
};

const refresh = async (req, res) => {
  const cookies = req.cookies;
 
  if(!cookies?.jwt) return res.status(401).json({msg: 'Unauthorised Request. NoC'});

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.SECRET_REFRESH_TOKEN,
    async (err, decoded) => {
        if(err){ 
            logger.error(err)
            return res.status(403).json({msg: 'Forbidden Request.'})
        }

        const user = await User.findOne({email:decoded.email});
        if(!user) return res.status(401).json({msg: 'Unauthorised Request.'});
        const token = generateAccessToken(user.id, user.email);
        let auth = { user, token };
        res.header('auth_token', token).send(auth);
    }
  );
 
};

function generateAccessToken(id, email, level = 0) {
  return jwt.sign(
    { user_id: id, email: email }, 
    process.env.SECRET_TOKEN, 
    {
        expiresIn: process.env.SECRET_TOKEN_expiresIn,
    }
  );
}

function generateRefreshToken(id, email, level = 0) {
  return jwt.sign(
    { user_id: id, email: email },
    process.env.SECRET_REFRESH_TOKEN,
    {
      expiresIn: process.env.SECRET_REFRESH_TOKEN_expiresIn,
    }
  );
}

module.exports = {
  login,
  register,
  refresh,
  logout,
};
