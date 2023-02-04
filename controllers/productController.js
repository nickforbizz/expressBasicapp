const path = require('path');
const Logger = require('../services/logger');
const { productValidation } = require('../helpers/validations');
const loggedUser = require('../helpers/loggedUser');
const Models = require('../models');
const { Op } = require('sequelize');
const { getPagination, getPagingData } = require('../helpers/Pagination');
const BusinessQuery = require('../helpers/businessQuery');
const Product = Models.Product;

/**
 * Fetch Active Product Records
 * @param {*} req
 * @param {*} res
 */
const getProducts = async (req, res) => {
  const { page, size, title } = req.query;

  var user_email = req?.user?.email;
  const logged_user = await loggedUser(user_email);
  let bs_query = await BusinessQuery(logged_user.id);

  var condition = title
    ? { title: { [Op.like]: `%${title}%` }, active: 1, ...bs_query }
    : { active: 1, ...bs_query };
  const { limit, offset } = getPagination(page, size);

  let records = await Product.findAndCountAll({
    where: condition,
    limit,
    offset,
    include: ['user', 'make', 'product_category', 'model'],
  });
  let response = getPagingData(records, page, limit);
  res.send(response);
};

/**
 * Fetch All Product Records
 * @param {*} req
 * @param {*} res
 */
const getAllProducts = async (req, res) => {
  const { page, size, title } = req.query;

  var user_email = req?.user?.email;
  const logged_user = await loggedUser(user_email);
  let bs_query = await BusinessQuery(logged_user.id);

  var condition = title
    ? { title: { [Op.like]: `%${title}%` }, ...bs_query }
    : bs_query;
  const { limit, offset } = getPagination(page, size);

  let records = await Product.findAndCountAll({
    where: condition,
    limit,
    offset,
    include: ['user', 'make', 'product_category', 'model'],
  });

  let response = getPagingData(records, page, limit);
  res.send(response);
};

/**
 * Fetch All Product Records
 * @param {*} req
 * @param {*} res
 */
const getStockedProducts = async (req, res) => {
  const { page, size, title } = req.query;

  var user_email = req?.user?.email;
  const logged_user = await loggedUser(user_email);
  let bs_query = await BusinessQuery(logged_user.id);

  var condition = title
    ? { title: { [Op.like]: `%${title}%` }, is_sold: 0, ...bs_query }
    : bs_query;
  const { limit, offset } = getPagination(page, size);

  let records = await Product.findAndCountAll({
    where: condition,
    limit,
    offset,
    include: ['user', 'make', 'product_category', 'model'],
  });

  let response = getPagingData(records, page, limit);
  res.send(response);
};

/**
 * Create Product Record
 * @param {*} req
 * @param {*} res
 */
const createProduct = async (req, res) => {
  const files = req.files;
  // const files = req.body.files;
  const projectRootPath = path.resolve('./');
  let data = req.body;

  // Add User Association
  var user_email = req?.user?.email;
  const logged_user = await loggedUser(user_email);
  data = {
    user_id: logged_user?.id,
    business_id: logged_user?.business_id,
    ...data,
  };

  const { error } = productValidation(data);
  if (error)
    return res.status(400).json({
      status: 'error',
      message: error.details[0].message,
    });

  // image upload
  let fileNames = '';
  let filePaths = '';
  console.log({files});
  console.log(req.files);
  console.log(req.body.files);
  
  if (files) {
    Object.keys(files).forEach((key) => {
      let ext = '.' + files[key].mimetype.split('/')[1];
      let md5 = files[key].md5;
      let filename = md5 + ext;

      // store the file
      const filepath = path.join(projectRootPath, 'uploads', filename);
      console.log({filepath});
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
  // return res.status(400).json("here");
  // // image upload / end
  try {
    let new_record = await Product.create(data);
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
 * Update Product Record
 * @param {*} req
 * @param {*} res
 */
const updateProduct = async (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  let data = req.body;
  let id = req.params.id;
  if (!id) return res.status(400).send(`Record ID is required`);

  // check if user in db
  let record = await Product.findByPk(id);
  if (!record) return res.status(400).send(`Record with Id: ${id} not found`);

  // Add User Association
  var user_email = req?.user?.email;
  const logged_user = await loggedUser(user_email);
  data = {
    user_id: logged_user?.id,
    business_id: logged_user?.business_id,
    ...data,
  };

  const { error } = productValidation(data);
  if (error)
    return res.status(400).json({
      status: 'error',
      message: error.details[0].message,
    });

  console.log(data);
  let patching_data = {
    product_category_id: data?.product_category_id,
    vehicle_make_id: data?.vehicle_make_id,
    vehicle_model_id: data?.vehicle_model_id,
    title: data?.title,
    description: data?.description,
    quantity: data?.quantity,
    size: data?.size,
    color: data?.color,
    discount: data?.discount,
    discount_amt: data?.discount_amt,
    is_sold: data?.is_sold,
    price: data?.price,
    condition: data?.condition,
    body_type: data?.body_type,
    active: data?.active,
    user_id: data?.user_id,
  };
  let patched_record = await Product.update(patching_data, {
    where: { id: id },
  });
  let status = patched_record ? 'Success' : 'Error';
  // patched_record = await Product.findByPk(id);
  patched_record = await Product.findAndCountAll({
    where: { id: id },
    limit,
    offset,
    include: ['user', 'make', 'product_category', 'model'],
  });
  let response = getPagingData(patched_record, page, limit);
  // res.send(response);

  return res.send({
    status: status,
    data: response,
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
  getStockedProducts,
  updateProduct,
  createProduct,
  deleteProduct,
};
