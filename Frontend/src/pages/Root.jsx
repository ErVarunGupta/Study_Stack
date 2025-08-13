import { useNavigate } from "react-router-dom";

function Root() {
  const navigate = useNavigate();
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-3xl font-semibold mb-8 text-gray-800">Please select your role</h1>
        
        <div className="flex flex-col space-y-4 w-64">
          <button
            className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 font-medium cursor-pointer"
            onClick={() => navigate('/faculty-login')}
          >
            Faculty
          </button>
          <button
            className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300 font-medium cursor-pointer"
            onClick={() => navigate('/student-login')}
          >
            Student
          </button>
        </div>
      </div>
    );
  }
  
  export default Root;
  