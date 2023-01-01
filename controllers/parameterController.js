const Logger = require('../services/logger');
const { parameterValidation } = require('../helpers/validations');
const Models = require('../models');
const loggedUser = require('../helpers/loggedUser');
const Parameter = Models.Parameter;

/**
 * Fetch Active Parameter Records
 * @param {*} req
 * @param {*} res
 */
const getParameters = async (req, res) => {
  let records = await Parameter.findAll({
    where: { active: 1 },
    include: ['user'],
  });
  res.send(records);
};

/**
 * Fetch All Parameter Records
 * @param {*} req
 * @param {*} res
 */
const getAllParameters = async (req, res) => {
  let records = await Parameter.findAll({ include: ['user'] });
  res.send(records);
};

/**
 * Create Parameter Record
 * @param {*} req
 * @param {*} res
 */
const createParameter = async (req, res) => {
  let data = req.body;

  // Add User Association
  var user_email = req?.user?.email;
  const logged_user = await loggedUser(user_email);
  data = { user_id: logged_user?.id, ...data };

  const { error } = parameterValidation(data);
  if (error)
    return res.status(400).json({
      status: 'error',
      message: error.details[0].message,
    });

  try {
    let new_record = await Parameter.create(data);
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
 * Update Parameter Record
 * @param {*} req
 * @param {*} res
 */
const updateParameter = async (req, res) => {
  let data = req.body;
  let id = data?.id;
  if (!id) return res.status(400).send(`Record ID is required`);

  // check if user in db
  let record = await Parameter.findByPk(id);
  if (!record) return res.status(400).send(`Record with Id: ${id} not found`);

  // Add User Association
  var user_email = req?.user?.email;
  const logged_user = await loggedUser(user_email);
  data = { user_id: logged_user?.id, ...data };

  const { error } = parameterValidation(data);
  if (error)
    return res.status(400).json({
      status: 'error',
      message: error.details[0].message,
    });

  let patched_record = await Parameter.update(data, {
    where: { id: id },
  });
  let status = patched_record ? 'Success' : 'Error';

  return res.send({
    status: status,
    message: status + ' updating record',
  });
};

/**
 * Delete Parameter Record
 * @param {*} req
 * @param {*} res
 */
const deleteParameter = async (req, res) => {
  let id = req.params.id;

  // Delete the document by its _id
  let del_record = await Parameter.destroy({
    where: { id: id },
  });
  let status = del_record ? 'Success' : 'Error';

  return res.send({
    status: status,
    message: status + ' deleting record',
  });
};

module.exports = {
  getParameters,
  getAllParameters,
  updateParameter,
  createParameter,
  deleteParameter,
};
