import React from "react";


//__Contents__:
// Picture (round, set default icon)
// Provider Name
// Provider Practice Name
// --line break--
// Today's Appointments
// Scheduler
// Patient List
  // Select Patient
    // Patient Information
      // Submit Notes
      // View Patient Portal Profile Page
          //Insurance Coverage
            // Eligibility and Benefits (Insurance Information | In-Network/Out-of-Network)
            // Pre-Authorizations/Referrals Submitted
            // Appeals 
        // New Notes
        // History (Old Notes)
        // Current Prescriptions
        // Submit a New Prescription
        // Submit a New Pre-Authorization
        // Submit a New Referral
        // Submit a New Appeal
        // Schedule an Appointment | Follow-up
        // Messages (Appears twice, once nested here and once in the main menu | Flow: most recent message at the top)

// Messages (decided to make this two buttons so that from the main screen, the provider can see messages from patients and other providers at a glace) 
  // Provider to Patient Messages | Links to the patient's portal/profile page
  // Provider to Provider Messages | Links to the provider's profile page
// Patient Forms
  // New Patient Forms
  // Patient Form History
  // HIPPA Forms
  // Consent Forms
  // Release of Information Forms
  // Documents


// Basic Level is set up but nested components are not yet created. <-- CURRENT PLACE IN ABOVE PLAN
function ProviderPortal() {
  const provider = {
      firstName:"Jane", 
      lastName:"Doey",
      licenseType:"MD",
      userName:"doeyjMD",
      practiceName:"DoctorOffice", 
      practiceAddress:"1234 Main St",
      practiceCityStateZip: "SomeCity, FL, 12345", 
      phoneNumber:'1-234-567-8901',
      photo: ""
  }
  const defaultPhoto = ""

  return(
  // jsx here
  <div className='flexGrid'>
      {/* USER PROVIDER PIC - ROUND. INSERT DEFAULT PIC */}
      <img 
          src={provider.photo || defaultPhoto}
          alt = {'${provider.firstName} ${provider.lastName}'}
          className="user-profile-pic"
      />
      <br/>
      <h1>{provider.firstName} {provider.lastName}, ",", {provider.licenseType}</h1>
      <br/>

      <br/>
      {/* LIGHT COLORED LINE TO DIVIDE TOP FROM BUTTONS BELOW */}
      <hr className="divider-line" />
  <div className="button-container">


  </div>
  </div>
  )
}

export default ProviderPortal