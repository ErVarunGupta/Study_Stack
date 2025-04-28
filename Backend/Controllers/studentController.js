import StudentModel from "../Models/Student-Model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

//signup controller
export const studentSignup = async (req, res)=>{
    try{
        const {name, email, institute, department,semester,registration_no, roll_no, password } = req.body;

        const student = await StudentModel.findOne({
            $or: [{ email }, { registration_no }]
        });
        
        if(student){
            return res.status(403).json({
                message: "You are already registered!",
                success: false
            })
        }

        const hashedPass = await bcrypt.hash(password, 10);
        
        const newStudent = new StudentModel({
            name, email, institute, department, semester, registration_no, roll_no, password: hashedPass
        })

        const saved = await newStudent.save();

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
export const studentLogin = async (req, res)=>{
    try{
        
        const { identifier, password } = req.body;
        

        const student = await StudentModel.findOne({
            $or: [{ email: identifier}, { registration_no: identifier }]
        });

        const errMsg = "Authentication failed!, email, registration number or password is incorrect!"

        if(!student){
            return res.status(403).json({
                message: errMsg,
                success: false
            })
        }
 
        const isPassEqual = await bcrypt.compare(password, student.password);
        if(!isPassEqual){
            return res.status(403).json({
                message: errMsg,
                success: false
            })
        }

        const token = await jwt.sign(//change email to identifier
            { id: student._id, identifier: student.email || student.registration_no },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );
        return res.status(200).json({
            message: "Login successfully!",
            success: true,
            name: student.name,
            email: student.email,
            institute: student.institute,
            department: student.department,
            semester: student.semester,
            registration_no: student.registration_no,
            roll_no: student.roll_no,
            category: student.category,
            token
        });
    }catch(err){
        res.status(500).json({
            message: "Internal Server Error!",
            success: false,
        })
    }
}
