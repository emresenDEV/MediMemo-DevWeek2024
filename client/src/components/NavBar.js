import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useUserContext } from "../UserContext";

function NavBar( { type } ) {
  const {user, setUser} = useUserContext()
  const history = useHistory()

  function logout() {
    fetch("/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: {}
    })
    .then(() => {
      sessionStorage.clear()
      setUser()
      setTimeout(() => {
        history.push(`/${type}-login`)
      }, 125)
    })
  }

  if (sessionStorage.type && sessionStorage.type === "client") {
    return(
      <div className = "topnav">
        <p className="left-nav">Medi Memo</p>
        <NavLink className="middle-nav" to="/patient-select-provider">Providers</NavLink>

        {/* These are listed from right to left because of how they render: */}
        <button className="right-nav" onClick={logout}>Logout</button>
        {/* <NavLink className="right-nav" to="/account">Account</NavLink> */}
      </div>
    )
  }

  if (sessionStorage.type && sessionStorage.type === "provider") {
    return(
      <div className = "topnav">
          {/* <p className="left-nav home-button" onClick={sendHome}>Medi Memo</p> */}
          <p className="left-nav home-button" >Medi Memo</p>
          
          {/* <NavLink className="left-nav" to={`/${type}-portal`}>Home</NavLink> */}
          <NavLink className="left-nav" to={`/provider-portal/schedule`}>Schedule</NavLink>
          <NavLink className="left-nav" to={`/provider-portal/clients`}>Clients</NavLink>
          <NavLink className="left-nav" to={`/provider-portal/data-entry`}>Data Entry</NavLink>
          <NavLink className="left-nav" to={`/provider-portal/inbox`}>Inbox</NavLink>

          {/* These are listed from right to left because of how they render: */}
          <button className="right-nav" onClick={logout}>Logout</button>
          {/* <NavLink className="right-nav" to="/account">Account</NavLink> */}
      </div>
    )
  }
  
  
  return (
    <div className = "topnav">
        <p className="left-nav">Medi Memo</p>
        {/* <NavLink className="middle-nav" to={`${type}-portal`}>Home</NavLink> */}

        {/* These are listed from right to left because of how they render: */}
        <button className="right-nav" onClick={logout}>Logout</button>
        {/* <NavLink className="right-nav" to="/account">Account</NavLink> */}
    </div>
  )
}

export default NavBar


