import Joi from 'joi';

//signup validation
export const facultySignupValidation = async(req,res, next) =>{
    const schema = Joi.object({
        name: Joi.string().required().max(50).min(2),
        email: Joi.string().email().required().max(50).min(5),
        contact: Joi.string().required().min(10).max(10),
        institute: Joi.string().required(),
        department: Joi.string().required(),
        password: Joi.string().required().max(50).min(4),
    })

    const {error} = schema.validate(req.body);
    if(error){
        return res.status(401).json({
            message: "Bad Request!",
            error
        })
    }

    next();
}

//login validation
export const facultyLoginValidation = async (req, res, next) =>{
    // const schema = Joi.object({
    //     email: Joi.string().email().required(),
    //     password: Joi.string().required().min(4).max(50),
    // })
    const schema = Joi.object({
        identifier: Joi.string().required(),
        password: Joi.string().required().min(4).max(50),
    });


    const {error} = schema.validate(req.body);

    if(error){
        return res.status(401).json({
            message: "Bad Request!",
            error
        })
    }

    next();
}

