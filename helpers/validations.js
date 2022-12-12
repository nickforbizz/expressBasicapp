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
        description: Joi.string(),
    });
    let title = data.title;
    return schema.validate({title: title}); 
}


module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
module.exports.postValidation = postValidation