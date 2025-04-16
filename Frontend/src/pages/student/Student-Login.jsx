import React, { useState } from "react";
import {ToastContainer} from 'react-toastify';
import { useNavigate, Link } from "react-router-dom";
import {handleError, handleSuccess} from '../utils';
import './Student.css';

function Student_Login (){
    const[loginInfo, setLoginInfo] = useState({
        identifier: "", 
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e)=>{
        const {name, value} = e.target;
        const copyLoginInfo = {...loginInfo};
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }

    console.log(loginInfo);
    
    const handleLogin = async(e)=>{
        e.preventDefault();
        // const { email,registration_no, password} = loginInfo;
        const { identifier, password } = loginInfo;

        if (!identifier || !password) {
            return handleError("Please enter your email or registration number and password.");
        }
        

        try{
            const url = "http://localhost:8080/root/student-login";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            })
            const result = await response.json();
            console.log(result);
            const {success, message,token, name, error} = result;
            console.log(name);
            if(success){
                handleSuccess(message);
                localStorage.setItem('token',token);
                localStorage.setItem('loggedInUser', name);
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
             <h1>Student Login</h1>
            <form onSubmit={handleLogin}>
                <div className="student-login">
                    <div>
                        <label htmlFor="identifier">Email or Registration Number</label>
                        <input 
                        onChange={handleChange}
                        type="text" 
                        autoFocus
                        placeholder="Enter the email or registration number" 
                        name="identifier"
                        value={loginInfo.identifier}
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="password">Password</label>
                        <input 
                        onChange={handleChange}
                        type="password" 
                        placeholder="Enter the password"  
                        name="password"
                        value={loginInfo.password}
                        />
                    </div>
                </div>

                <button type="submit">Login</button>
                <span>Doesn't have an account?
                    <Link to="/student-signup" style={{color:"blue"}}> Signup</Link>
                </span>
            </form>

            <ToastContainer/>
        </div>
    );
}

export default Student_Login;