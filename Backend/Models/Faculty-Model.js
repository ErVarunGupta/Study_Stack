import mongoose from "mongoose";
const Schema = mongoose.Schema;

const facultySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contact:{
        type: String,
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
    password:{
        type: String, 
        required: true
    },
    category:{
        type: String,
        default: "faculty"
    },
})

const FacultyModel = mongoose.model('faculty', facultySchema);
export default FacultyModel;