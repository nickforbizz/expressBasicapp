const { Logger } = require('winston');
const { productValidation } = require('../helpers/validations');
const Product = require('../models/Product');





/**
 * Fetch Active Product Records
 * @param {*} req
 * @param {*} res
 */
const getProducts = async (req, res) => {
  let records = await Product.find();
  res.send(records);
};





/**
 * Fetch All Product Records
 * @param {*} req
 * @param {*} res
 */
const getAllProducts = async (req, res) => {
  let records = await Product.find({active: 1});
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

    let new_record = await new Product(data);

    try {
        const savedRecord = await new_record.save();
        return res.json({
            status: 'success',
            message: 'record saved successfuly',
            data: savedRecord
        });
    } catch (error) {
        Logger.error(error);
        return res.status(400).json({
            status: 'error',
            message: error
        });
    }
}




/**
 * Update Product Record
 * @param {*} req
 * @param {*} res
 */
const updateProduct = async (req, res) => {
    let records = await Product.find();
    res.send(records);
};




/**
 * Delete Product Record
 * @param {*} req
 * @param {*} res
 */
const deleteProduct = async (req, res) => {
    let data = req.body;
    let id = req.params.id;
  
    // Delete the document by its _id
    let del_record = await Product.deleteOne({ _id: id });
    res.send(del_record);
  };



module.exports = {
    getProducts,
    getAllProducts,
    updateProduct,
    createProduct,
    deleteProduct,
  };