const { Logger } = require('winston');
const { productCategoryValidation } = require('../helpers/validations');
const ProductCategory = require('../models/ProductCategory');





/**
 * Fetch Active ProductCategory Records
 * @param {*} req
 * @param {*} res
 */
const getCategories = async (req, res) => {
  let records = await ProductCategory.findAll();
  res.send(records);
};





/**
 * Fetch All ProductCategory Records
 * @param {*} req
 * @param {*} res
 */
const getAllCategories = async (req, res) => {
  let records = await ProductCategory.findAll({active: 1});
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


    try {
        let new_record = await ProductCategory.create(data);
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
 * Update ProductCategory Record
 * @param {*} req
 * @param {*} res
 */
const updateCategory = async (req, res) => {
    let data = req.body;
    let id = data?.id;
    if (!id) return res.status(400).send(`Record ID is required`);

    // check if user in db
    let record = await ProductCategory.findByPk(id);
    if (!record) return res.status(400).send(`Record with Id: ${id} not found`);

    let patched_record = await ProductCategory.update(data, {
        where: { id: id },
    });
    res.send(patched_record);
};




/**
 * Delete ProductCategory Record
 * @param {*} req
 * @param {*} res
 */
const deleteCategory = async (req, res) => {
    let id = req.params.id;

    // Delete the document by its _id
    let del_record = await ProductCategory.destroy({
        where: { id: id },
    });
    res.send(del_record);
  };



module.exports = {
    getCategories,
    getAllCategories,
    updateCategory,
    createCategory,
    deleteCategory,
  };