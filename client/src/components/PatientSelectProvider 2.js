import React from "react";

function PatientPortal() {
  const user = {firstName:"John", lastName:"Doe"}
  const providerLocation = {providerOfficeName: 'Office Name', providerCity: 'City', providerState: 'State'}
  return(
    
    <div className='flexGrid'>
      <h1>Welcome {user.firstName} {user.lastName}!</h1>
      <br/>
      {/* List ALL registered providers for this patient. MUST be at least ONE. User selects desired Provider's Office name to access their provider's patient portal */}
        <div className='gridContainer'>
          <div className='gridItem'>[{providerLocation.providerOfficeName} - {providerLocation.providerCity}, {providerLocation.providerState}]</div>
          <div className='gridItem'>[{providerLocation.providerOfficeName} - {providerLocation.providerCity}, {providerLocation.providerState}]</div>
          <div className='gridItem'>[{providerLocation.providerOfficeName} - {providerLocation.providerCity}, {providerLocation.providerState}]</div>
          <div className='gridItem'>[{providerLocation.providerOfficeName} - {providerLocation.providerCity}, {providerLocation.providerState}]</div>
        </div>
    </div>
  )
}
export default PatientPortal;

