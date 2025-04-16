import React, { useState } from "react";
import {ToastContainer} from 'react-toastify';
import { useNavigate, Link } from "react-router-dom";
import {handleError, handleSuccess} from '../utils';
import { IoArrowBackOutline } from "react-icons/io5";
import { FaBackward } from "react-icons/fa";
import './Home.css';

function Write_Book (){
    const[bookInfo, setBookInfo] = useState({
        title: '',
        author: '', 
        department: '',
        semester: '',
        pdfUrl: '',
        uploadedBy: '',
        uploadDate: Date.now()
    })

    const navigate = useNavigate();

    const handleChange = (e)=>{
        const {name, value} = e.target;
        const copyBookInfo = {...bookInfo};
        copyBookInfo[name] = value;
        setBookInfo(copyBookInfo);
    }

    console.log(bookInfo);
    
    const handleBook = async(e)=>{
        e.preventDefault();
        const {title, author, department, semester, pdfUrl, uploadedBy, uploadDate} = bookInfo;
        if(!title || !author || !pdfUrl ){
            return handleError("title, author and pdfUrl are required")
        }

        try{
            const token = localStorage.getItem('token');
            const url = "http://localhost:8080/stack/write/book";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify(bookInfo)
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
             <h1>Book Info</h1>
            <form onSubmit={handleBook}>
                <div>
                    <div >
                        <div>
                            <label htmlFor="title">Title</label>
                            <input 
                            onChange={handleChange}
                            type="text" 
                            autoFocus
                            placeholder="Enter the title" 
                            name="title"
                            value={bookInfo.title}
                            />
                        </div>
                        <div>
                            <label htmlFor="author">Author Name</label>
                            <input 
                            onChange={handleChange}
                            type="text" 
                            autoFocus
                            placeholder="Enter the author name" 
                            name="author"
                            value={bookInfo.author}
                            />
                        </div>
                        <div>
                            <label htmlFor="department">Department</label>
                            <input 
                            onChange={handleChange}
                            type="text" 
                            autoFocus
                            placeholder="Enter the deapartment"
                            name="department" 
                            value={bookInfo.department}
                            />
                        </div>
                        
                        
                    </div>
                    <div >
                         <div>
                            <label htmlFor="semester">Semester</label>
                            <input 
                            onChange={handleChange}
                            type="text" 
                            placeholder="Enter the semester" 
                            name="semester"
                            value={bookInfo.semester}
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="pdfUrl">PDF URL</label>
                            <input 
                            onChange={handleChange}
                            type="text" 
                            placeholder="Enter the pdf url" 
                            name="pdfUrl"
                            value={bookInfo.pdfUrl}
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
    );
}

export default Write_Book;