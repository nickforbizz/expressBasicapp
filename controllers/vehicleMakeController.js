const Logger = require('../services/logger');
const loggedUser = require('../helpers/loggedUser');
const { vehicleMakeValidation } = require('../helpers/validations');
const Models = require('../models/');
const { Op } = require('sequelize');
const { getPagination, getPagingData } = require('../helpers/Pagination');
const BusinessQuery = require('../helpers/businessQuery');
const VehicleMake = Models.VehicleMake

/**
 * Fetch Active VehicleMake Records
 * @param {*} req
 * @param {*} res
 */
const getMakes = async (req, res) => {
  const { page, size, title } = req.query;

  var user_email = req?.user?.email;
  const logged_user = await loggedUser(user_email);
  let bs_query = await BusinessQuery(logged_user.id);

  var condition = title ? { title: { [Op.like]: `%${title}%` }, active: 1, ...bs_query } : { active: 1, ...bs_query };
  const { limit, offset } = getPagination(page, size);

  let records = await VehicleMake.findAndCountAll({ where: condition, limit, offset, include: ['user']  });
  let response = getPagingData(records, page, limit);
  res.send(response);
};

/**
 * Fetch All VehicleMake Records
 * @param {*} req
 * @param {*} res
 */
const getAllMakes = async (req, res) => {
  const { page, size, title } = req.query;

  var user_email = req?.user?.email;
  const logged_user = await loggedUser(user_email);
  let bs_query = await BusinessQuery(logged_user.id);

  var condition = title ? { title: { [Op.like]: `%${title}%` }, ...bs_query } : bs_query;
  const { limit, offset } = getPagination(page, size);

  let records = await VehicleMake.findAndCountAll({ where: condition, limit, offset, include: ['user'] });
  let response = getPagingData(records, page, limit);
  res.send(response);
};

/**
 * Create Make Record
 * @param {*} req
 * @param {*} res
 */
const createMake = async (req, res) => {
  let data = req.body;

  // Add User Association
  var user_email = req?.user?.email;
  const logged_user = await loggedUser(user_email);
  data = {user_id: logged_user?.id, business_id: logged_user?.business_id, ...data}


  const { error } = vehicleMakeValidation(data);
  if (error)
    return res.status(400).json({
      status: 'error',
      message: error.details[0].message,
    });

  try {
    let new_record = await VehicleMake.create(data);

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
 * Update VehicleMake Record
 * @param {*} req
 * @param {*} res
 */
const updateMake = async (req, res) => {
  let data = req.body;
  let id = req.params.id;
  if (!id) return res.status(400).send(`Record ID is required`);

  const { error } = vehicleMakeValidation(data);
  if (error)
    return res.status(400).json({
      status: 'error',
      message: error.details[0].message,
    });

  // check if user in db
  let record = await VehicleMake.findByPk(id);
  if (!record) return res.status(400).send(`Record with Id: ${id} not found`);

  // Add User Association
  var user_email = req?.user?.email;
  const logged_user = await loggedUser(user_email);
  data = {user_id: logged_user?.id, business_id: logged_user?.business_id, ...data}

  let patched_record = await VehicleMake.update(data, {
    where: { id: id },
  });

  let status = patched_record ? 'Success' : 'Error';
  patched_record = await VehicleMake.findByPk(id);

  return res.send({
    status: status,
    data: patched_record,
    message: status + ' updating record',
  });
};

/**
 * Delete VehicleMake Record
 * @param {*} req
 * @param {*} res
 */
const deleteMake = async (req, res) => {
  let id = req.params.id;

  // Delete the document by its _id
  let del_record = await VehicleMake.destroy({
    where: { id: id },
  });

  let status = del_record ? 'Success' : 'Error';

  return res.send({
    status: status,
    message: status + ' deleting record',
  });
};

module.exports = {
  getMakes,
  getAllMakes,
  updateMake,
  createMake,
  deleteMake,
};
