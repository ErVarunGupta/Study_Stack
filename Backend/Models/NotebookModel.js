// models/Notebook.js
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const notebookSchema = new Schema({
    department:{
        type: String,
        required: true
    },
    semester:{
        type: Number,
        required: true
    },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  pdfUrl: {
    type: String,
    required: true // Path or link to uploaded notebook PDF
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // If notebooks are user-specific
    required: false
  },
  uploadDate: {
    type: Date,
    default: Date.now
  }
});

const NotebookModel = mongoose.model('Notebook', notebookSchema);
export default NotebookModel;
