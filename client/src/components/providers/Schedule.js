import * as React from "react";
import { useState } from "react";
import {
  Appointments,
  AppointmentTooltip,
  Scheduler,
  WeekView,
  DayView,
  MonthView,
  Toolbar, ViewSwitcher, DateNavigator, TodayButton, AllDayPanel
} from "@devexpress/dx-react-scheduler-material-ui";
import Paper from '@mui/material/Paper';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ViewState } from "@devexpress/dx-react-scheduler";

function Test({ appointments, setAppointments, selectedAppointment, setSelectedAppointment, selectedClient, setSelectedClient }) {
  const history = useHistory()
  // console.log(appointments)
  // console.log(selectedAppointment)

  const appointmentComponent = React.useCallback(
    ({children, appointmentData, onClick, onDoubleClick, ...restProps}) => {
      function viewClientData(children) {
        console.log(children)
        setSelectedClient(children[1].props.data.client)
        setTimeout(() => {
          history.push(`/provider-portal/clients`)
        }, 125)
      }    
      // console.log(children[1].props.data) //appointment data
      return (
        <Appointments.Appointment 
        {...restProps}
        appointmentData={appointmentData}
        onDoubleClick={(e) => {
          setSelectedAppointment(children[1].props.data)
          setTimeout(() => {
            history.push(`/provider-portal/data-entry`)
          }, 125)
        }}
        >
          {children}
          <div className="VerticalAppointment-content css-gyiown">
            <div className="VerticalAppointment-container">
              <div style={{"width": "fit-content"}} className="VerticalAppointment-textContainer" onClick={(e) => viewClientData(children)}>
                Client Name
              </div>
            </div>
          </div>
        </Appointments.Appointment>
      )
    },
    [history, setSelectedAppointment, setSelectedClient]
  )

  return (
    <Paper>
      <Scheduler data={appointments} height={660}>
        <ViewState
          defaultCurrentViewName="Day"
        />
        <WeekView startDayHour={7.5} endDayHour={16.5} />
        <DayView startDayHour={7.5} endDayHour={16.5}/>
        <MonthView/>
        <Toolbar/>
        <ViewSwitcher/>
        <Appointments
          appointmentComponent={appointmentComponent}
        />
        <DateNavigator/>
        <TodayButton/>
        <AllDayPanel/>
      </Scheduler>
    </Paper>
  );
};

export default Test