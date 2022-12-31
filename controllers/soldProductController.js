const Logger = require('../services/logger');
const { soldProductValidation } = require('../helpers/validations');
const SoldProduct = require('../models/SoldProduct');





/**
 * Fetch Active SoldProduct Records
 * @param {*} req
 * @param {*} res
 */
const getSoldProducts = async (req, res) => {
  let records = await SoldProduct.findAll();
  res.send(records);
};





/**
 * Fetch All SoldProduct Records
 * @param {*} req
 * @param {*} res
 */
const getAllSoldProducts = async (req, res) => {
  let records = await SoldProduct.findAll({active: 1});
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


    try {
        let new_record = await SoldProduct.create(data);
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
 * Update SoldProduct Record
 * @param {*} req
 * @param {*} res
 */
const updateSoldProduct = async (req, res) => {
    let data = req.body;
    let id = data?.id;
    if (!id) return res.status(400).send(`Record ID is required`);

    // check if user in db
    let record = await SoldProduct.findByPk(id);
    if (!record) return res.status(400).send(`Record with Id: ${id} not found`);

    let patched_record = await SoldProduct.update(data, {
        where: { id: id },
    });
    res.send(patched_record);
};




/**
 * Delete SoldProduct Record
 * @param {*} req
 * @param {*} res
 */
const deleteSoldProduct = async (req, res) => {
    let id = req.params.id;

    // Delete the document by its _id
    let del_record = await SoldProduct.destroy({
        where: { id: id },
    });
    res.send(del_record);
  };



module.exports = {
    getSoldProducts,
    getAllSoldProducts,
    updateSoldProduct,
    createSoldProduct,
    deleteSoldProduct,
  };