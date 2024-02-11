import React, { useState } from "react";

function Login() {
  // javascript
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
      code: ""
    })

  function handleChange(e) { //adds any changes to the form to the temporary storage
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

  function handleSubmit(e) { //submits form
    e.preventDefault()
    const action = document.activeElement.name //records which action is being taken
    // console.log(formData, action)
    if (action === 'login') {
      console.log("client clicked log in")
    }
    if (action === 'signup') {
      console.log("client clicked create account")
    }
    // setFormData({ //clears the form
    //   email: "",
    //   password: "",
    //   code: ""
    // })
  }

  // function handleLogin(e) {
  //   e.preventDefault()
  //   console.log(e.target)
  // }

  return (
    // jsx here
    <div className="background">
      <div className="overlay">
        <div className="overlay-col col-left">
          <div className="login-text">
            <h1>Welcome Back!</h1>
            <p>Please log in to your account.</p>
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
                <br/>
                {/* <input id="password" type="text" placeholder="Enter strong password" value={formData.password} onChange={handleChange}/> */}
                <input id="password" type="text" value={formData.password} onChange={handleChange}/>
              </label>
              </div>
              <p id="password-rules">Password must be 8 characters with a capital letter, a number, and a symbol</p>
              <div className="input-div" onClick={handleFocus}>
              <label >Provider code
                <br/>
                {/* <input id="code" type="text" placeholder="Enter provider code" value={formData.password} onChange={handleChange}/> */}
                <input id="code" type="text" value={formData.code} onChange={handleChange}/>
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