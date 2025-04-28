import React, { useState } from "react";
import { ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from '../utils';
import { IoArrowBackOutline } from "react-icons/io5";
import { FaBackward } from "react-icons/fa";
import ViewUser from "../view";
import { IoMdHome } from "react-icons/io";

function Write_Notebook() {
    const [notebookInfo, setNotebookInfo] = useState({
        department: '',
        semester: '',
        subject: '',
        pdfUrl: '',
        uploadedBy: '',
        uploadDate: Date.now()
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNotebookInfo(prev => ({ ...prev, [name]: value }));
    }

    const handleNotebook = async (e) => {
        e.preventDefault();
        const { department, semester, subject, pdfUrl } = notebookInfo;
        if (!department || !semester || !subject || !pdfUrl) {
            return handleError("Department, semester, subject, and PDF URL are required");
        }

        try {
            const token = localStorage.getItem('token');
            const url = "http://localhost:8080/stack/write/notebook";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify(notebookInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            } else if (error) {
                const details = error.details?.[0]?.message || message;
                handleError(details);
            } else {
                handleError(message);
            }
        } catch (err) {
            handleError(err.message || "Something went wrong");
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl">

                {/* Header with Back, Title, Home */}
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={() => navigate('/write')}
                        className="flex items-center gap-2 bg-gray-200 text-gray-800 hover:text-blue-600 px-4 py-2 rounded-lg transition cursor-pointer"
                    >
                        <IoArrowBackOutline className="text-lg"/>
                    </button>

                    <h1 className="text-xl md:text-2xl font-bold text-gray-800 text-center">Notebook Info</h1>

                    <button
                        onClick={() => navigate('/home')}
                        className="flex items-center gap-2 bg-gray-200 text-gray-800 hover:text-green-600 px-4 py-2 rounded-lg transition cursor-pointer"
                    >
                        <IoMdHome className="text-lg"/>
                    </button>
                </div>

                <form onSubmit={handleNotebook}>
                    <div className="space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="department" className="font-medium text-gray-600">Department</label>
                            <input
                                onChange={handleChange}
                                type="text"
                                placeholder="Enter the department"
                                name="department"
                                value={notebookInfo.department}
                                className="border border-gray-300 rounded-lg p-3"
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="semester" className="font-medium text-gray-600">Semester</label>
                            <input
                                onChange={handleChange}
                                type="text"
                                placeholder="Enter the semester"
                                name="semester"
                                value={notebookInfo.semester}
                                className="border border-gray-300 rounded-lg p-3"
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="subject" className="font-medium text-gray-600">Subject</label>
                            <input
                                onChange={handleChange}
                                type="text"
                                placeholder="Enter the subject"
                                name="subject"
                                value={notebookInfo.subject}
                                className="border border-gray-300 rounded-lg p-3"
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="pdfUrl" className="font-medium text-gray-600">PDF URL</label>
                            <input
                                onChange={handleChange}
                                type="text"
                                placeholder="Enter the PDF URL"
                                name="pdfUrl"
                                value={notebookInfo.pdfUrl}
                                className="border border-gray-300 rounded-lg p-3"
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="pdfUrl" className="font-medium text-gray-600">PDF FILE</label>
                            <input
                                onChange={handleChange}
                                type="file"
                                placeholder="Enter the PDF URL"
                                name="pdfUrl"
                                value={notebookInfo.pdfUrl}
                                className="border border-gray-300 rounded-lg p-3"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 mt-6 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>

            <ToastContainer />
            <ViewUser />

            {/* Footer */}
        </div>
    );
}

export default Write_Notebook;
