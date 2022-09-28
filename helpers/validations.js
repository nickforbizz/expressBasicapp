// Validation
const Joi = require('joi');

// Register User 
const registerValidation = data =>{
    const schema = Joi.object().keys({
        name: Joi.string().min(5).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
}


// Login User 
const loginValidation = data =>{
    const schema = Joi.object().keys({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
}


module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation