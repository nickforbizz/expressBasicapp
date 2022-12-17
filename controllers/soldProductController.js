const { Logger } = require('winston');
const { soldProductValidation } = require('../helpers/validations');
const SoldProduct = require('../models/SoldProduct');





/**
 * Fetch Active SoldProduct Records
 * @param {*} req
 * @param {*} res
 */
const getSoldProducts = async (req, res) => {
  let records = await SoldProduct.find();
  res.send(records);
};





/**
 * Fetch All SoldProduct Records
 * @param {*} req
 * @param {*} res
 */
const getAllSoldProducts = async (req, res) => {
  let records = await SoldProduct.find({active: 1});
  res.send(records);
};




/**
 * Create SoldProduct Record
 * @param {*} req
 * @param {*} res
 */
const createSoldProduct = async (req, res) => {
    let data = req.body;
    const { error } = soldProductValidation(data);
    if (error)
        return res.status(400).json({
        status: 'error',
        message: error.details[0].message,
        });

    let new_record = await new SoldProduct(data);

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
 * Update SoldProduct Record
 * @param {*} req
 * @param {*} res
 */
const updateSoldProduct = async (req, res) => {
    let records = await SoldProduct.find();
    res.send(records);
};




/**
 * Delete SoldProduct Record
 * @param {*} req
 * @param {*} res
 */
const deleteSoldProduct = async (req, res) => {
    let data = req.body;
    let id = req.params.id;
  
    // Delete the document by its _id
    let del_record = await SoldProduct.deleteOne({ _id: id });
    res.send(del_record);
  };



module.exports = {
    getSoldProducts,
    getAllSoldProducts,
    updateSoldProduct,
    createSoldProduct,
    deleteSoldProduct,
  };