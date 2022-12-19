const path = require('path');
const { Logger } = require('winston');
const { postValidation } = require('../helpers/validations');
const Post = require('../models/Post');

/**
 * Fetch Active Post Records
 * @param {*} req
 * @param {*} res
 */
const getPosts = async (req, res) => {
  let records = await Post.find().populate('created_by');
  res.send(records);
};

/**
 * Fetch All Post Records
 * @param {*} req
 * @param {*} res
 */
const getAllPosts = async (req, res) => {
  let records = await Post.find({active: 1});
  res.send(records);
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
  const { error } = postValidation(data);
  if (error)
    return res.status(400).json({
      status: 'error',
      message: error.details[0].message,
    });

  let fileNames = '';
  let filePaths = '';
  Object.keys(files).forEach((key) => {
    let ext = '.' + files[key].mimetype.split('/')[1];
    let md5 = files[key].md5;
    let filename = md5 + ext;

    // store the file
    const filepath = path.join(projectRootPath, 'uploads', filename);
    files[key].mv(filepath, err=>{
        if(err) return res.status(500).json({
            status: "error",
            message: err
        })
    });

    fileNames += filename + ' ';
    filePaths += filepath + ' ';
  });

  data = {
    image: fileNames.trim(),
    image_url: filePaths.trim(),
    ...data,
  };

  let new_post = await new Post(data);

  try {
    const savedRecord = await new_post.save();
    return res.json({
        status: 'success',
        message: 'record saved successfuly',
        data: savedRecord
    });
  } catch (error) {
    Logger.error(error);
    return res.status(400).json({
        status: 'error',
        message: error
    });
  }

};

/**
 * Update Post Record
 * @param {*} req
 * @param {*} res
 */
const updatePost = async (req, res) => {
  let records = await Post.find();
  res.send(records);
};

/**
 * Delete Post Record
 * @param {*} req
 * @param {*} res
 */
const deletePost = async (req, res) => {
  let data = req.body;
  let id = req.params.id;

  // Delete the document by its _id
  let del_record = await Post.deleteOne({ _id: id });
  res.send(del_record);
};





module.exports = {
  getPosts,
  getAllPosts,
  updatePost,
  createPost,
  deletePost,
};
