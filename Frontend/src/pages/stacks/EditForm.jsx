import { useParams, useNavigate } from 'react-router-dom';
import {useEffect, useState } from 'react';
import {handleError, handleSuccess} from '../utils';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './EditForm.css';
import { IoArrowBackOutline } from "react-icons/io5";
import { FaBackward } from "react-icons/fa";

const EditForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();


    const location = useLocation();
    const data = location.state;

    // console.log("Received data:", data);    //debugging line

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
            navigate('/home'); // fallback redirect
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

        // Build payload depending on type
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

        const result = await fetch(`http://localhost:8080/action/edit/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            },
            body: JSON.stringify(payload),
        });


        const { success, message, error } = await result.json();
       
        if(success){
            handleSuccess(message);
            setTimeout(() => {
            navigate(-1); // Navigate to the previous page after success
            }, 1000);
        }
        if(error){
            const details = error.details[0].message;
            handleError(details);
        }
        if(!success){
            handleError(message);
        }

        
    };

    return (
        <div className="container edit-form">
            <form onSubmit={handleSubmit}>
                <h1>Edit {type === 'book' ? 'Book' : 'Notebook'} PDF</h1>
                <div>
                    <div className='left'>
                        {type === 'book' && (
                            <>
                                <div className='info'>
                                    <label htmlFor="title">Title</label>
                                    <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Enter the title" />
                                </div>
                                <div className='info'>
                                    <label htmlFor="author">Author Name</label>
                                    <input type="text" name="author" value={formData.author} onChange={handleChange} placeholder="Enter the author" />
                                </div>
                            </>
                        )}

                        {type === 'notebook' && (
                            <>
                                <div className='info'>
                                    <label htmlFor="subject">Subject</label>
                                    <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Enter the subject" />
                                </div>
                            </>
                        )}

                        <div className='info'>
                            <label htmlFor="department">Department</label>
                            <input type="text" name="department" value={formData.department} onChange={handleChange} placeholder="Enter department" />
                        </div>
                    </div>
                    <div className='right'>
                        <div className='info'>
                            <label htmlFor="semester">Semester</label>
                            <input type="text" name="semester" value={formData.semester} onChange={handleChange} placeholder="Enter the semester" />
                        </div>
                        <div className='info'>
                            <label htmlFor="pdfUrl">PDF URL</label>
                            <input type="text" name="pdfUrl" value={formData.pdfUrl} onChange={handleChange} placeholder=" Enter PDF URL" />
                        </div>
                    </div>
                </div>
                <button type="submit">Update</button>
            </form>

             <div className="navigation-buttons">
                <div className="back-button" onClick={() => {
                    if (window.history.length > 2) {
                        navigate(-1);
                    } else {
                        navigate('/');
                    }
                }}>
                    <IoArrowBackOutline />
                    <span>Back</span>
                </div>
                <div className="home-button" onClick={() => window.location.href = '/home'}>
                    <FaBackward />
                    <span >
                        Home
                    </span>
                </div>
            </div>

            <ToastContainer/>
        </div>
    );
};

export default EditForm;
