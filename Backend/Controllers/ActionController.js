import BookModel from "../Models/BookModel.js";
import NotebookModel from "../Models/NotebookModel.js";

export const EditPdf = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, department, semester, subject, pdfUrl } = req.body;

        // Check if the document is a Book
        const bookExists = await BookModel.findById(id);
        
        if (bookExists) {
            const updatedBook = await BookModel.findByIdAndUpdate(id, {
                title,
                author,
                department,
                semester,
                pdfUrl,
            }, { new: true });

            return res.status(200).json({
                message: "Book PDF updated successfully",
                success: true,
                data: updatedBook,
            });
        }

        // Check if the document is a Notebook
        const notebookExists = await NotebookModel.findById(id);
        if (notebookExists) {
            const updatedNotebook = await NotebookModel.findByIdAndUpdate(id, {
                department,
                semester,
                subject,
                pdfUrl,
            }, { new: true });

            return res.status(200).json({
                message: "Notebook PDF updated successfully",
                success: true,
                data: updatedNotebook,
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
}


export const DeletePdf = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await BookModel.findByIdAndDelete(id);
        const notebook = await NotebookModel.findByIdAndDelete(id);
        if (!book && !notebook) {
            return res.status(404).json({
                message: "Item not found",
                success: false,
            })
        }
        res.status(200).json({
            message: "Item deleted successfully",
            success: true,
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
        })
    }
}


export const GetPdf = async (req, res) =>{
    const { id } = req.params;

    const book = await BookModel.findById(id);
    const notebook = await NotebookModel.findById(id);

    if (!book && !notebook) {
        return res.status(404).json({
            message: "Item not found",
            success: false,
        })
    }

    res.status(200).json({
        message: "Item fetched successfully",
        success: true,
        data: book || notebook,
    })

}