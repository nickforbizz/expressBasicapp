const { Logger } = require('winston');
const loggedUser = require('../helpers/loggedUser');
const { productCategoryValidation } = require('../helpers/validations');
const Models = require('../models');
const ProductCategory = Models.ProductCategory;

/**
 * Fetch Active ProductCategory Records
 * @param {*} req
 * @param {*} res
 */
const getCategories = async (req, res) => {
  let records = await ProductCategory.findAll({
    where: { active: 1 },
    include: ['user'],
  });
  res.send(records);
};

/**
 * Fetch All ProductCategory Records
 * @param {*} req
 * @param {*} res
 */
const getAllCategories = async (req, res) => {
  let records = await ProductCategory.findAll({ include: ['user'] });
  res.send(records);
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
  data = { user_id: logged_user?.id, ...data };

  const { error } = productCategoryValidation(data);
  if (error)
    return res.status(400).json({
      status: 'error',
      message: error.details[0].message,
    });

  try {
    let new_record = await ProductCategory.create(data);
    let status = new_record ? 'Success' : 'Error';

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
  data = { user_id: logged_user?.id, ...data };

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

  return res.send({
    status: status,
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
