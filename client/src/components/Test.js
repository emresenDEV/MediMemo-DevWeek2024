import * as React from "react";
import { useState } from "react";
import {
  Appointments,
  AppointmentTooltip,
  Scheduler,
  WeekView
} from "@devexpress/dx-react-scheduler-material-ui";
import Paper from '@mui/material/Paper';
import Checkbox from "@mui/material/Checkbox";
import { Button, FormControlLabel } from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Test() {
  const history = useHistory()
  const [appointments, setAppointments] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  function formatDate(date) {
    const pieces = date.split(",")
    return new Date(parseInt(pieces[0]), parseInt(pieces[1]), parseInt(pieces[2]), parseInt(pieces[3]), parseInt(pieces[4]))
  }

  const userData = async () => {
    // setIsLoading(true)
    const response = await fetch(`/${sessionStorage.type}/${sessionStorage.user_id}`)
    if (response.ok) {
        response.json()
        .then((u) => {
            // console.log(u)
            const formattedAppointments = []
            const old_appointments = u.appointments
            old_appointments.forEach((ap) => {
                const new_ap = ap
                new_ap.startDate = formatDate(ap.startDate)
                if (ap.endDate.length) {new_ap.endDate = formatDate(ap.endDate)}
                formattedAppointments.push(new_ap)
            })
            setAppointments(formattedAppointments)
            setIsLoading(false)
        })
    }
    else {
        setIsLoading(false)
        console.log("could not fetch appointments")
    }
}
userData()

  const [appointmentMeta, setAppointmentMeta] = React.useState({
    data: {},
    target: null
  });
  
    const AppointmentDetails = React.useCallback(
      ({children, appointmentData, onClick, onDoubleClick, ...restProps}) => {
        return (
          <Appointments.Appointment 
          {...restProps}
          appointmentData={appointmentData}
          onDoubleClick={() => {
            // sessionStorage.clientId = appointmentData.clientFK
            history.push(`/provider-portal/data-entry`)
          }}
          >
            {children}
            <div className="VerticalAppointment-container">
              <div className="VerticalAppointment-textContainer">
                <div>{appointmentData}</div>
              </div>
            </div>
            
          </Appointments.Appointment>
        )
      },
      [history]
    )
  
    // const AppointmentDefaultView = React.useCallback(
    //   ({}) => {
    //     return (
    //       <Appointments.AppointmentContent>
  
    //       </Appointments.AppointmentContent	>
    //     )
    //   }
    // )

  const Content = React.useCallback(
    ({ children, appointmentData, classes, ...restProps }) => {
      return (
        <AppointmentTooltip.Content
          {...restProps}
          appointmentData={appointmentData}
        >
          {children}
          <div className="MuiGrid-root MuiGrid-container Content-contentContainer css-1vam7s3-MuiGrid-root">
            <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-2 Content-textCenter css-1o7apob-MuiGrid-root"><div className="Content-text">Client:</div></div>
            <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-10 css-17p3wh3-MuiGrid-root">
              <div className="Content-text">{appointmentData.client.email}</div>
            </div>
          </div>

        </AppointmentTooltip.Content>
      );
    },
    []
  );

  if (isLoading) {
    return(<></>)
  }

  return (
    <Paper>
      <Scheduler data={appointments} height={660}>
        <WeekView startDayHour={9} endDayHour={19} />

        <Appointments
          appointmentComponent={AppointmentDetails}
          // appointmentContentComponent={AppointmentDefaultView}
        />

        <AppointmentTooltip
          showCloseButton
          showDeleteButton
          contentComponent={Content}
          appointmentMeta={appointmentMeta}
          onAppointmentMetaChange={setAppointmentMeta}
        />
      </Scheduler>
    </Paper>
  );
};

export default Test