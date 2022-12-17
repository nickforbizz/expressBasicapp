const { Logger } = require('winston');
const { vehicleModelValidation } = require('../helpers/validations');
const VehicleModel = require('../models/VehicleModel');





/**
 * Fetch Active VehicleModel Records
 * @param {*} req
 * @param {*} res
 */
const getModels = async (req, res) => {
  let records = await VehicleModel.find();
  res.send(records);
};





/**
 * Fetch All VehicleModel Records
 * @param {*} req
 * @param {*} res
 */
const getAllModels = async (req, res) => {
  let records = await VehicleModel.find({active: 1});
  res.send(records);
};




/**
 * Create Model Record
 * @param {*} req
 * @param {*} res
 */
const createModel = async (req, res) => {
    let data = req.body;
    const { error } = vehicleModelValidation(data);
    if (error)
        return res.status(400).json({
        status: 'error',
        message: error.details[0].message,
        });

    let new_record = await new VehicleModel(data);

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
 * Update VehicleModel Record
 * @param {*} req
 * @param {*} res
 */
const updateModel = async (req, res) => {
    let records = await VehicleModel.find();
    res.send(records);
};




/**
 * Delete VehicleModel Record
 * @param {*} req
 * @param {*} res
 */
const deleteModel = async (req, res) => {
    let data = req.body;
    let id = req.params.id;
  
    // Delete the document by its _id
    let del_record = await VehicleModel.deleteOne({ _id: id });
    res.send(del_record);
  };



module.exports = {
    getModels,
    getAllModels,
    updateModel,
    createModel,
    deleteModel,
  };