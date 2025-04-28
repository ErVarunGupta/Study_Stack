import FacultyModel from "../Models/Faculty-Model.js";
import StudentModel from "../Models/Student-Model.js";

export const viewUser = async (req, res)=>{
    const { id } = req.params;
    try{
        const faculty = await FacultyModel.findById(id).lean();
        const student = await StudentModel.findById(id).lean();

        if(!faculty && !student){
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }

        let user;
        if (faculty) {
            user = {
            name: faculty.name,
            email: faculty.email,
            contact: faculty.contact,
            institute: faculty.institute,
            department: faculty.department,
            category: faculty.category,
            };
        } else {
            user = {
            name: student.name,
            email: student.email,
            institute: student.institute,
            department: student.department,
            semester: student.semester,
            registrationNumber: student.registration_no,
            roll_no: student.roll_no,
            category: student.category,
            };
        }

        return res.status(200).json({
            message: "User found",
            success: true,
            user,
        });

    }catch(err){
        return res.status(500).json({
            message: "Server error while validating resource",
            success: false,
            error: err.message,
        });
    }
}