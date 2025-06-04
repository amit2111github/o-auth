// Login.jsx
import React from "react";

const Login = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:4000/auth/google";
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Login with Google</h2>
      <button onClick={handleLogin} style={{ padding: "10px 20px", fontSize: "16px" }}>
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
