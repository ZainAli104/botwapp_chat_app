import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [err, setErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      setIsLoading(false);
    } catch (err) {
      setErr(true);
      setIsLoading(false);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Lama Chat</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email" required />
          <input type="password" placeholder="password" required />
          <button>
            {isLoading ? <span className="loader"></span> : <>Sign in</>}
          </button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          You don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
