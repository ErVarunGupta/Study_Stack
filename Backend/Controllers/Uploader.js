import FacultyModel from "../Models/Faculty-Model.js";
import StudentModel from "../Models/Student-Model.js";


export const getUser = async(req, res)=>{
    const {userId} = req.params.id;
    const faculty = await FacultyModel.findById(userId);

    if(faculty){
        try{
            res.status(200).json({
                message: "Faculty found",
                success: true,
                data: faculty
            })
        }catch(error){
            res.status(500).json({
                message: "Internal server error",
                success: false,
            })
        }
    }

    const student = await StudentModel.findById(userId);
    if(student){
        try{
            res.status(200).json({
                message: "Student found",
                success: true,
                data: student
            })
        }catch(error){
            res.status(500).json({
                message: "Internal server error",
                success: false,
            })
        }
    }
}