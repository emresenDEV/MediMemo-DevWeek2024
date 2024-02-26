import React, { useEffect, useState } from "react";
import ReactScheduler from "./ReactScheduler"; 
import { useUserContext } from "../UserContext";



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
  //*schedule (day/week/month options) -> sync with google calendar with patient data protected
  

  //*patient list
  //*patient interactions/surveys record
  //*patient data collection
  //*invite new patient
  //tailor new patient survey
  //messages/inbox
  //pharmacy/other provider connections


  return(
  <>
    <div className="schedule">
      {/* <ReactScheduler/> */}
      {/* <ProviderSchedule appointments={appointments} setAppointments={setAppointments} users={users} /> */}
    </div>
    {/* <MyCalendar myEventsList={myEventsList}/> */}
    {/* <p>provider portal</p> */}
  </>
  )
}

export default ProviderPortal