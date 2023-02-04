const path = require('path');
const { Op } = require('sequelize');
const { Logger } = require('winston');
const BusinessQuery = require('../helpers/businessQuery');
const loggedUser = require('../helpers/loggedUser');
const { getPagination, getPagingData } = require('../helpers/Pagination');
const { productCategoryValidation } = require('../helpers/validations');
const Models = require('../models');
const ProductCategory = Models.ProductCategory;

/**
 * Fetch Active ProductCategory Records
 * @param {*} req
 * @param {*} res
 */
const getCategories = async (req, res) => {
  const { page, size, title } = req.query;

  var user_email = req?.user?.email;
  const logged_user = await loggedUser(user_email);
  let bs_query = await BusinessQuery(logged_user.id);

  var condition = title ? { title: { [Op.like]: `%${title}%` }, active: 1, ...bs_query } : { active: 1, ...bs_query };
  const { limit, offset } = getPagination(page, size);

  let records = await ProductCategory.findAndCountAll({
    where: condition, limit, offset,
    include: ['user'],
  });
  let response = getPagingData(records, page, limit);
  res.send(response);
};

/**
 * Fetch All ProductCategory Records
 * @param {*} req
 * @param {*} res
 */
const getAllCategories = async (req, res) => {
  const { page, size, title } = req.query;

  var user_email = req?.user?.email;
  const logged_user = await loggedUser(user_email);
  let bs_query = await BusinessQuery(logged_user.id);

  var condition = title ? { title: { [Op.like]: `%${title}%` }, ...bs_query } : bs_query;
  const { limit, offset } = getPagination(page, size);

  let records = await ProductCategory.findAndCountAll({ where: condition, limit, offset, include: ['user'] });
  let response = getPagingData(records, page, limit);
  res.send(response);
};

/**
 * Create Category Record
 * @param {*} req
 * @param {*} res
 */
const createCategory = async (req, res) => {
  let data = req.body;

  // Add User Association
  var user_email = req?.user?.email;
  const logged_user = await loggedUser(user_email);
  data = { user_id: logged_user?.id, business_id: logged_user?.business_id, ...data };

  const { error } = productCategoryValidation(data);
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

    // :TODO Add Schema for Product Images

    data = {
      image: fileNames.trim(),
      image_url: filePaths.trim(),
      ...data,
    };
  }

  // // image upload / end

  try {
    let new_record = await ProductCategory.create(data);
    let status = new_record ? 'Success' : 'Error';

    return res.send({
      status: status,      
      data: new_record,
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
 * Update ProductCategory Record
 * @param {*} req
 * @param {*} res
 */
const updateCategory = async (req, res) => {
  let data = req.body;
  let id = req.params.id;
  if (!id) return res.status(400).send(`Record ID is required`);

  // check if user in db
  let record = await ProductCategory.findByPk(id);
  if (!record) return res.status(400).send(`Record with Id: ${id} not found`);

  // Add User Association
  var user_email = req?.user?.email;
  const logged_user = await loggedUser(user_email);
  data = { user_id: logged_user?.id, business_id: logged_user?.business_id, ...data };

  const { error } = productCategoryValidation(data);
  if (error)
    return res.status(400).json({
      status: 'error',
      message: error.details[0].message,
    });

  let patched_record = await ProductCategory.update(data, {
    where: { id: id },
  });
  let status = patched_record ? 'Success' : 'Error';
  patched_record = await ProductCategory.findByPk(id);

  return res.send({
    status: status,
    data: patched_record,
    message: status + ' updating record',
  });
};

/**
 * Delete ProductCategory Record
 * @param {*} req
 * @param {*} res
 */
const deleteCategory = async (req, res) => {
  let id = req.params.id;

  // Delete the document by its _id
  let del_record = await ProductCategory.destroy({
    where: { id: id },
  });
  let status = del_record ? 'Success' : 'Error';

  return res.send({
    status: status,
    message: status + ' deleting record',
  });
};

module.exports = {
  getCategories,
  getAllCategories,
  updateCategory,
  createCategory,
  deleteCategory,
};
