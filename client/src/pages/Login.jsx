// src/pages/Login.js
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://event-app-wf08.onrender.com/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      setMsg("✅ Login successful!");
      navigate("/create"); // go to create page
    } catch (err) {
      setMsg("❌ Login failed: " + (err.response?.data?.msg || err.message));

    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <form onSubmit={handleLogin} className="bg-gray-800 p-6 rounded space-y-4">
        <h2 className="text-xl font-bold">Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
        <button type="submit" className="w-full bg-blue-500 p-2 rounded">Login</button>
        {msg && <p className="text-red-400">{msg}</p>}
      </form>
    </div>
  );
};

export default Login;
