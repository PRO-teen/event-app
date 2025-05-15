import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import MyCourses from "./pages/MyCourses";
import Create from "./pages/Create";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/my-courses" element={<MyCourses />} />
           <Route path="/create" element={<Create/>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
