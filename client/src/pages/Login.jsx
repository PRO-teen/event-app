// src/pages/Login.js
const Login = () => {
  const handleGoogleLogin = () => {
    window.open('https://event-app-wf08.onrender.com/auth/google/', '_self');
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleGoogleLogin}>
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
