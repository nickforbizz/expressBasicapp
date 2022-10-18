const bcrypt = require('bcryptjs');
const User = require('../models/User');

const getUsers = async (req, res) => {
  let users = await User.find();
  res.send(users);
};

const updateUsers = async (req, res) => {
  let data = req.body;
  let user_id = data?._id;
  if (!user_id) return res.status(400).send(`User with could not found`);

  // check if user in db
  const user = await User.findOne({ _id: user_id });
  if (!user) return res.status(400).send(`User with Id: ${user_id} not found`);

  let patched_user = await User.findByIdAndUpdate(user._id, data, {
    new: true,
  });

  res.send(patched_user);
};

const createUsers = async (req, res) => {
  let data = req.body;
  let user_email = data?.email;

  // check if user in db
  const user = await User.findOne({ email: user_email });
  if (user)
    return res.status(400).send(`User with Email: ${user_email} already exist`);

  // Hash the Password
  const salt = await bcrypt.genSalt(15);
  const hashPassword = await bcrypt.hash('12345', salt);
  let new_user = await new User({
    name: data.name,
    email: data.email,
    password: hashPassword,
  });

  try {
    const savedUser = await new_user.save();
    res.send(savedUser);
  } catch (error) {
    logger.error(error);
    res.status(400).send(error);
  }
};


const deleteUsers = async (req, res) => {
    let data = req.body;
    let id = req.params.id;

    // Delete the document by its _id
    let del_record = await User.deleteOne({ _id: id });
    res.send(del_record);
}

module.exports = {
  getUsers,
  updateUsers,
  createUsers,
  deleteUsers
};
