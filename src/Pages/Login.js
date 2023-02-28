import React, { useState } from "react";
import { auth } from "../config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login({ authed }) {
  const navigate = useNavigate();
  const [logEmail, setlogEmail] = useState("");
  const [logPassword, setlogPassword] = useState("");

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, logEmail, logPassword).then(
        (res) => {
          console.log(res.user);
        }
      );
      authed(true);
      navigate("/");
    } catch (error) {
      alert(error.message);
      authed(false);
    }
  };

  return (
    <div className="App">
      <div className="header">
        <h2>Login</h2>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login();
        }}
      >
        <h3>Have an Account ?</h3>
        <label>
          {" "}
          <span>Email: </span>
          <input
            value={logEmail}
            type="email"
            onChange={(e) => {
              e.preventDefault();
              setlogEmail(e.target.value);
            }}
          />
        </label>
        <label>
          <span>Password: </span>
          <input
            value={logPassword}
            type="password"
            onChange={(e) => {
              e.preventDefault();
              setlogPassword(e.target.value);
            }}
          />
        </label>
        <button>Sign Up</button>
      </form>
      <div>
        <p>Don't have an Account ?</p>
        <a href="/signup">Signup</a>
      </div>
    </div>
  );
}
