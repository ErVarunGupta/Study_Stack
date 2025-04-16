import FacultyModel from "../Models/Faculty-Model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

//signup controller
export const facultySignup = async (req, res)=>{
    try{
        const {name, email,contact, institute, department, password } = req.body;
        // console.log(req.body);//debug

        const faculty = await FacultyModel.findOne({
            $or: [{email},{contact}]
        });
        // console.log(faculty);//debug

        if(faculty){
            return res.status(403).json({
                message: "You are already registered!",
                success: false
            })
        }

        const hashedPass = await bcrypt.hash(password, 10);
        
        const newFaculty = new FacultyModel({
            name, email,contact, institute, department, password: hashedPass
        })
        // console.log(newFaculty);//debug

        await newFaculty.save();
        // console.log(saved);

        return res.status(200).json({
            message: "Signup successfully!",
            success: true,
        });
        
    }catch(err){
        res.status(500).json({
            message: "Internal Server Error!",
            success: false,
        })
    }
}

//login controller
export const facultyLogin = async (req, res)=>{
    try{
        const { identifier, password } = req.body;
        const faculty = await FacultyModel.findOne({
            $or: [{email: identifier}, {contact: identifier}]
        });
        const errMsg = "Authentication failed!, email or password is incorrect!"

        // console.log(req.body)//debug

        if(!faculty){
            return res.status(403).json({
                message: errMsg,
                success: false
            })
        }

        const isPassEqual = await bcrypt.compare(password, faculty.password);
        if(!isPassEqual){
            return res.status(403).json({
                message: errMsg,
                success: false
            })
        }

        const token = jwt.sign(
            { id: faculty._id, email: faculty.email },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );
        return res.status(200).json({
            message: "Login successfully!",
            success: true,
            name: faculty.name,
            email: faculty.email,
            contact: faculty.contact,
            institute: faculty.institute,
            department: faculty.department,
            token
        });
    }catch(err){
        res.status(500).json({
            message: "Internal Server Error!",
            success: false,
        })
    }
}
