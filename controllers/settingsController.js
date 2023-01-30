const loggedUser = require('../helpers/loggedUser');
const { Product, SoldProduct, User, VehicleMake, sequelize } = require('../models');
const { Op } = require('sequelize');
const BusinessQuery = require('../helpers/businessQuery');




/**
 * Fetch Active SoldProduct Records
 * @param {*} req
 * @param {*} res
 */
const getCharts = async (req, res) => {

  const users = await User.findAll({
    attributes: [['created_at', 'month'], [sequelize.fn('count', sequelize.col('created_at')), 'count']],
    group: sequelize.fn('month', sequelize.col('created_at')),
    raw: true
  });


  const sales = null;


  res.send({
    sales,
    users,
  });

}



/**
 * Fetch Active SoldProduct Records
 * @param {*} req
 * @param {*} res
 */
const getStats = async (req, res) => {

  var user_email = req?.user?.email;
  const logged_user = await loggedUser(user_email);
  let bs_query = await BusinessQuery(logged_user.id);

  
  var condition_active =  { active: 1, ...bs_query };
  var condition_inactive =  { active: {[Op.or]: [0, null]}, ...bs_query };

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
  getCharts,
  deleteItem,
};
