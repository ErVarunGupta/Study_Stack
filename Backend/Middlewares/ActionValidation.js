import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import BookModel from "../Models/BookModel.js";
import NotebookModel from "../Models/NotebookModel.js";

export const actionValidation = async (req, res, next) => {
    const token = req.headers["authorization"]; 
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized!",
            success: false,
        });
    } 

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token!",
            success: false,
        });
    }

    const { id } = req.params;
    try{
        const book = await BookModel.findById(id).lean(); 
        const notebook = await NotebookModel.findById(id).lean();

        if (!book && !notebook) {
            return res.status(404).json({
                message: "No document found with this ID",
                success: false,
            });
        }

        const uploadedBy = book?.uploadedBy || notebook?.uploadedBy;

        if (req.user.id !== uploadedBy.toString()) {
            return res.status(403).json({
                message: "You are not authorized to access this resource.",
                success: false,
            });
        }
        console.log("validatation completed");
        next();
    }catch(err){
        return res.status(500).json({
            message: "Server error while validating resource",
            success: false,
            error: err.message,
        });
    }

}