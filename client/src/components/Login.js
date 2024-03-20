import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useUserContext } from "../UserContext";

function Login( { type, setAppointments } ) {
  const { user, setUser } = useUserContext()
  const history = useHistory()
  const [showPassword, setShowPassword] = useState(false);

  function handleFocus(e) { //lets user click on any part of the div to type their information
    const input = e.target.querySelector("input")
    if (input) {
      input.focus()
    }
  }
  
  const [formData, setFormData] = useState( //temporarily stores what the user has entered into the form
    {
      email: "",
      password: "",
      provider_code: ""
    })

  function handleChange(e) { //adds any changes to the form to the temporary storage
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

  function formatDate(date) {
    const pieces = date.split(",")
    return new Date(parseInt(pieces[0]), parseInt(pieces[1]), parseInt(pieces[2]), parseInt(pieces[3]), parseInt(pieces[4]))
}

  const handleSubmit = async (e) => {//submits form
    e.preventDefault()
    const action = document.activeElement.name //records which action is being taken
    if (action === 'login') {
      // check if user exists
      const response = await fetch(`/${type}_login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const u = await response.json();
        console.log(u)

        sessionStorage.setItem("type", type)
        sessionStorage.setItem("user_id", u.id)
        setUser(u);

        const formattedAppointments = []
        const old_appointments = u.appointments
        old_appointments.forEach((ap) => {
            const new_ap = ap
            new_ap.startDate = formatDate(ap.startDate)
            if (ap.endDate.length) {new_ap.endDate = formatDate(ap.endDate)}
            formattedAppointments.push(new_ap)
        })
        setAppointments(formattedAppointments)

        setFormData({ //clears the form
          email: "",
          password: "",
          provider_code: ""
        })
        if (type === "provider") {
          setTimeout(() => {
            history.push(`/provider-portal/schedule`)
          }, 125) }
        else if (type === "client") {
          setTimeout(() => {
            history.push(`/patient-portal`) //client landing page
          }, 125)}
      } else {
        const error = await response.json();
        console.error('Login failed:', error);
      }
    }
    if (action === 'signup') {
      const response = await fetch(`/${type}_signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      // console.log(response)
      if (response.ok) {
        const u = await response.json();
        sessionStorage.setItem("type", type)
        sessionStorage.setItem("user_id", u.id)
        setUser(u);

        const formattedAppointments = []
        const old_appointments = u.appointments
        old_appointments.forEach((ap) => {
            const new_ap = ap
            new_ap.startDate = formatDate(ap.startDate)
            if (ap.endDate.length) {new_ap.endDate = formatDate(ap.endDate)}
            formattedAppointments.push(new_ap)
        })
        setAppointments(formattedAppointments)

        setFormData({ //clears the form
          email: "",
          password: "",
          provider_code: ""
        })
        setTimeout(() => {
          history.push(`/${type}-portal`)
        }, 125)
      } else {
        const error = await response.json();
        console.error('Login failed:', error);
      }
    }
  }


  return (
    // jsx here
    <div className="background">
      <div className="overlay">
        <div className="overlay-col col-left">
          <div className="login-text">
            <h1>Welcome Back!</h1>
            <p>Please log in to your account.</p>
            <div className={`user-type`}>
              <a className={type==="provider"?"active":"inactive"} href="/provider-login">Provider</a>
              <a className={type==="client"?"active":"inactive"} href="/client-login">Patient</a>
            </div>
            {/* <form> */}
            <form onSubmit={handleSubmit}>
              <div className="input-div" onClick={handleFocus}>
              <label>Email Address *
                <br/>
                {/* <input id="email" type="text" placeholder="Enter email" value={formData.email} onChange={handleChange}/> */}
                <input id="email" type="text" value={formData.email} onChange={handleChange}/>
              </label>
              </div>
              <div className="input-div" onClick={handleFocus}>
              <label >Password *
                <img id="toggle-vis" src="assets/eye2.png" alt="toggle" onClick={() => setShowPassword(!showPassword)}/>
                <br/>
                <input id="password" type={showPassword? "text" : "password"} value={formData.password} onChange={handleChange}/>
              </label>
              </div>
              <p id="password-rules">Password must be 8 characters with a capital letter, a number, and a symbol</p>
              {type === "client" ? 
                <div className="input-div" onClick={handleFocus}>
                <label >New Provider Code
                  <br/>
                  {/* <input id="code" type="text" placeholder="Enter provider code" value={formData.password} onChange={handleChange}/> */}
                  <input id="provider_code" type="text" value={formData.provider_code} onChange={handleChange}/>
                </label>
                </div>
              : <></>}
              <div className="remember-forgot">
              <span id="span-remember">
              <label>
                <input id="remember-me"type="checkbox"/>
                Remember me
              </label>
              </span>
              <span id="span-forgot">
              <a id="forgot-password" href="/recover-password">Forgot password?</a>
              </span>
              </div>
              <div>
              <button id="login-button" type="submit" name="login">Log In</button>
              {/* <button id="login-button" type="submit" onClick={handleLogin}>Login</button> */}
              <button id="signup-button" type="submit" name="signup">Create Account</button>
              </div>
            </form>
          </div>
        </div>
        <div className="overlay-col col-right">
          <img className="login-image" alt="place holder" src="assets/female-doctor-and-patient.webp"/>
        </div>
      </div>
    </div>
  )
}

export default Login