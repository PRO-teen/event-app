import { NavLink } from "react-router-dom";

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    `px-4 py-2 text-white font-medium hover:text-blue-400 ${
      isActive ? "border-b-2 border-blue-400" : ""
    }`;

  return (
    <nav className="bg-gray-900 shadow-md px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-white">Learn</div>
      <div className="flex space-x-6">
        <NavLink to="/" className={linkClass}>Home</NavLink>
        <NavLink to="/courses" className={linkClass}>Courses</NavLink>
        <NavLink to="/my-courses" className={linkClass}>My Courses</NavLink>
        <NavLink to="/login" className={linkClass}>Login</NavLink>
      </div>
    </nav>
  );
}
