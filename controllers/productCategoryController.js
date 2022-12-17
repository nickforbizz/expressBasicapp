const { Logger } = require('winston');
const { productCategoryValidation } = require('../helpers/validations');
const ProductCategory = require('../models/ProductCategory');





/**
 * Fetch Active ProductCategory Records
 * @param {*} req
 * @param {*} res
 */
const getCategories = async (req, res) => {
  let records = await ProductCategory.find();
  res.send(records);
};





/**
 * Fetch All ProductCategory Records
 * @param {*} req
 * @param {*} res
 */
const getAllCategories = async (req, res) => {
  let records = await ProductCategory.find({active: 1});
  res.send(records);
};




/**
 * Create Category Record
 * @param {*} req
 * @param {*} res
 */
const createCategory = async (req, res) => {
    let data = req.body;
    const { error } = productCategoryValidation(data);
    if (error)
        return res.status(400).json({
        status: 'error',
        message: error.details[0].message,
        });

    let new_record = await new ProductCategory(data);

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
 * Update ProductCategory Record
 * @param {*} req
 * @param {*} res
 */
const updateCategory = async (req, res) => {
    let records = await ProductCategory.find();
    res.send(records);
};




/**
 * Delete ProductCategory Record
 * @param {*} req
 * @param {*} res
 */
const deleteCategory = async (req, res) => {
    let data = req.body;
    let id = req.params.id;
  
    // Delete the document by its _id
    let del_record = await ProductCategory.deleteOne({ _id: id });
    res.send(del_record);
  };



module.exports = {
    getCategories,
    getAllCategories,
    updateCategory,
    createCategory,
    deleteCategory,
  };