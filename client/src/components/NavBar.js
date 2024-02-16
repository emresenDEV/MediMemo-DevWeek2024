import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function NavBar({ type, users, setUsers }) {
  const history = useHistory();

  function logout() {
    // console.log("this will log out the user and navigate to home page")
    sessionStorage.clear();
    setUsers();
    setTimeout(() => {
      history.push(`/${type}-login`);
    }, 125);
  }

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
}

export default NavBar;
