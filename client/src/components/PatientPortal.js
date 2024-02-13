import React from "react";
//__Contents__:
// Picture (round, set default icon)
// User Birthday
// User Email
// --line break--
// Vitals <--- this is where I am right now. 
// Allergies
// Problems
// Immunizations
// Results
// Messages
// Appointments
// Medications
// Referrals
// Education
// Documents

function PatientPortal() {
    const user = {firstName:"John", lastName:"Doe", birthday:"01/01/2000", email:"jdoe@gmail.com", address:"1234 Main St, City, State, 12345", gender:'female'}
    return(
    // jsx here
    <div className='flexGrid'>
        {/* USER PROFILE PIC - ROUND. INSERT DEFAULT PIC */}
        <h1>{user.firstName} {user.lastName}, {user.gender}</h1>
        <br/>
        <h3>{user.birthday}</h3> 
        <br/>
        <h3>{user.email}</h3>
        <br/>
        <h3>{user.address}</h3>
        <br/>
        {/* LIGHT COLORED LINE TO DIVIDE TOP FROM BUTTONS BELOW */}

    </div>
    )
}
    export default PatientPortal