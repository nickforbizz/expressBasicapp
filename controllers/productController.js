const Logger = require('../services/logger');
const { productValidation } = require('../helpers/validations');
const loggedUser = require('../helpers/loggedUser');
const Models = require('../models');
const Product = Models.Product;

/**
 * Fetch Active Product Records
 * @param {*} req
 * @param {*} res
 */
const getProducts = async (req, res) => {
  let records = await Product.findAll({
    where: { active: 1 },
    include: ['user', 'make', 'product_category', 'model'],
  });
  res.send(records);
};

/**
 * Fetch All Product Records
 * @param {*} req
 * @param {*} res
 */
const getAllProducts = async (req, res) => {
  let records = await Product.findAll({
    include: ['user', 'make', 'product_category', 'model'],
  });
  res.send(records);
};

/**
 * Create Product Record
 * @param {*} req
 * @param {*} res
 */
const createProduct = async (req, res) => {
  let data = req.body;

  // Add User Association
  var user_email = req?.user?.email;
  const logged_user = await loggedUser(user_email);
  data = { user_id: logged_user?.id, ...data };

  const { error } = productValidation(data);
  if (error)
    return res.status(400).json({
      status: 'error',
      message: error.details[0].message,
    });

  try {
    let new_record = await Product.create(data);
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
 * Update Product Record
 * @param {*} req
 * @param {*} res
 */
const updateProduct = async (req, res) => {
  let data = req.body;
  let id = req.params.id;
  if (!id) return res.status(400).send(`Record ID is required`);

  // check if user in db
  let record = await Product.findByPk(id);
  if (!record) return res.status(400).send(`Record with Id: ${id} not found`);

  // Add User Association
  var user_email = req?.user?.email;
  const logged_user = await loggedUser(user_email);
  data = { user_id: logged_user?.id, ...data };

  const { error } = productValidation(data);
  if (error)
    return res.status(400).json({
      status: 'error',
      message: error.details[0].message,
    });

  let patched_record = await Product.update(data, {
    where: { id: id },
  });
  let status = patched_record ? 'Success' : 'Error';

  return res.send({
    status: status,
    message: status + ' updating record',
  });
};

/**
 * Delete Product Record
 * @param {*} req
 * @param {*} res
 */
const deleteProduct = async (req, res) => {
  let id = req.params.id;

  // Delete the document by its _id
  let del_record = await Product.destroy({
    where: { id: id },
  });
  let status = del_record ? 'Success' : 'Error';

  return res.send({
    status: status,
    message: status + ' deleting record',
  });
};

module.exports = {
  getProducts,
  getAllProducts,
  updateProduct,
  createProduct,
  deleteProduct,
};
