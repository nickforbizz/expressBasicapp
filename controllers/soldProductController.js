const Logger = require('../services/logger');
const { soldProductValidation } = require('../helpers/validations');
const loggedUser = require('../helpers/loggedUser');
const Models = require('../models');
const SoldProduct = Models.SoldProduct;

/**
 * Fetch Active SoldProduct Records
 * @param {*} req
 * @param {*} res
 */
const getSoldProducts = async (req, res) => {
  let records = await SoldProduct.findAll({
    where: { active: 1 },
    include: ['user', 'product'],
  });
  res.send(records);
};

/**
 * Fetch All SoldProduct Records
 * @param {*} req
 * @param {*} res
 */
const getAllSoldProducts = async (req, res) => {
  let records = await SoldProduct.findAll({ include: ['user', 'product'] });
  res.send(records);
};

/**
 * Create SoldProduct Record
 * @param {*} req
 * @param {*} res
 */
const createSoldProduct = async (req, res) => {
  let data = req.body;

  // Add User Association
  var user_email = req?.user?.email;
  const logged_user = await loggedUser(user_email);
  data = { user_id: logged_user?.id, ...data };

  const { error } = soldProductValidation(data);
  if (error)
    return res.status(400).json({
      status: 'error',
      message: error.details[0].message,
    });

  try {
    let new_record = await SoldProduct.create(data);
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
 * Update SoldProduct Record
 * @param {*} req
 * @param {*} res
 */
const updateSoldProduct = async (req, res) => {
  let data = req.body;
  let id = req.params.id;
  if (!id) return res.status(400).send(`Record ID is required`);

  // check if user in db
  let record = await SoldProduct.findByPk(id);
  if (!record) return res.status(400).send(`Record with Id: ${id} not found`);

  // Add User Association
  var user_email = req?.user?.email;
  const logged_user = await loggedUser(user_email);
  data = { user_id: logged_user?.id, ...data };

  const { error } = soldProductValidation(data);
  if (error)
    return res.status(400).json({
      status: 'error',
      message: error.details[0].message,
    });

  let patched_record = await SoldProduct.update(data, {
    where: { id: id },
  });
  let status = patched_record ? 'Success' : 'Error';

  return res.send({
    status: status,
    message: status + ' updating record',
  });
};

/**
 * Delete SoldProduct Record
 * @param {*} req
 * @param {*} res
 */
const deleteSoldProduct = async (req, res) => {
  let id = req.params.id;

  // Delete the document by its _id
  let del_record = await SoldProduct.destroy({
    where: { id: id },
  });
  let status = del_record ? 'Success' : 'Error';

  return res.send({
    status: status,
    message: status + ' deleting record',
  });
};

module.exports = {
  getSoldProducts,
  getAllSoldProducts,
  updateSoldProduct,
  createSoldProduct,
  deleteSoldProduct,
};
