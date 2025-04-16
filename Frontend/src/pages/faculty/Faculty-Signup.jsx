import React, { useState } from "react";
import {ToastContainer} from 'react-toastify';
import { useNavigate, Link } from "react-router-dom";
import {handleError, handleSuccess} from '../utils';
import './Faculty.css';

function Faculty_Signup (){
    const[signupInfo, setSignupInfo] = useState({
        name: '',
        email: '', 
        contact:'',
        institute: '',
        department: '',
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
        const {name, email, contact, institute,department, password} = signupInfo;
        if(!name|| !email|| !contact|| !password || !institute|| !department ){
            return handleError("name, email,contact no., institute, department, and password are required")
        }

        try{
            const url = "http://localhost:8080/root/faculty-signup";
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
             <h1>Faculty Signup</h1>
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
                            <label htmlFor="contact">Contact No.</label>
                            <input 
                            onChange={handleChange}
                            type="text" 
                            autoFocus
                            placeholder="Enter the contact no." 
                            name="contact"
                            value={signupInfo.contact}
                            />
                        </div>
                        
                        
                    </div>
                    <div >
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
                    <Link to="/faculty-login" style={{color:"blue"}}> Login</Link>
                </span>
            </form>

            <ToastContainer/>
        </div>
    );
}

export default Faculty_Signup;