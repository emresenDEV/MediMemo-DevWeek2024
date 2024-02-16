import React from "react";
import MyCalendar from "./MyCalendar";
import ReactScheduler from "./ReactScheduler";


function ProviderPortal() {
  //*schedule (day/week/month options) -> sync with google calendar with patient data protected
  const myEventsList = [
    {
      title: 'My Event',
      start: new Date('2024-02-16T13:45:00-05:00'),
      end: new Date('2024-02-16T14:00:00-05:00')
    }
  ]


  //*patient list
  //*patient interactions/surveys record
  //*patient data collection
  //*invite new patient
  //tailor new patient survey
  //messages/inbox
  //pharmacy/other provider connections




  return(
  <>
    <ReactScheduler/>
    {/* <MyCalendar myEventsList={myEventsList}/> */}
    {/* <p>provider portal</p> */}
  </>
  )
}

export default ProviderPortal