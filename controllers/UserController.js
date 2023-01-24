const path = require('path');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const Models = require('../models');
const Logger = require('../services/logger');
const { registerValidation } = require('../helpers/validations');
const { getPagination, getPagingData } = require('../helpers/Pagination');
const { Op } = require('sequelize');

const User = Models.User;

const getUsers = async (req, res) => {
  const { page, size, email } = req.query;
  var condition = email ? { email: { [Op.like]: `%${email}%` }, active: 1 } : null;
  const { limit, offset } = getPagination(page, size);
  let users = await User.findAndCountAll({ where: condition, limit, offset, include: ['business'] });
  let response = getPagingData(users, page, limit);
  res.send(response);
};

const getAllUsers = async (req, res) => {
  const { page, size, email } = req.query;
  var condition = email ? { email: { [Op.like]: `%${email}%` } } : null;
  const { limit, offset } = getPagination(page, size);

  let users = await User.findAndCountAll({ where: condition, limit, offset, include: ['business'] });
  let response = getPagingData(users, page, limit);
  res.send(response);
};

const getLatestUsers = async (req, res) => {
  const { page, size=13, email } = req.query;
  var condition = email ? { email: { [Op.like]: `%${email}%` } } : null;
  let order = [['id','DESC']];
  const { limit, offset } = getPagination(page, size);

  let users = await User.findAndCountAll({ where: condition, order, limit, offset, include: ['business'] });
  let response = getPagingData(users, page, limit);
  res.send(response);
};

const updateUsers = async (req, res) => {
  const file = req.files;
  const projectRootPath = path.resolve('./');

  let data = req.body;
  
  let user_id = req.params.id;
  if (!user_id) return res.status(400).send(`User ID is required`);
  
  // validate
  const { error } = registerValidation(data);
  if (error)
    return res.status(400).json({
      status: 'error',
      message: error.details[0].message,
    });
  
  // return res.send(data.password);
  // check if user in db
  const user = await User.findByPk(user_id);
  if (!user) return res.status(400).send(`User with Id: ${user_id} not found`);

  // Hash the Password
  const salt = await bcrypt.genSalt(15);
  const hashPassword = await bcrypt.hash(data.password, salt);

  console.log("hashPassword");
  console.log(hashPassword);

  data = {
    password: hashPassword,
    ...data,
  };
  // Store Image
  if (file) {
    const avator = file['avator'];
    let ext = '.' + avator.mimetype.split('/')[1];
    let md5 = avator.md5;
    let filename = md5 + ext;

    if(user?.image){
      const oldfilepath = path.join(projectRootPath, 'uploads/user', user.image);
      // remove the initial file if any
      fs.unlink(oldfilepath, (err) => {
        if (err) throw err;
        console.log('Delete File successfully.');
      });

    }
    
    // store the file
    const filepath = path.join(projectRootPath, 'uploads/user', filename);
    avator.mv(filepath, (err) => {
      if (err)
        return res.status(500).json({
          status: 'error',
          message: err,
        });
    });

    data = {
      image: filename.trim(),
      image_url: filepath.trim(),
      ...data,
    };
  }

  let patched_record = await User.update(data, {
    where: { id: user_id },
  });
  let updated_record = await User.findByPk(user_id);

  let status = patched_record ? 'Success' : 'Error';

  return res.send({
    status: status,
    data: updated_record,
    message: status + ' updating record',
  });
};

const deleteUsers = async (req, res) => {
  let id = req.params.id;

  // Delete the document by its _id
  let del_record = await User.destroy({
    where: { id: id },
  });
  let status = del_record ? 'Success' : 'Error';

  return res.send({
    status: status,
    message: status + ' deleting record',
  });
};

module.exports = {
  getUsers,
  getAllUsers,
  getLatestUsers,
  updateUsers,
  deleteUsers,
};
