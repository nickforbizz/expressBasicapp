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

// Post
const postValidation = data => {
    const schema = Joi.object().keys({
        title: Joi.string().min(3).required(),
        user_id: Joi.number().required(),
        description: Joi.string(),
    });
    let title = data.title;
    let user_id = data.user_id;
    return schema.validate({title: title, user_id}); 
}


// vehicleMakeValidation
const vehicleMakeValidation = data => {
    const schema = Joi.object().keys({
        title: Joi.string().min(3).required(),
        user_id: Joi.number().required(),
        description: Joi.string(),
    });
    let title = data.title;
    let user_id = data.user_id;
    return schema.validate({title: title, user_id}); 
}


// vehicleModelValidation
const vehicleModelValidation = data => {
    const schema = Joi.object().keys({
        title: Joi.string().min(3).required(),
        user_id: Joi.number().required(),
        vehicle_make_id: Joi.number().required(),
        description: Joi.string(),
    });
    let title = data.title;
    let user_id = data.user_id;
    let vehicle_make_id = data.vehicle_make_id;
    return schema.validate({title: title, user_id, vehicle_make_id}); 
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
module.exports.postValidation = postValidation
module.exports.vehicleMakeValidation = vehicleMakeValidation
module.exports.vehicleModelValidation = vehicleModelValidation