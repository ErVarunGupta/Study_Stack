import './Home.css';
import './Read.css';
import React,{useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HandleLogout from '../HandleLogout.jsx';
import { ToastContainer } from 'react-toastify';
import { IoArrowBackOutline } from "react-icons/io5";
import { FaBackward } from "react-icons/fa";

function Read() {
    const [department, setDepartment] = useState('');
    const [semester, setSemester] = useState('');
    const navigate = useNavigate();

    const [loggedInUser, setLoggedInUser] = React.useState('');
    useEffect(() =>{
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    },[loggedInUser]);

    const handleSearch = () => {
        if (department && semester) {
            navigate(`/read/seen?department=${department}&semester=${semester}`);
        } else {
            alert('Please select both department and semester.');
        }
    };

    return (
        <div>
        <div className="container">
            <h1>Select Department and Semester</h1>

            <div className="dropdown">
                <select
                    id="departmentSelect"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                >
                    <option value="" disabled>
                        Choose Department
                    </option>
                    <option value="CSE">CSE</option>
                    <option value="Civil">Civil</option>
                    <option value="EEE">EEE</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Electrical">Electrical</option>
                    <option value="CSE_IOT">CSE (IoT)</option>
                    <option value="Electronics">Electronics</option>
                    <option value="IT">IT</option>
                    <option value="FireTech">Fire Technology</option>
                </select>
            </div>

            <div id="semesterSection" className="semester-section">
                <select
                    id="semesterSelect"
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                >
                    <option value="" disabled>
                        Choose Semester
                    </option>
                    <option value="1">1 Semester</option>
                    <option value="2">2 Semester</option>
                    <option value="3">3 Semester</option>
                    <option value="4">4 Semester</option>
                    <option value="5">5 Semester</option>
                    <option value="6">6 Semester</option>
                    <option value="7">7 Semester</option>
                    <option value="8">8 Semester</option>
                </select>
            </div>

            <button className="seen-btn" onClick={handleSearch}>
                Seen
            </button>
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
            <HandleLogout loggedInUser={loggedInUser}/>
            <ToastContainer />
        
        </div>
    );
}

export default Read;