import React from "react";

function PatientPortal() {
  const user = {firstName:"John", lastName:"Doe"}
  return(
  // jsx here
    // <div className="background">
    //   <div className="overlay">
    <div>    
        <h1>Welcome {user.firstName} {user.lastName}!</h1>
        <br/>
        <h2>Here are your upcoming appointments:</h2>
        <br/>
        <p>Appointment 1</p>
        <p>Appointment 2</p>
        <h2>Message Center</h2>
        <p>Message 1</p>
        <p>Message 2</p>
        <h2>Medications</h2>
        <p>Prescription 1</p>
        <p>Prescription 2</p>
        <h2>Medical Records</h2>
        <p>Record 1</p>
        <p>Record 2</p>
        
        <h2> Test Results</h2>
    </div>
    //   </div>
    // </div>
  )
}

export default PatientPortal

