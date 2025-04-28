import FacultyModel from "../Models/Faculty-Model.js";
import StudentModel from "../Models/Student-Model.js";

export const editUser = async (req, res)=>{
    const { id } = req.params;
    const { name, email, contact, institute, department, semester, registration_no, roll_no } = req.body;
    try{
        const faculty = await FacultyModel.findById(id).lean();

        if(faculty){
            const updatedFaculty = await FacultyModel.findByIdAndUpdate(id, {
                name, 
                email,
                contact,
                institute,
                department
            },{new: true})
            console.log(updatedFaculty);
            return res.status(200).json({
                message: "Updated successfully",
                success: true,
                data: updatedFaculty,
            })
        }
        const student = await StudentModel.findById(id).lean();

        if(student){
            const updatedStudent = await StudentModel.findByIdAndUpdate(id, {
                name,
                email,
                institute,
                department,
                semester,
                registration_no,
                roll_no
            },{new: true})
            console.log(updatedStudent);
            return res.status(200).json({
                message: "Updated successfully",
                success: true,
                data: updatedStudent,
            })
        }

        return res.status(404).json({
            message: "User not found",
            success: false,
        });
    }
    catch(err){
        return res.status(500).json({
            message: "Server error while validating resource",
            success: false,
            error: err.message,
        });
    }
}