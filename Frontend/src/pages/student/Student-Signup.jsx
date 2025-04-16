import React, { useState } from "react";
import {ToastContainer} from 'react-toastify';
import { useNavigate, Link } from "react-router-dom";
import {handleError, handleSuccess} from '../utils';
import './Student.css';

function Student_Signup (){
    const[signupInfo, setSignupInfo] = useState({
        name: '',
        email: '', 
        institute: '',
        department: '',
        semester: '',
        registration_no: '',
        roll_no: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e)=>{
        const {name, value} = e.target;
        const copySignupInfo = {...signupInfo};
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }

    console.log(signupInfo);
    
    const handleSignup = async(e)=>{
        e.preventDefault();
        const {name, email,institute,department,semester,registration_no,roll_no, password} = signupInfo;
        if(!name|| !email||!password || !institute|| !department || !semester || !registration_no || !roll_no){
            return handleError("name, email, institute, department, semester, registration no., roll no. and password are required")
        }

        try{
            const url = "http://localhost:8080/root/student-signup";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
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
             <h1>Student Signup</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <div >
                        <div>
                            <label htmlFor="name">Name</label>
                            <input 
                            onChange={handleChange}
                            type="text" 
                            autoFocus
                            placeholder="Enter the name" 
                            name="name"
                            value={signupInfo.name}
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input 
                            onChange={handleChange}
                            type="text" 
                            autoFocus
                            placeholder="Enter the email" 
                            name="email"
                            value={signupInfo.email}
                            />
                        </div>
                        <div>
                            <label htmlFor="institute">Institute</label>
                            <input 
                            onChange={handleChange}
                            type="text" 
                            autoFocus
                            placeholder="Enter the institute" 
                            name="institute"
                            value={signupInfo.institute}
                            />
                        </div>
                        <div>
                            <label htmlFor="department">Department</label>
                            <input 
                            onChange={handleChange}
                            type="text" 
                            placeholder="Enter the department" 
                            name="department"
                            value={signupInfo.department}
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
                            value={signupInfo.semester}
                            />
                        </div>
                        <div>
                            <label htmlFor="registration_no">Registration Number</label>
                            <input 
                            onChange={handleChange}
                            type="text" 
                            placeholder="Enter the registration number" 
                            name="registration_no"
                            value={signupInfo.registration_no}
                            />
                        </div>
                        <div>
                            <label htmlFor="roll_no">Roll Number</label>
                            <input 
                            onChange={handleChange}
                            type="text" 
                            placeholder="Enter the roll number" 
                            name="roll_no"
                            value={signupInfo.roll_no}
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input 
                            onChange={handleChange}
                            type="password" 
                            placeholder="Enter the password"  
                            name="password"
                            value={signupInfo.password}
                            />
                        </div>
                    </div>
                </div>

                <button type="submit">Signup</button>
                <span>Already have an account?
                    <Link to="/student-login" style={{color:"blue"}}> Login</Link>
                </span>
            </form>

            <ToastContainer/>
        </div>
    );
}

export default Student_Signup;