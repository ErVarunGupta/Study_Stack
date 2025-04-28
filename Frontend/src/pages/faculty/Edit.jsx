import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { IoArrowBackOutline } from "react-icons/io5";
import "react-toastify/dist/ReactToastify.css";

function Edit_Faculty_Profile() {
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;
    // console.log("edit page: ",data);

  const [editInfo, setEditInfo] = useState({
    name: "",
    email: "",
    contact: "",
    institute: "",
    department: "",
  });

    useEffect(() => {
        if (!data) {
            navigate('/home');
        } else {
            setEditInfo({
                name: data.name,
                email: data.email,
                contact: data.contact,
                institute: data.institute ,
                department: data.department ,
            });
        }
    }, [data, navigate]);

    const handleChange = (e) => {
        setEditInfo(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    // console.log("editInfo: ", editInfo);
    const token = localStorage.getItem('token');
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const id = decodedToken.id;
    // console.log("id: ",id);
    // console.log("token : ", token);

    const handleSubmit = async (e)=>{
        e.preventDefault(); 

        const payload = {
                name: editInfo.name || '',
                email: editInfo.email || '',
                contact: editInfo.contact||'',
                institute: editInfo.institute || '',
                department: editInfo.department || '',
            }
        // console.log("edit page: ",editInfo); 

        try {
            const result = await fetch(`http://localhost:8080/root/edit/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
                body: JSON.stringify(payload),
            });

            const { success, message, error } = await result.json();
            console.log("result: ",result);

            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate(-1);
                }, 1000);
            } else if (error) {
                const details = error.details?.[0]?.message || message;
                handleError(details);
            } else {
                handleError(message);
            }
        } catch (err) {
            handleError("Something went wrong.");
        }
    }

  

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gray-100 px-4">
      <div className="bg-white p-8 sm:p-12 shadow-[8px_8px_24px_0px_rgba(66,68,90,1)] max-w-4xl w-full rounded-md">

        {/* Header with back button */}
        <div className="flex items-center justify-center mb-6 relative">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 flex items-center gap-2 bg-gray-200 text-gray-800 hover:text-blue-600 px-4 py-2 rounded-lg transition cursor-pointer"
          >
            <IoArrowBackOutline />
            <span>Back</span>
          </button>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 text-center">
            Edit Profile
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Form Inputs */}
          {[
            { label: "Name", name: "name" },
            { label: "Email", name: "email" },
            {label: "Contact", name: "contact"},
            { label: "Institute", name: "institute" },
            { label: "Department", name: "department" },
          ].map(({ label, name, type = "text" }) => (
            <div className="flex flex-col" key={name}>
              <label htmlFor={name} className="text-lg mb-1">
                {label}
              </label>
              <input
                onChange={handleChange}
                type={type}
                name={name}
                value={editInfo[name]}
                placeholder={`Enter your ${label.toLowerCase()}`}
                className="text-lg p-2 border-b border-black outline-none placeholder:text-sm placeholder:italic"
              />
            </div>
          ))}

          <div className="md:col-span-2 flex flex-col items-center">
            <button
              type="submit"
              className="cursor-pointer w-full bg-teal-400 hover:bg-teal-500 text-white font-semibold text-lg py-2 rounded-lg shadow-md transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
}

export default Edit_Faculty_Profile;
