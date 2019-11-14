//VALIDATION WITH @HAPI/JOI
const joi = require('@hapi/joi');

const registerValidation = data => {
    const schema = joi.object({
        name: joi.string().min(6).required(),
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).required()
    });
   return schema.validate(data);
};

const loginValidation = data => {
    const loginSchema = joi.object({
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).required()
    });
    return loginSchema.validate(data)
};



module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;

//Due to new version we should put the validation in a separete js file, 
//for more info read Hapi/Joi´s documentation