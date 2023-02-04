const path = require('path');
const Logger = require('../services/logger');
const loggedUser = require('../helpers/loggedUser');
const { postValidation } = require('../helpers/validations');
const Models = require('../models');
const { getPagination, getPagingData } = require('../helpers/Pagination');
const { Op } = require('sequelize');
const Post = Models.Post;
const User = Models.User;

/**
 * Fetch Active Post Records
 * @param {*} req
 * @param {*} res
 */
const getPosts = async (req, res) => {
  const { page, size, title } = req.query;

  var user_email = req?.user?.email;
  const logged_user = await loggedUser(user_email);
  let bs_query = await BusinessQuery(logged_user.id);

  var condition = title
    ? { title: { [Op.like]: `%${title}%` }, active: 1, ...bs_query }
    : { active: 1, ...bs_query };
  const { limit, offset } = getPagination(page, size);

  let records = await Post.findAll({
    where: condition,
    limit,
    offset,
    include: ['user'],
  });
  let response = getPagingData(records, page, limit);
  res.send(response);
};

/**
 * Fetch All Post Records
 * @param {*} req
 * @param {*} res
 */
const getAllPosts = async (req, res) => {
  const { page, size, title } = req.query;

  var user_email = req?.user?.email;
  const logged_user = await loggedUser(user_email);
  let bs_query = await BusinessQuery(logged_user.id);

  var condition = title
    ? { title: { [Op.like]: `%${title}%` }, ...bs_query }
    : bs_query;
  const { limit, offset } = getPagination(page, size);

  let records = await Post.findAll({
    where: condition,
    limit,
    offset,
    include: ['user'],
  });
  let response = getPagingData(records, page, limit);
  res.send(response);
};

/**
 * Create Post Record
 * @param {*} req
 * @param {*} res
 */
const createPost = async (req, res) => {
  const files = req.files;
  const projectRootPath = path.resolve('./');
  let data = req.body;

  // Add User Association
  var user_email = req?.user?.email;
  const logged_user = await loggedUser(user_email);
  data = {
    user_id: logged_user?.id,
    business_id: logged_user?.business_id,
    ...data,
  };

  const { error } = postValidation(data);
  if (error)
    return res.status(400).json({
      status: 'error',
      message: error.details[0].message,
    });

  // image upload
  let fileNames = '';
  let filePaths = '';
  if (files) {
    Object.keys(files).forEach((key) => {
      let ext = '.' + files[key].mimetype.split('/')[1];
      let md5 = files[key].md5;
      let filename = md5 + ext;

      // store the file
      const filepath = path.join(projectRootPath, 'uploads', filename);
      files[key].mv(filepath, (err) => {
        if (err)
          return res.status(500).json({
            status: 'error',
            message: err,
          });
      });

      fileNames += filename + ' ';
      filePaths += filepath + ' ';
    });

    data = {
      image: fileNames.trim(),
      image_url: filePaths.trim(),
      ...data,
    };
  }

  // // image upload / end

  try {
    // return res.send(data);
    let new_record = await Post.create(data);
    let status;

    if (new_record) {
      status = 'success';
    } else {
      status = 'error';
    }

    return res.send({
      status: status,
      message: status + ' creating record',
    });
  } catch (error) {
    Logger.error(error);
    return res.status(400).json({
      status: 'error',
      message: error,
    });
  }
};

/**
 * Update Post Record
 * @param {*} req
 * @param {*} res
 */
const updatePost = async (req, res) => {
  let data = req.body;
  let id = req.params.id;
  if (!id) return res.status(400).send(`Record ID is required`);

  // check if user in db
  let record = await Post.findByPk(id);
  if (!record) return res.status(400).send(`Record with Id: ${id} not found`);

  // Add User Association
  var user_email = req?.user?.email;
  const logged_user = await loggedUser(user_email);
  data = {
    user_id: logged_user?.id,
    business_id: logged_user?.business_id,
    ...data,
  };

  let patched_record = await Post.update(data, {
    where: { id: id },
  });

  let status = patched_record ? 'Success' : 'Error';

  return res.send({
    status: status,
    message: status + ' updating record',
  });
};

/**
 * Delete Post Record
 * @param {*} req
 * @param {*} res
 */
const deletePost = async (req, res) => {
  let id = req.params.id;

  // Delete the document by its _id
  let del_record = await Post.destroy({
    where: { id: id },
  });

  let status = del_record ? 'Success' : 'Error';

  return res.send({
    status: status,
    message: status + ' Deleting record',
  });
};

module.exports = {
  getPosts,
  getAllPosts,
  updatePost,
  createPost,
  deletePost,
};
