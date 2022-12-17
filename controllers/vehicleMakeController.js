const { Logger } = require('winston');
const { vehicleMakeValidation } = require('../helpers/validations');
const VehicleMake = require('../models/VehicleMake');





/**
 * Fetch Active VehicleMake Records
 * @param {*} req
 * @param {*} res
 */
const getMakes = async (req, res) => {
  let records = await VehicleMake.find();
  res.send(records);
};





/**
 * Fetch All VehicleMake Records
 * @param {*} req
 * @param {*} res
 */
const getAllMakes = async (req, res) => {
  let records = await VehicleMake.find({active: 1});
  res.send(records);
};




/**
 * Create Make Record
 * @param {*} req
 * @param {*} res
 */
const createMake = async (req, res) => {
    let data = req.body;
    const { error } = vehicleMakeValidation(data);
    if (error)
        return res.status(400).json({
        status: 'error',
        message: error.details[0].message,
        });

    let new_record = await new VehicleMake(data);

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
 * Update VehicleMake Record
 * @param {*} req
 * @param {*} res
 */
const updateMake = async (req, res) => {
    let records = await VehicleMake.find();
    res.send(records);
};




/**
 * Delete VehicleMake Record
 * @param {*} req
 * @param {*} res
 */
const deleteMake = async (req, res) => {
    let data = req.body;
    let id = req.params.id;
  
    // Delete the document by its _id
    let del_record = await VehicleMake.deleteOne({ _id: id });
    res.send(del_record);
  };



module.exports = {
    getMakes,
    getAllMakes,
    updateMake,
    createMake,
    deleteMake,
  };