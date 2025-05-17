// src/components/Navbar.js
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../axios";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("/auth/me")
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const handleLogout = () => {
    window.open("https://event-app-wf08.onrender.com/auth/logout", "_self");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold">
        <Link to="/">CourseHub</Link>
      </div>

      <div className="flex space-x-6">
        <Link to="/" className="hover:text-gray-300">Home</Link>
        <Link to="/courses" className="hover:text-gray-300">Courses</Link>
        <Link to="/create" className="hover:text-gray-300">Create</Link>
        <Link to="/my-courses" className="hover:text-gray-300">My Courses</Link>
      </div>

      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span className="text-sm text-gray-300">{user.displayName}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="bg-green-600 px-3 py-1 rounded hover:bg-green-700">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
