import React, { useEffect, useState } from "react";
import ReactScheduler from "./ReactScheduler"; 
import { useUserContext } from "../UserContext";


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