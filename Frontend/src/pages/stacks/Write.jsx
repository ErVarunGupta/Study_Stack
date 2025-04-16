import './Home.css';
import HandleLogout from '../HandleLogout';
import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { IoArrowBackOutline } from "react-icons/io5";
import { FaBackward } from "react-icons/fa";

function Write(){

    const [loggedInUser, setLoggedInUser] = React.useState('');
    useEffect(() =>{
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    },[loggedInUser]);

    return (
        <div>
            <div className="container write-container">
                <h1>What do you add?</h1>
                <h2>username: @{loggedInUser.toLowerCase()}</h2>
                <button style={{ background: "#1D4ED8", color: "#fff" }} onClick={() => window.location.href = '/write/book'}>Book</button>
                <button style={{ background: "#10B981", color: "#fff" }} onClick={() => window.location.href = '/write/notebook'}>Notebook</button>
            </div>
            <div className="navigation-buttons">
                <div className="back-button" 
                        onClick={() => window.location.href = '/home'}
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
            <HandleLogout loggedInUser={loggedInUser} />
            <ToastContainer />
        </div>
    )
}

export default Write;