// Validation
const Joi = require('joi');

// Register User 
const registerValidation = data =>{
    const schema = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string().min(3).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6),
    });
    // return schema.validate(data);
    let id = data.id;
    let name = data.name;
    let email = data.email;
    return schema.validate({id, name, email}); 
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


// productCategoryValidation
const productCategoryValidation = data => {
    const schema = Joi.object().keys({
        title: Joi.string().min(3).required(),
        user_id: Joi.number().required(),
        description: Joi.string(),
    });
    let title = data.title;
    let user_id = data.user_id;
    return schema.validate({title: title, user_id}); 
}


// productValidation
const productValidation = data => {
    const schema = Joi.object().keys({
        title: Joi.string().min(3).required(),
        user_id: Joi.number().required(),
        product_category_id: Joi.number().required(),
        vehicle_make_id: Joi.number().required(),
        vehicle_model_id: Joi.number().required(),
        description: Joi.string(),
    });
    let title = data.title;
    let user_id = data.user_id;
    let product_category_id = data.product_category_id;
    let vehicle_make_id = data.vehicle_make_id;
    let vehicle_model_id = data.vehicle_model_id;
    return schema.validate({title: title, user_id, product_category_id, vehicle_make_id, vehicle_model_id}); 
}


// soldProductValidation
const soldProductValidation = data => {
    const schema = Joi.object().keys({
        product_id: Joi.number().required(),
        user_id: Joi.number().required(),
        description: Joi.string(),
    });
    let product_id = data.product_id;
    let user_id = data.user_id;
    return schema.validate({product_id, user_id}); 
}


// parameterValidation
const parameterValidation = data => {
    const schema = Joi.object().keys({
        business_name: Joi.string().min(3).required(),
        business_id: Joi.string().required(),
        user_id: Joi.number().required(),
    });
    let business_name = data.business_name;
    let business_id = data.business_id;
    let user_id = data.user_id;
    return schema.validate({business_name, business_id, user_id}); 
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
module.exports.postValidation = postValidation
module.exports.vehicleMakeValidation = vehicleMakeValidation
module.exports.vehicleModelValidation = vehicleModelValidation
module.exports.productCategoryValidation = productCategoryValidation
module.exports.productValidation = productValidation
module.exports.soldProductValidation = soldProductValidation
module.exports.parameterValidation = parameterValidation