import React,{ use, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './AllMaterials.css'; // reuse the card CSS
import HandleLogout from '../HandleLogout';
import { ToastContainer } from 'react-toastify';
import { IoArrowBackOutline } from "react-icons/io5";
import { FaBackward } from "react-icons/fa";
import {handleError, handleSuccess} from '../utils';
import { useNavigate } from 'react-router-dom';

function SearchResult() {
    const location = useLocation();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    // Extract query params
    const query = new URLSearchParams(location.search);
    const department = query.get('department');
    const semester = query.get('semester');
    const type = query.get('type');

    useEffect(() => {
        if (department && semester && type) {
            axios
                .get(`http://localhost:8080/stack/read/search`, {
                    params: { department, semester, type },
                })
                .then((res) => {
                    setData(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [department, semester, type]);

    //logout
    const [loggedInUser, setLoggedInUser] = useState('');
    useEffect(() =>{
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    },[loggedInUser]);



    // edit handle
    const editHandle = async (id) => {
        try{
            const type = query.get('type');
            const token = localStorage.getItem('token');

            const url = `http://localhost:8080/action/edit/${id}`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            });
            const result = await response.json();
            // console.log(result);
            const {success, message, error} = result;
            if(success){
                handleSuccess(message);
                setTimeout(() => {
                    navigate(`/action/edit/${id}?type=${type}`, { state: result.data }); 
                }, 1000);
            }else if(error){
                handleError(error.details?.[0]?.message || "An error occurred");
            }else{
                handleError(message);
            }
        }catch(err){
            handleError(err.message || "An unexpected error occurred");
        }
        
    }

    // delete handle
    const deleteHandle = async(id) =>{
        try{
            
            const token = localStorage.getItem('token');
            console.log(token);
            console.log(id);
            const url = `http://localhost:8080/action/delete/${id}`;
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            });
            const result = await response.json();
            console.log(result);
            const {success, message, error} = result;
            if(success){
                handleSuccess(message);
                setData(data.filter(item => item.id !== id));
                setTimeout(() => {
                    window.location.reload(); // 🔄 hard refresh after a short delay
                }, 1000);
            }else if(error){
                handleError(error.details?.[0]?.message || "An error occurred");
            }else{
                handleError(message);
            }
        }catch(err){
            handleError(err.message || "An unexpected error occurred");
        }
    }

    //uploader name handle
    const [uploader, setUploader] = useState({});

    const fetchUser = async (userId) => {
        const token = localStorage.getItem('token');
        const url = `http://localhost:8080/root/${userId}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        })
        const result = await response.json();
        console.log(result);   //debugging
        return result.name;
    }

    useEffect(() => {
        const loadUsernames = async () => {
            const uniqueUploaderIds = [...new Set(data.map(item => item.uploadedBy))];
    
            const usernameMap = {};
            await Promise.all(
                uniqueUploaderIds.map(async (uploaderId) => {
                    const name = await fetchUser(uploaderId);
                    usernameMap[uploaderId] = name;
                })
            );
            // console.log(usernameMap);
            setUploader(usernameMap);
        };
    
        if (data.length > 0) {
            loadUsernames();
        }
    }, [data]);
    


    return (

        <div className="pdf-container">
            <div className='pdf-header' >
                <button className="back-button" onClick={() => navigate(-1)}>
                    <IoArrowBackOutline className="icon" /> Back
                </button>
                <h2>{type.charAt(0).toUpperCase() + type.slice(1)}s for {department} - Semester {semester}</h2>
                <button className="home-button" onClick={() => window.location.href = '/'}>
                    <FaBackward className="icon" /> Home
                </button>
            </div>
            <div className='hero-section'>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="pdf-grid" >
                    {data.length > 0 ? (
                        data.map((item, idx) => (
                            <div className="pdf-card" key={idx}>
                                <img
                                    src={item.imageUrl || 'https://cdn.pixabay.com/photo/2014/09/05/18/32/old-books-436498_1280.jpg'}
                                    alt="PDF"
                                    className="pdf-thumbnail"
                                />
                                <h3 className="pdf-title">{item.title}</h3>
                                <h3 className="pdf-subject">{item.subject}</h3>
                                <p>Uploaded By: {uploader[item.uploadedBy] || "Loading..."}</p>
                                <button
                                    className="view-button"
                                    onClick={() => window.open(item.pdfUrl, '_blank')}
                                >
                                    View
                                </button>
                                <div className='edit-delete-btn'>
                                    <button 
                                        className='edit' 
                                        onClick={() => editHandle(item._id)}
                                    >edit</button>
                                    <button 
                                        className='delete' 
                                        onClick={() => deleteHandle(item._id)}
                                    >delete</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No results found.</p>
                    )}
                </div>
            )}
            
            </div>
            <div className='pdf-footer'>
                <HandleLogout loggedInUser={loggedInUser}/>
                <ToastContainer/>
            </div>
        </div>
    );
}

export default SearchResult;











