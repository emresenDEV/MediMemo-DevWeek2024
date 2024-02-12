import React from 'react';
import IconButton from '@mui/material/IconButton';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'; // Appointment Icon
import MessageIcon from '@mui/icons-material/Message'; // Message Icon
import MedicationIcon from '@mui/icons-material/Medication'; // Medication Icon
import FolderCopyIcon from '@mui/icons-material/FolderCopy'; // Medical Records
import AddIcon from '@mui/icons-material/Add';
// Installed the Material-UI library using the following command:
    // npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
// To view more icons, visit:
// https://mui.com/material-ui/material-icons/

// TODO: Need to add FileName.js files for each of the icons used in this file
    //IF NEW PATIENT: there should be an ICON that leads to NEW PATIENT PAPERWORK FORM
        // The rest of the icons are ALWAYS there for ALL users
            // Message Center
            // Medications
            // Medical Records
            // Schedule Appointment (Form)
    //GOAL: User can click on the icons to navigate to the respective pages. FIXME: is this what we want? Or do we want all of this in the navigation menu at the top? 
function IconButtons() {
    return (
    <div>
      {/* Message Center Button */}
      <IconButton aria-label="message-center" onClick={() => { /* Navigate to message center-path icon button takes user to is entered here for each button */ }}>
        <MessageIcon />
        </IconButton>
      {/* Medications Button */}
      <IconButton aria-label="medications" onClick={() => { /* Navigate to medications list */ }}>
        <MedicationIcon />
        </IconButton>

      {/* Medical Records Button */}
      <IconButton aria-label="medical-records" onClick={() => { /* Navigate to medical records */ }}>
        <FolderCopyIcon />
        </IconButton>

        {/* Upcoming Appointments Feed - TODO: not created yet! Need to figure out how to integrate with the server database to pull the data from there*/}
      {/* This can be a list or any other component that shows the feed */}

      {/* Schedule Appointment Button */}
      <IconButton aria-label="schedule-appointment" onClick={() => { /* Navigate to schedule appointment */ }}>
        <AppointmentIcon />
        </IconButton>

    </div>
    );
}

export default IconButtons;
