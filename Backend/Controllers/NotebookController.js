import NotebookModel from "../Models/NotebookModel.js";
import jwt from 'jsonwebtoken';
import FacultyModel from "../Models/Faculty-Model.js";
import StudentModel from "../Models/Student-Model.js";
import dotenv from 'dotenv';
dotenv.config();


export const notebook = async (req, res)=>{
    try{
        const {department, semester, subject, pdfUrl, uploadDate} = req.body;

        if(!department|| !semester||!subject || !pdfUrl){
            return res.status(400).json({
                message: "department, semester, subject and pdfUrl fields are required!",
                success: false
            })
        }

        const authHeader = req.headers['authorization'];
        const token = authHeader;
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // 🔓 Decode token

        const faculty = await FacultyModel.findById(decoded.id).select('-password');
        const student = await StudentModel.findById(decoded.id).select('-password');


        const author = faculty || student; 
        
        const newNotebook = new NotebookModel({
            department, semester, subject, pdfUrl, uploadedBy : author._id, uploadDate
        })

        // console.log(newNotebook);//debug
   
        await newNotebook.save();

        return res.status(200).json({
            message: "Successfully Submitted!",
            success: true,
        });
        
    }catch(err){
        res.status(500).json({
            message: "Internal Server Error!",
            success: false,
        })
    }
}
