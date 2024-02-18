// import { Scheduler } from "@aldabil/react-scheduler";
import { useEffect } from "react";

function ProviderSchedule( { appointments, setAppointments, users } ) {

  const fetchRemote = async (query) => {
    // console.log(query)
    const response = await fetch(`/appointment_subset/${query.start}/${query.end}`)
    appointments = await response.json();
    console.log(appointments)
    // return appointments
  }

  // useEffect(fetch(`appointment_subset/<start>/<end>`))
  //   const response = await fetch(`provider/${sessionStorage.user_id}`)
  //   if (response.ok) {
  //     const user = await response.json();
  //     console.log(user)
  //     const processedAppointments = await user.appointments.map((ap) => {return {
  //       event_id: ap.id,
  //       title: ap.title,
  //       start: new Date(ap.startDate),
  //       end: new Date(ap.endDate),
  //       disabled: true
  //     }})
  //     console.log(processedAppointments)
  //     setAppointments(processedAppointments)
  //   }
  //   else {
  //     const error = await response.json();
  //     console.error('Failed to fetch appointments:', error);
  //   }
  // }

  // fetchRemote()

  // const processedAppointments = users.appointments.map((ap) => {return {
  //     event_id: ap.id,
  //     title: ap.title,
  //     start: new Date(ap.startDate),
  //     end: new Date(ap.endDate),
  //     disabled: true
  //   }})
  // console.log(processedAppointments)
  // setAppointments(processedAppointments)
  // console.log(appointments)
  

  // const handleConfirm = async (event, action) => {
  //   console.log("handleConfirm =", action, event);

    // if(action === "create") {
    //   const response = await fetch(`appointments`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       clientFK: 1,
    //       providerFK: sessionStorage.user_id,
    //     })
    //   })
    // if (response.ok) {
    //   const event = await response.json();
    //   console.log(event)
    //   const processedAppointments = await user.appointments.map((ap) => {return {
    //     event_id: ap.id,
    //     title: ap.title,
    //     start: new Date(ap.startDate),
    //     end: new Date(ap.endDate),
    //     disabled: true
    //   }})
    //   console.log(processedAppointments)
    //   setAppointments(processedAppointments)
    // }
    // else {
    //   const error = await response.json();
    //   console.error('Failed to fetch appointments:', error);
    // }
    // }

    // else if(action === "edit") {
    //   const response = await fetch(`provider/${sessionStorage.user_id}`)
    // if (response.ok) {
    //   const user = await response.json();
    //   console.log(user)
    //   const processedAppointments = await user.appointments.map((ap) => {return {
    //     event_id: ap.id,
    //     title: ap.title,
    //     start: new Date(ap.startDate),
    //     end: new Date(ap.endDate),
    //     disabled: true
    //   }})
    //   console.log(processedAppointments)
    //   setAppointments(processedAppointments)
    // }
    // else {
    //   const error = await response.json();
    //   console.error('Failed to fetch appointments:', error);
    // }
    // }


  return (
    <></>
    // <Scheduler
    //   view="month"
    //   month={{
    //     weekStartOn: 0,
    //     startHour: 7, 
    //     endHour: 19
    //   }}
    //   week={{
    //     weekStartOn: 0,
    //     startHour: 7, 
    //     endHour: 19
    //   }}
    //   day={{
    //     startHour: 7, 
    //     endHour: 19
    //     // step:15
    //   }}
    //   getRemoteEvents={fetchRemote}
      // events={appointments}
      // onConfirm={handleConfirm}
      // fields = {
      //   {
      //     name: "clientFK",
      //     type: "input",
      //     // Should provide options with type:"select"
      //     // options: clientChoices,
      //     config: { label: "Client", required: true, errMsg: "Plz Select User" }
      //   }
      // }
      // onDelete={handleDelete}
    // />
  )
}

export default ProviderSchedule