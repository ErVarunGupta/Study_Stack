import BookModel from "../Models/BookModel.js";
import NotebookModel from "../Models/NotebookModel.js";

export const findBooksAndNotebooks = async (req, res) => {
    try {
        const { department, semester, type } = req.query;

        if (!department || !semester) {
            return res.status(400).json({ 
                message: 'Department and semester are required',
                success: false
            });
        }

        let result;

        // Filter based on the type parameter
        if (type === 'book') {
            result = await BookModel.find({ department, semester });
        } else if (type === 'notebook') {
            result = await NotebookModel.find({ department, semester });
        } else {
            // If no type or invalid type, return both books and notebooks
            const books = await BookModel.find({ department, semester });
            const notebooks = await NotebookModel.find({ department, semester });
            result = { books, notebooks };
        }


        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
