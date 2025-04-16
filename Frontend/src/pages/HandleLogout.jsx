

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from './utils';


function HandleLogout({loggedInUser}) {
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('token');
        handleSuccess('Logout successful!');
        setTimeout(() => {
            navigate('/');
        }, 1000);
    };

    return (
        <div style={{marginTop: "20px", textAlign: "center"}}>
            <button 
            onClick={handleLogout} 
            style={{background:"#FF4D4F", color:"#fff"}}  
            className='logout'
            onMouseOver={(e) => e.target.style.background = "#FF7875"}
            onMouseOut={(e) => e.target.style.background = "#FF4D4F"}
            >
            Logout
            </button>
        </div>
        );
}

export default HandleLogout;