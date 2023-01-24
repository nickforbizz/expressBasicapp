const { Op } = require('sequelize');
const { Logger } = require('winston');
const loggedUser = require('../helpers/loggedUser');
const { getPagination, getPagingData } = require('../helpers/Pagination');
const { businessValidation } = require('../helpers/validations');
const Models = require('../models');
const Business = Models.Business;

/**
 * Fetch Active Business Records
 * @param {*} req
 * @param {*} res
 */
const getBusinesses = async (req, res) => {
  const { page, size, title } = req.query;
  var condition = title ? { title: { [Op.like]: `%${title}%` }, active: 1 } : { active: 1 };
  const { limit, offset } = getPagination(page, size);

  let records = await Business.findAndCountAll({
    where: condition, limit, offset
  });
  let response = getPagingData(records, page, limit);
  res.send(response);
};

/**
 * Fetch All Business Records
 * @param {*} req
 * @param {*} res
 */
const getAllBusinesses = async (req, res) => {
  const { page, size, title } = req.query;
  var condition = title ? { title: { [Op.like]: `%${title}%` },  } : null;
  const { limit, offset } = getPagination(page, size);

  let records = await Business.findAndCountAll({ where: condition, limit, offset });
  let response = getPagingData(records, page, limit);
  res.send(response);
};

/**
 * Create Category Record
 * @param {*} req
 * @param {*} res
 */
const createBusiness = async (req, res) => {
  let data = req.body;

  // Add User Association
  var user_email = req?.user?.email;
  const logged_user = await loggedUser(user_email);
  data = { user_id: logged_user?.id, ...data };

  const { error } = businessValidation(data);
  if (error)
    return res.status(400).json({
      status: 'error',
      message: error.details[0].message,
    });

  try {
    let new_record = await Business.create(data);
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
 * Update Business Record
 * @param {*} req
 * @param {*} res
 */
const updateBusiness = async (req, res) => {
  let data = req.body;
  let id = req.params.id;
  if (!id) return res.status(400).send(`Record ID is required`);

  // check if user in db
  let record = await Business.findByPk(id);
  if (!record) return res.status(400).send(`Record with Id: ${id} not found`);

  // Add User Association
  var user_email = req?.user?.email;
  const logged_user = await loggedUser(user_email);
  data = { user_id: logged_user?.id, ...data };

  const { error } = businessValidation(data);
  if (error)
    return res.status(400).json({
      status: 'error',
      message: error.details[0].message,
    });

  let patched_record = await Business.update(data, {
    where: { id: id },
  });
  let status = patched_record ? 'Success' : 'Error';
  patched_record = await Business.findByPk(id);

  return res.send({
    status: status,
    data: patched_record,
    message: status + ' updating record',
  });
};

/**
 * Delete Business Record
 * @param {*} req
 * @param {*} res
 */
const deleteBusiness = async (req, res) => {
  let id = req.params.id;

  // Delete the document by its _id
  let del_record = await Business.destroy({
    where: { id: id },
  });
  let status = del_record ? 'Success' : 'Error';

  return res.send({
    status: status,
    message: status + ' deleting record',
  });
};

module.exports = {
  getBusinesses,
  getAllBusinesses,
  createBusiness,
  updateBusiness,
  deleteBusiness,
};
