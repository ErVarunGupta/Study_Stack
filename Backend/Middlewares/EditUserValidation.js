import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import FacultyModel from "../Models/Faculty-Model.js";
import StudentModel from "../Models/Student-Model.js";

export const userEditValidation = async (req, res, next) => {
    const token = req.headers["authorization"];
    if(!token){
        return res.status(401).json({
            message: "Unauthorized!",
            success: false,
        });
    }
    const id = req.params.id;

    try{
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const loginID = decodedToken.id;
        if(loginID !== id){
            return res.status(403).json({
                message: "You are not authorized to edit this user!",
                success: false,
            });
        }

    }catch(err){
        return res.status(401).json({
            message: "Invalid or expired token!",
            success: false,
        });
    }

    const faculty = await FacultyModel.findById(id).lean();
    if(faculty){
        const { name, email, contact, institute, department } = req.body;
        if(!name || !email || !contact || !institute || !department){
            return res.status(400).json({
                message: "Please provide all the fields",
                success: false,
            });
        }
    }
    const student  = await StudentModel.findById(id).lean();
    if(student){
        const { name, email, institute, department, semester, registration_no } = req.body;
        if(!name || !email || !institute || !department || !semester || !registration_no){
            return res.status(400).json({
                message: "Please provide all the fields",
                success: false,
            });
        }
    }

    console.log("Validation complete");
    next();
}