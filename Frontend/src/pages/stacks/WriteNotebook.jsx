import React, { useState } from "react";
import {ToastContainer} from 'react-toastify';
import { useNavigate, Link } from "react-router-dom";
import {handleError, handleSuccess} from '../utils';
import { IoArrowBackOutline } from "react-icons/io5";
import { FaBackward } from "react-icons/fa";
import './Home.css';

function Write_Notebook (){
    const[notebookInfo, setNotebookInfo] = useState({
        department: '',
        semester: '', 
        subject: '',
        pdfUrl: '',
        uploadedBy: '',
        uploadDate: Date.now()
    })

    const navigate = useNavigate();

    const handleChange = (e)=>{
        const {name, value} = e.target;
        const copyNotebookInfo = {...notebookInfo};
        copyNotebookInfo[name] = value;
        setNotebookInfo(copyNotebookInfo);
    }

    console.log(notebookInfo);
    
    const handleNotebook = async(e)=>{
        e.preventDefault();
        const {department, semester, subject, pdfUrl} = notebookInfo;
        if(!department || !semester || !subject || !pdfUrl ){
            return handleError("department, semester, subject and pdfUrl are required")
        }

        try{
            const token = localStorage.getItem('token');
            const url = "http://localhost:8080/stack/write/notebook";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify(notebookInfo)
            })
            const result = await response.json();
            console.log(result);
            const {success, message, error} = result;
            if(success){
                handleSuccess(message);
                setTimeout(()=>{
                    navigate('/home')
                },1000);
            }else if(error){
                const details = error.details[0].message;
                handleError(details);
            }else if(!success){
                handleError(message);
            }

            console.log(result);

        }catch(err){
            handleError(err);
        }
    }


    return (
        <div className="container">
             <h1>Notebook Info</h1>
            <form onSubmit={handleNotebook}>
                <div className="notebook-form">
                    <div >
                        <div>
                            <label htmlFor="department">Department</label>
                            <input 
                            onChange={handleChange}
                            type="text" 
                            autoFocus
                            placeholder="Enter the department" 
                            name="department"
                            value={notebookInfo.department}
                            />
                        </div>
                        <div>
                            <label htmlFor="semester">Semester</label>
                            <input 
                            onChange={handleChange}
                            type="text" 
                            autoFocus
                            placeholder="Enter the semester" 
                            name="semester"
                            value={notebookInfo.semester}
                            />
                        </div>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="subject">Subject</label>
                            <input 
                            onChange={handleChange}
                            type="text" 
                            autoFocus
                            placeholder="Enter the subject" 
                            name="subject"
                            value={notebookInfo.subject}
                            />
                        </div>
                        <div>
                            <label htmlFor="pdfUrl">PDF URL</label>
                            <input 
                            onChange={handleChange}
                            type="text" 
                            autoFocus
                            placeholder="Enter the pdfUrl" 
                            name="pdfUrl"
                            value={notebookInfo.pdfUrl}
                            />
                        </div>
                    
                    </div>
                </div>
                <button type="submit">Submit</button>
                
            </form>

             <div className="navigation-buttons">
                <div className="back-button" 
                        onClick={() => window.location.href = '/write'}
                        onMouseOver={(e) => e.target.style.color = "#2563EB"}
                        onMouseOut={(e) => e.target.style.color = "inherit"}>
                    <IoArrowBackOutline />
                    <span>
                        Back
                    </span>
                </div>
                <div className="home-button" 
                        onClick={() => window.location.href = '/'}
                        onMouseOver={(e) => e.target.style.color = "#059669"}
                        onMouseOut={(e) => e.target.style.color = "inherit"}>
                    <FaBackward />
                    <span>
                        Home
                    </span>
                </div>
            </div>
            
            <ToastContainer/>
        </div>
    )
}

export default Write_Notebook;