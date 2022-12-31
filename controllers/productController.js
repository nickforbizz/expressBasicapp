const Logger = require('../services/logger');
const { productValidation } = require('../helpers/validations');
const Product = require('../models/Product');





/**
 * Fetch Active Product Records
 * @param {*} req
 * @param {*} res
 */
const getProducts = async (req, res) => {
  let records = await Product.findAll();
  res.send(records);
};





/**
 * Fetch All Product Records
 * @param {*} req
 * @param {*} res
 */
const getAllProducts = async (req, res) => {
  let records = await Product.findAll({active: 1});
  res.send(records);
};




/**
 * Create Product Record
 * @param {*} req
 * @param {*} res
 */
const createProduct = async (req, res) => {
    let data = req.body;
    const { error } = productValidation(data);
    if (error)
        return res.status(400).json({
        status: 'error',
        message: error.details[0].message,
        });


    try {
        let new_record = await Product.create(data);
        let status;
    
        if (new_record) {
          status = 'success';
        } else {
          status = 'error';
        }
    
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
}




/**
 * Update Product Record
 * @param {*} req
 * @param {*} res
 */
const updateProduct = async (req, res) => {
    let data = req.body;
    let id = data?.id;
    if (!id) return res.status(400).send(`Record ID is required`);

    // check if user in db
    let record = await Product.findByPk(id);
    if (!record) return res.status(400).send(`Record with Id: ${id} not found`);

    let patched_record = await Product.update(data, {
        where: { id: id },
    });
    res.send(patched_record);
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
    res.send(del_record);
  };



module.exports = {
    getProducts,
    getAllProducts,
    updateProduct,
    createProduct,
    deleteProduct,
  };