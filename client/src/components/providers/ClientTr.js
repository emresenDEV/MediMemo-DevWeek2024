import React from "react";

function ClientTr( { clientData } ) {
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

  return(
  <tr>
    <td className="client-initials">Client Initials</td>
    <td className="client-name">Client Name</td>
    <td className="client-dob">Client DOB</td>
    {/* <td className="client-ssn">Client SSN</td> */}
    <td className="client-email">{clientData.email}</td>
  </tr>
)}

export default ClientTr