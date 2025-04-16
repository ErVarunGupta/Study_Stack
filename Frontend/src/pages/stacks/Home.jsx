import React, {useState, useEffect } from 'react';

import { ToastContainer } from 'react-toastify';
import './Home.css';
import HandleLogout from '../HandleLogout.jsx';

function Home() {
    const [loggedInUser, setLoggedInUser] = React.useState('');
    useEffect(() =>{
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    },[loggedInUser]);
    
    
    
    return (
        <div className="container home-container">
            <h1>Welcome to the Study Stack!</h1>
            <h2>username: @{loggedInUser.toLowerCase()}</h2>

            <div className="home">
                <button className="write-btn" onClick={() => window.location.href = '/write'}>Write</button>
                <button className="read-btn" onClick={() => window.location.href = '/read'}>Read</button>
            </div>

            {/* <button onClick={handleLogout} style={{background:"#FF4D4F", color:"#fff"}}>Logout</button> */}
            <HandleLogout loggedInUser={loggedInUser}/>
            <ToastContainer /> 
        </div>
    )
}

export default Home;