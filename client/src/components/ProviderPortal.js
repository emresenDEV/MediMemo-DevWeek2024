import React from "react";
// import MyCalendar from "./MyCalendar";
import ReactScheduler from "./ReactScheduler";


function ProviderPortal() {
  //*schedule (day/week/month options) -> sync with google calendar with patient data protected
  const myEventsList = [
    {
      id: 0,
      title: 'Watercolor Landscape',
      startDate: new Date(2024, 1, 16, 9, 30), //Months start at zero (Jan = 0). Days and years are normal.
      endDate: new Date(2024, 1, 16, 11, 30),
      // ownerId: 1
    }, {
      id: 1,
      title: 'Monthly Planning',
      startDate: new Date(2024, 1, 17, 9, 30),
      endDate: new Date(2024, 1, 17, 11, 30),
      // ownerId: 1
    }, {
      id: 2,
      title: 'Recruiting students',
      startDate: new Date(2024, 1, 9, 12, 0),
      endDate: new Date(2024, 1, 9, 13, 0),
      // ownerId: 2
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
    <ReactScheduler myEventsList={myEventsList}/>
    {/* <MyCalendar myEventsList={myEventsList}/> */}
    {/* <p>provider portal</p> */}
  </>
  )
}

export default ProviderPortal