// models/Book.js
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  department: {
    type: String,
    trim: true
  },
  semester: {
    type: Number
  },
  pdfUrl: {
    type: String,
    required: true  // store file path or cloud URL
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: false
  },
  uploadDate: {
    type: Date,
    default: Date.now
  }
});

const BookModel = mongoose.model('Book', bookSchema);
export default BookModel;
