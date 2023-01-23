const Logger = require('../services/logger');
const { soldProductValidation } = require('../helpers/validations');
const loggedUser = require('../helpers/loggedUser');
const { getPagination, getPagingData } = require('../helpers/Pagination');
const { Product, SoldProduct, User, VehicleMake } = require('../models');
const { Op } = require('sequelize');

/**
 * Fetch Active SoldProduct Records
 * @param {*} req
 * @param {*} res
 */
const getStats = async (req, res) => {
  var condition_active =  { active: 1 };
  var condition_inactive =  { active: {[Op.or]: [0, null]} };

  // Users
  let active_users = await User.count({
    where: condition_active
  });
  let inactive_users = await User.count({
    where: condition_inactive
  });

  // Sales
  let active_sales = await SoldProduct.count({
    where: condition_active
  });
  let inactive_sales = await SoldProduct.count({
    where: condition_inactive
  });


  // Products
  let active_products = await Product.count({
    where: condition_active
  });
  let inactive_products = await Product.count({
    where: condition_inactive
  });

  // Makes
  let active_makes = await VehicleMake.count({
    where: condition_active
  });
  let inactive_makes = await VehicleMake.count({
    where: condition_inactive
  });


  res.send({
    sales : {active_sales, inactive_sales},
    users : {active_users, inactive_users},
    products : {active_products, inactive_products},
    makes : {active_makes, inactive_makes},
  });
};







/**
 * Delete SoldProduct Record
 * @param {*} req
 * @param {*} res
 */
const deleteItem = async (req, res) => {
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
  getStats,
  deleteItem,
};