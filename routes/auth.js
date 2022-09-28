const router = require('express').Router();
const User = require('./../models/User');
const {
  registerValidation,
  loginValidation,
} = require('./../helpers/validations');
const bcrypt = require('bcryptjs');

// REGISTER
router.post('/register', async (req, res) => {
  // validate req data
  let data = req.body;
  const { error } = registerValidation(data);

  if (error) return res.status(400).send(error.details[0].message);

  // check if user in db
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists)
    return res.status(400).send(`Email: ${req.body.email} already exists`);

  // Hash the Password
  const salt = await bcrypt.genSalt(15);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  // validate req data
  let data = req.body;
  const { error } = loginValidation(data);

  if (error) return res.status(400).send(error.details[0].message);

  // check if user in db
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).send(`Email: ${req.body.email} not found`);

    // check password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send("Invalid Password");

    res.send("Logged In");
});

module.exports = router;
