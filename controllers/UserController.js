const path = require('path');
const bcrypt = require('bcryptjs');
const Models = require('../models');
const Logger = require('../services/logger');
const User = Models.User;



const getUsers = async (req, res) => {
  let users = await User.findAll({where: {active: 1}});
  res.send(users);
};

const getAllUsers = async (req, res) => {
  let users = await User.findAll();
  res.send(users);
};



const updateUsers = async (req, res) => {
  const file = req.files;
  const avator = file['avator'];
  const projectRootPath = path.resolve('./');

  let data = req.body;
  let user_id = data?.id;
  if (!user_id) return res.status(400).send(`User ID is required`);

  // check if user in db
  const user = await User.findByPk(user_id);
  if (!user) return res.status(400).send(`User with Id: ${user_id} not found`);

  // Hash the Password
  const salt = await bcrypt.genSalt(15);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  // Store Image
  if(file){
    let ext = '.' + avator.mimetype.split('/')[1];
    let md5 = avator.md5;
    let filename = md5 + ext;
  
  
    // TOD
    // remove the initial file if any

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
      password: hashPassword,
      ...data,
    };

  }

  

  let patched_user = await User.update( data, {
    where: { id: user_id }
  });

  res.send(patched_user);
};







const deleteUsers = async (req, res) => {
    let id = req.params.id;

    // Delete the document by its _id
    let del_record = await User.destroy({
      where: { id: id }
    });
    res.send(del_record);
}

module.exports = {
  getUsers,
  getAllUsers,
  updateUsers,
  deleteUsers
};
