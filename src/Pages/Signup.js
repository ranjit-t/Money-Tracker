import React, { useState } from "react";
import { auth } from "../config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export function SignUp({ authed }) {
  const navigate = useNavigate();
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, regEmail, regPassword);
      setRegEmail("");
      setRegPassword("");
      alert("Registered Successfully");
      authed(true);
      navigate("/");

      //   console.log(user);
    } catch (error) {
      alert(error.message);
      authed(false);
    }
  };
  return (
    <div className="App">
      <div className="header">
        <h2>Signup</h2>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          register();
        }}
      >
        <h3>Don't have an Account ?</h3>
        <label>
          {" "}
          <span>Email: </span>
          <input
            value={regEmail}
            type="email"
            onChange={(e) => {
              e.preventDefault();
              setRegEmail(e.target.value);
            }}
          />
        </label>
        <label>
          <span>Password: </span>
          <input
            value={regPassword}
            type="password"
            onChange={(e) => {
              e.preventDefault();
              setRegPassword(e.target.value);
            }}
          />
        </label>
        <button>Sign Up</button>
      </form>

      <div>
        <p>Already Have an Account ? </p>
        <a href="/login">Login</a>
      </div>
    </div>
  );
}
