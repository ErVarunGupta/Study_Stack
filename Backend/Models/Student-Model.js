import mongoose from "mongoose";

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    institute: {
        type: String,
        required: true
    },
    department:{
        type: String,
        required: true
    },
    semester:{
        type: Number,
        required: true
    },
    registration_no:{
        type: String,
        required: true
    },
    roll_no:{
        type: String,
        required: true
    },
    password:{
        type: String, 
        required: true
    }
})

const StudentModel = mongoose.model('student', studentSchema);
export default StudentModel;