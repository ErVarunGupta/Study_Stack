import './Read.css';
import { useLocation, useNavigate } from 'react-router-dom';
import React, {useState, useEffect } from 'react';
import HandleLogout from '../HandleLogout.jsx';
import { ToastContainer } from 'react-toastify';
import { IoArrowBackOutline } from "react-icons/io5";
import { FaBackward } from "react-icons/fa";

function ReadSeen() {

    const [loggedInUser, setLoggedInUser] = React.useState('');
    useEffect(() =>{
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    },[loggedInUser]);


    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const department = queryParams.get('department');
    const semester = queryParams.get('semester');

    const handleNavigation = (type) => {
        navigate(`/read/search?department=${department}&semester=${semester}&type=${type}`);
    };

    const fetchData = async (type) => {
        try {
            const response = await fetch(`/read/search?department=${department}&semester=${semester}&type=${type}`);
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Fetch data when the component mounts
    useEffect(() => {
        fetchData();
    }, [department, semester]);

    return (
        <div>
            <div className="container write-container">
                <h1>What do you want to read?</h1>
                <button
                    className='book-btn'
                    style={{ background: "#1D4ED8", color: "#fff" }}
                    onClick={() => handleNavigation('book')}
                    onMouseOver={(e) => e.target.style.background = "#2563EB"}
                    onMouseOut={(e) => e.target.style.background = "#1D4ED8"}
                >
                    Book
                </button>
                <button
                    className='notebook-btn'
                    style={{ background: "#10B981", color: "#fff" }}
                    onClick={() => handleNavigation('notebook')}
                    onMouseOver={(e) => e.target.style.background = "#059669"}
                    onMouseOut={(e) => e.target.style.background = "#10B981"}
                >
                    Notebook
                </button>
            </div>

            <div className="navigation-buttons">
                <div className="back-button" 
                     onClick={() => window.location.href = '/read'}
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
    );
}

export default ReadSeen;
