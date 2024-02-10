import React, { useState } from "react";

function Login() {
  // javascript
  const [formData, setFormData] = useState(
    {
      email: "",
      password: "",
    })

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault()
  }

  return (
    // jsx here
    <div className="background">
      <div className="overlay">
        <div className="overlay-col col-left">
          <div className="login-text">
            <h1>Welcome Back!</h1>
            <p>Please log in to your account.</p>
            <form onSubmit={handleSubmit}>
              <div className="input-div">
              <label >Email Address *
                <br/>
                {/* <input id="email" type="text" placeholder="Enter email" value={formData.email} onChange={handleChange}/> */}
                <input id="email" type="text" value={formData.email} onChange={handleChange}/>
              </label>
              </div>
              <div className="input-div">
              <label >Password *
                <br/>
                {/* <input id="password" type="text" placeholder="Enter strong password" value={formData.password} onChange={handleChange}/> */}
                <input id="password" type="text" value={formData.password} onChange={handleChange}/>
              </label>
              </div>
              <p id="password-rules">Password must be 8 characters with a capital letter, a number, and a symbol</p>
              <div className="input-div">
              <label >Provider code
                <br/>
                {/* <input id="code" type="text" placeholder="Enter provider code" value={formData.password} onChange={handleChange}/> */}
                <input id="code" type="text" value={formData.password} onChange={handleChange}/>
              </label>
              </div>
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
              <button id="login-button" type="submit">Login</button>
              <button id="signup-button" type="submit">Create Account</button>
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