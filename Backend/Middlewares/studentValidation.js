import Joi from 'joi';

//signup validation

export const studentSignupValidation = async(req,res, next) =>{
    const schema = Joi.object({
        name: Joi.string().required().max(50).min(2),
        email: Joi.string().email().required().max(50).min(5),
        institute: Joi.string().required(),
        department: Joi.string().required(),
        semester: Joi.number().required(),
        registration_no: Joi.string().required(),
        roll_no: Joi.string().required(),
        password: Joi.string().required().max(50).min(4),
    })
    // console.log(req.body);

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

export const studentLoginValidation = async (req, res, next) =>{
    // const schema = Joi.object({
    //     email: Joi.string().email(),
    //     registration_no: Joi.alternatives().try(
    //         Joi.string(),
    //         Joi.number()
    //     ),
    //     password: Joi.string().required().min(4).max(50),
    // }).or('email', 'registration_no'); // require at least one
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