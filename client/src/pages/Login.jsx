// src/pages/Login.js
const Login = () => {
  const handleLogin = () => {
    window.open("https://event-app-wf08.onrender.com/auth/google", "_self");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h2 className="text-2xl font-bold mb-4">Login with Google</h2>
      <button
        onClick={handleLogin}
        className="bg-red-500 px-4 py-2 rounded text-white"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
