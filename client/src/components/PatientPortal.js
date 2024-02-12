import React from "react";
import IconButton from 'IconButtons.js';

function IconButtons() {
}

function PatientPortal() {
  const user = {firstName:"John", lastName:"Doe"}
  return(
  // jsx here
    // <div className="background">
    //   <div className="overlay">
    <div>

        <h1>Welcome {user.firstName} {user.lastName}!</h1>
        <br/>
      <div className='Icon-buttons-container'>
        <IconButton />
      </div>

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
              {/* Message Center Button */}
      <IconButton aria-label="message-center" onClick={() => { /* Navigate to message center */ }}>
        <MessageIcon />

      {/* Medications Button */}
      <IconButton aria-label="medications" onClick={() => { /* Navigate to medications list */ }}>
        <MedicationIcon />
      </IconButton>

      {/* Medical Records Button */}
      <IconButton aria-label="medical-records" onClick={() => { /* Navigate to medical records */ }}>
        <MedicalRecordsIcon />
      </IconButton>
      </IconButton>

      {/* Upcoming Appointments Feed */}
      {/* This can be a list or any other component that shows the feed */}
      
      {/* Schedule Appointment Button */}
      <IconButton aria-label="schedule-appointment" onClick={() => { /* Navigate to schedule appointment */ }}>
        <AddIcon />
      </IconButton>
    </div>
    //   </div>
    // </div>
  )
}

export default PatientPortal

