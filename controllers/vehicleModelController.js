const Logger = require('../services/logger');
const loggedUser = require('../helpers/loggedUser');
const { vehicleModelValidation } = require('../helpers/validations');
const Models = require('../models');
const { getPagination, getPagingData } = require('../helpers/Pagination');
const { Op } = require('sequelize');
const BusinessQuery = require('../helpers/businessQuery');
const VehicleModel = Models.VehicleModel;

/**
 * Fetch Active VehicleModel Records
 * @param {*} req
 * @param {*} res
 */
const getModels = async (req, res) => {
  const { page, size, title } = req.query;

  var user_email = req?.user?.email;
  const logged_user = await loggedUser(user_email);
  let bs_query = await BusinessQuery(logged_user.id);

  var condition = title ? { title: { [Op.like]: `%${title}%` }, ...bs_query, active: 1 } : { active: 1, ...bs_query };
  const { limit, offset } = getPagination(page, size);
  let records = await VehicleModel.findAndCountAll({ where: condition, limit, offset,  include: ['user', 'make']});
  let response = getPagingData(records, page, limit);
  res.send(response);
};

/**
 * Fetch All VehicleModel Records
 * @param {*} req
 * @param {*} res
 */
const getAllModels = async (req, res) => {
  const { page, size, title } = req.query;

  var user_email = req?.user?.email;
  const logged_user = await loggedUser(user_email);
  let bs_query = await BusinessQuery(logged_user.id);

  var condition = title ? { title: { [Op.like]: `%${title}%` }, ...bs_query } : bs_query;
  const { limit, offset } = getPagination(page, size);
  let records = await VehicleModel.findAndCountAll({ where: condition, limit, offset,  include: ['user', 'make']});
  let response = getPagingData(records, page, limit);
  res.send(response);
};

/**
 * Create Model Record
 * @param {*} req
 * @param {*} res
 */
const createModel = async (req, res) => {
  let data = req.body;

  // Add User Association
  var user_email = req?.user?.email;
  const logged_user = await loggedUser(user_email);
  data = { user_id: logged_user?.id, business_id: logged_user?.business_id, ...data };

  const { error } = vehicleModelValidation(data);
  if (error)
    return res.status(400).json({
      status: 'error',
      message: error.details[0].message,
    });

  try {
    let new_record = await VehicleModel.create(data);
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
 * Update VehicleModel Record
 * @param {*} req
 * @param {*} res
 */
const updateModel = async (req, res) => {
  let data = req.body;
  let id = req.params.id;
  if (!id) return res.status(400).send(`Record ID is required`);

  // check if user in db
  let record = await VehicleModel.findByPk(id);
  if (!record) return res.status(400).send(`Record with Id: ${id} not found`);


  // Add User Association
  var user_email = req?.user?.email;
  const logged_user = await loggedUser(user_email);
  data = {user_id: logged_user?.id, business_id: logged_user?.business_id, ...data}


  const { error } = vehicleModelValidation(data);
  if (error)
    return res.status(400).json({
      status: 'error',
      message: error.details[0].message,
      
    });



  let patched_record = await VehicleModel.update(data, {
    where: { id: id },
  });
  let status = patched_record ? 'Success' : 'Error';
  patched_record = await VehicleModel.findByPk(id);

  return res.send({
    status: status,
    message: status + ' updating record',
    data: patched_record,
  });
};

/**
 * Delete VehicleModel Record
 * @param {*} req
 * @param {*} res
 */
const deleteModel = async (req, res) => {
  let id = req.params.id;

  // Delete the document by its _id
  let del_record = await VehicleModel.destroy({
    where: { id: id },
  });
  let status = del_record ? 'Success' : 'Error';

  return res.send({
    status: status,
    message: status + ' deleting record',
  });
};

module.exports = {
  getModels,
  getAllModels,
  updateModel,
  createModel,
  deleteModel,
};
