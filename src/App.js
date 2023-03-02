import "./App.css";
import React, { useState } from "react";
import { NavLink, Route, Routes, BrowserRouter } from "react-router-dom";
import { SignUp } from "./Pages/Signup";
import Login from "./Pages/Login";
import Logout from "./Pages/Logout";
import MoneyTracker from "./Pages/MoneyTracker";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config";

function App() {
  //Checking if user is logged in
  const [userLoggeIn, setUserLoggeIn] = useState();
  const [userUID, setUserUID] = useState("");
  const [userJustLoggedout, setUserJustLoggedout] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserLoggeIn(true);
      setUserUID(user.uid);
      // console.log(UID);
    } else {
      setUserLoggeIn(false);
    }
  });

  //app return
  return (
    <div className="App">
      <BrowserRouter>
        <div className="nav-bar">
          <NavLink className="nav-link" to="/">
            Transactions
          </NavLink>
          {!userLoggeIn && (
            <NavLink className="nav-link" to="/signup">
              Signup
            </NavLink>
          )}
          {!userLoggeIn && (
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          )}
          {userLoggeIn && (
            <NavLink
              className="nav-link"
              onClick={() => {
                Logout(setUserJustLoggedout);
              }}
            >
              Logout
            </NavLink>
          )}
        </div>

        <Routes>
          <Route path="/signup" element={<SignUp authed={setUserLoggeIn} />} />
          <Route path="/login" element={<Login authed={setUserLoggeIn} />} />
          <Route
            path="/"
            element={
              <MoneyTracker
                authed={userLoggeIn}
                userUID={userUID}
                userJustLoggedout={userJustLoggedout}
              ></MoneyTracker>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
