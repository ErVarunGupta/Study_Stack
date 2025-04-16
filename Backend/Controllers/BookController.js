import BookModel from "../Models/BookModel.js";
import jwt from 'jsonwebtoken';
import FacultyModel from "../Models/Faculty-Model.js";
import StudentModel from "../Models/Student-Model.js";
import dotenv from 'dotenv';
dotenv.config();

export const book = async (req, res)=>{
    try{
        const {title, author, department, semester, pdfUrl, uploadDate} = req.body;
        // console.log(req.body);//debug

        if(!title || !author || !pdfUrl){
            return res.status(400).json({
                message: "title, author and pdfUrl fields are required!",
                success: false
            })
        }

        const authHeader = req.headers['authorization'];
        const token = authHeader;
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // 🔓 Decode token

        const faculty = await FacultyModel.findById(decoded.id).select('-password');
        const student = await StudentModel.findById(decoded.id).select('-password');


        const auth = faculty || student; 
        
        const newBook = new BookModel({
            title, author, department, semester, pdfUrl, uploadedBy : auth._id, uploadDate
        })
        // console.log(newFaculty);//debug

        await newBook.save();
        // console.log(saved);

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