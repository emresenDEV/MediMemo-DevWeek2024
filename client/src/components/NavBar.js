import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  const [user, setUser] = useState("test");

  function logout() {
    console.log("this will log out the user and navigate to home page");
    setUser("");
  }

  if (user)
    return (
      <div className="topnav">
        <p className="left-nav">Medi Memo</p>
        <NavLink className="middle-nav" to="/home">
          Home
        </NavLink>

        {/* These are listed from right to left because of how they render: */}
        <button className="right-nav" onClick={logout}>
          Logout
        </button>
        <NavLink className="right-nav" to="/account">
          Account
        </NavLink>
      </div>
    );

  return (
    <div className="topnav">
      <p className="left-nav">Medi Memo</p>
      <NavLink className="middle-nav" to="/home">
        Home
      </NavLink>

      {/* These are listed from right to left because of how they render: */}
      <NavLink className="right-nav" to="/signup">
        Sign Up
      </NavLink>
      <NavLink className="right-nav" to="/login">
        Log In
      </NavLink>
    </div>
  );
}

export default NavBar;
