import React, { useState } from "react";
import { ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from '../utils';
import { IoArrowBackOutline } from "react-icons/io5";
import { FaBackward } from "react-icons/fa";
import ViewUser from "../view";
import { IoMdHome } from "react-icons/io";

const URL = import.meta.env.VITE_URL || "http://localhost:8080";

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
            const url = `${URL}/stack/write/notebook`;
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
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 flex items-center justify-center p-6">
            <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-2xl border border-blue-100">

                {/* Top Bar: Back - Title - Home */}
                <div className="flex justify-between items-center mb-8">
                    <button
                        onClick={() => navigate('/write')}
                        className="flex items-center gap-2 text-gray-700 hover:text-blue-600 bg-gray-100 px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition"
                    >
                        <IoArrowBackOutline className="text-xl"/>
                    </button>

                    <h1 className="text-2xl md:text-3xl font-extrabold text-blue-700 text-center tracking-wide">Notebook Info</h1>

                    <button
                        onClick={() => navigate('/home')}
                        className="flex items-center gap-2 text-gray-700 hover:text-green-600 bg-gray-100 px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition"
                    >
                        <IoMdHome className="text-xl"/>
                    </button>
                </div>

                <form onSubmit={handleNotebook} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="department" className="block text-gray-700 font-semibold">Department</label>
                            <input
                                onChange={handleChange}
                                type="text"
                                placeholder="Enter the department"
                                name="department"
                                value={notebookInfo.department}
                                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
                            />
                        </div>
                        <div>
                            <label htmlFor="semester" className="block text-gray-700 font-semibold">Semester</label>
                            <input
                                onChange={handleChange}
                                type="text"
                                placeholder="Enter the semester"
                                name="semester"
                                value={notebookInfo.semester}
                                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="subject" className="block text-gray-700 font-semibold">Subject</label>
                            <input
                                onChange={handleChange}
                                type="text"
                                placeholder="Enter the subject"
                                name="subject"
                                value={notebookInfo.subject}
                                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="pdfUrl" className="block text-gray-700 font-semibold">PDF URL</label>
                            <input
                                onChange={handleChange}
                                type="text"
                                placeholder="Enter the PDF URL"
                                name="pdfUrl"
                                value={notebookInfo.pdfUrl}
                                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
                            />
                        </div>
                        {/* <div className="md:col-span-2">
                            <label htmlFor="pdf" className="block text-gray-700 font-semibold">PDF</label>
                            <input
                                onChange={handleChange}
                                type="file"
                                placeholder="Enter the PDF file"
                                name="pdf"
                                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
                            />
                        </div> */}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-green-500 text-white py-3 mt-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-green-600 shadow-lg transition"
                    >
                        Submit
                    </button>
                </form>

                <ToastContainer />
                <ViewUser />

            </div>
        </div>
    );
}

export default Write_Notebook;
