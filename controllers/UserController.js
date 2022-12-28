const path = require('path');
const bcrypt = require('bcryptjs');
const Models = require('../models');
const User = Models.User;

const getUsers = async (req, res) => {
  let users = await User.findAll();
  res.send(users);
};

const updateUsers = async (req, res) => {
  const files = req.files;
  const projectRootPath = path.resolve('./');
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
  deleteUsers
};
