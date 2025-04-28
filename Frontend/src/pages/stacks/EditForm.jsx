import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import { IoArrowBackOutline } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";

const EditForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        subject: '',
        department: '',
        semester: '',
        pdfUrl: '',
    });

    useEffect(() => {
        if (!data) {
            navigate('/home');
        } else {
            setFormData({
                title: data.title || '',
                author: data.author || '',
                subject: data.subject || '',
                department: data.department || '',
                semester: data.semester?.toString() || '',
                pdfUrl: data.pdfUrl || '',
            });
        }
    }, [data, navigate]);

    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const type = query.get('type');

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        const payload = type === 'book'
            ? {
                title: formData.title,
                author: formData.author,
                department: formData.department,
                semester: formData.semester,
                pdfUrl: formData.pdfUrl,
            }
            : {
                department: formData.department,
                semester: formData.semester,
                subject: formData.subject,
                pdfUrl: formData.pdfUrl,
            };

        try {
            const result = await fetch(`http://localhost:8080/action/edit/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
                body: JSON.stringify(payload),
            });

            const { success, message, error } = await result.json();

            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate(-1);
                }, 1000);
            } else if (error) {
                const details = error.details?.[0]?.message || message;
                handleError(details);
            } else {
                handleError(message);
            }
        } catch (err) {
            handleError("Something went wrong.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-3xl">

                {/* Header: Back | Title | Home */}
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 bg-gray-200 text-gray-800 hover:text-blue-600 px-4 py-2 rounded-lg transition cursor-pointer"
                    >
                        <IoArrowBackOutline className="text-lg"/>
                    </button>

                    <h1 className="text-xl md:text-2xl font-bold text-gray-800 text-center">
                        Edit {type === 'book' ? 'Book' : 'Notebook'} PDF
                    </h1>

                    <button
                        onClick={() => navigate('/home')}
                        className="flex items-center gap-2 bg-gray-200 text-gray-800 hover:text-green-600 px-4 py-2 rounded-lg transition cursor-pointer"
                    >
                        <IoMdHome className="text-lg"/>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {type === 'book' && (
                            <>
                                <div>
                                    <label className="block text-gray-700">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="Enter title"
                                        className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Author Name</label>
                                    <input
                                        type="text"
                                        name="author"
                                        value={formData.author}
                                        onChange={handleChange}
                                        placeholder="Enter author name"
                                        className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    />
                                </div>
                            </>
                        )}

                        {type === 'notebook' && (
                            <div>
                                <label className="block text-gray-700">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="Enter subject"
                                    className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-gray-700">Department</label>
                            <input
                                type="text"
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                placeholder="Enter department"
                                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700">Semester</label>
                            <input
                                type="text"
                                name="semester"
                                value={formData.semester}
                                onChange={handleChange}
                                placeholder="Enter semester"
                                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-gray-700">PDF URL</label>
                            <input
                                type="text"
                                name="pdfUrl"
                                value={formData.pdfUrl}
                                onChange={handleChange}
                                placeholder="Enter PDF URL"
                                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 mt-4 rounded-md hover:bg-blue-700 transition cursor-pointer"
                    >
                        Update
                    </button>
                </form>
            </div>

            <ToastContainer />
        </div>
    );
};

export default EditForm;
