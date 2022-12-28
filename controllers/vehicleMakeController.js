const { Logger } = require('winston');
const { vehicleMakeValidation } = require('../helpers/validations');
const VehicleMake = require('../models/VehicleMake');





/**
 * Fetch Active VehicleMake Records
 * @param {*} req
 * @param {*} res
 */
const getMakes = async (req, res) => {
  let records = await VehicleMake.findAll({where: {active: 1}});
  res.send(records);
};





/**
 * Fetch All VehicleMake Records
 * @param {*} req
 * @param {*} res
 */
const getAllMakes = async (req, res) => {
  let records = await VehicleMake.findAll();
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

        try {
        let new_record = await create(data);

        if (new_record) {
            return res.json({
                status: 'success',
                message: 'record saved successfuly',
                data: savedRecord
            });
            
        } else {
            return res.json({
                status: 'error',
                message: 'error saving record',
            });
        }
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
    let data = req.body;
    let id = data?.id;
    if (!id) return res.status(400).send(`Record ID is required`);
    
    // check if user in db
    let record = await VehicleMake.findByPk(id);
    if (!record) return res.status(400).send(`Record with Id: ${id} not found`);

    let patched_record = await User.update( data, {
        where: { id: user_id }
      });
    res.send(patched_record);
};




/**
 * Delete VehicleMake Record
 * @param {*} req
 * @param {*} res
 */
const deleteMake = async (req, res) => {
    let id = req.params.id;
  
    // Delete the document by its _id
    let del_record = await VehicleMake.destroy({
        where: { id: id }
      });
    res.send(del_record);
  };



module.exports = {
    getMakes,
    getAllMakes,
    updateMake,
    createMake,
    deleteMake,
  };