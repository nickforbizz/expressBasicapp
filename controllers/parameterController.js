const { Logger } = require('winston');
const { parameterValidation } = require('../helpers/validations');
const Parameter = require('../models/Parameter.js');





/**
 * Fetch Active Parameter Records
 * @param {*} req
 * @param {*} res
 */
const getParameters = async (req, res) => {
  let records = await Parameter.find();
  res.send(records);
};





/**
 * Fetch All Parameter Records
 * @param {*} req
 * @param {*} res
 */
const getAllParameters = async (req, res) => {
  let records = await Parameter.find({active: 1});
  res.send(records);
};




/**
 * Create Parameter Record
 * @param {*} req
 * @param {*} res
 */
const createParameter = async (req, res) => {
    let data = req.body;
    const { error } = parameterValidation(data);
    if (error)
        return res.status(400).json({
        status: 'error',
        message: error.details[0].message,
        });

    let new_record = await new Parameter(data);

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
 * Update Parameter Record
 * @param {*} req
 * @param {*} res
 */
const updateParameter = async (req, res) => {
    let records = await Parameter.find();
    res.send(records);
};




/**
 * Delete Parameter Record
 * @param {*} req
 * @param {*} res
 */
const deleteParameter = async (req, res) => {
    let data = req.body;
    let id = req.params.id;
  
    // Delete the document by its _id
    let del_record = await Parameter.deleteOne({ _id: id });
    res.send(del_record);
  };



module.exports = {
    getParameters,
    getAllParameters,
    updateParameter,
    createParameter,
    deleteParameter,
  };