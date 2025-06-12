import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate =  useNavigate()

    const logoutHandler = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/v1/user/logout")
            if(res.data.success) {
                toast.success(res.data.message || "Logout successful");
                navigate("login")
            }
        } catch (error) {
            
        }
    }
  return (
    <nav className="flex items-center justify-between w-full bg-white px-6 py-4 shadow-md sticky top-0 z-50">
      <h1 className="text-xl font-bold text-indigo-600 tracking-wide">
        FullStack <span className="text-gray-800">Todo App</span>
      </h1>
      <button onClick={logoutHandler} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md cursor-pointer">
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
