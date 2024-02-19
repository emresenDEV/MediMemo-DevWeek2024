import React, { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import { 
    Scheduler,
    DayView, WeekView, MonthView, AllDayPanel,
    Appointments, AppointmentForm, AppointmentTooltip,
    Toolbar, ViewSwitcher, DateNavigator, TodayButton,
    ConfirmationDialog, EditRecurrenceMenu
    // DragDropProvider,
    } from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import { useUserContext } from "../UserContext";
import ClientTr from "./ClientTr";

function ReactScheduler() {
    const [appointments, setAppointments] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [appointmentZoomed, setAppointmentZoomed] = useState(false)
    const [appointmentMeta, setAppointmentMeta] = useState({
        target: null,
        data: {},
    })
    // console.log(sessionStorage.user_id)

    console.log(appointments)

    function formatDate(date) {
        const pieces = date.split(",")
        return new Date(parseInt(pieces[0]), parseInt(pieces[1]), parseInt(pieces[2]), parseInt(pieces[3]), parseInt(pieces[4]))
    }

    useEffect(() => { //fetches appointments on component call
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
    }, [])

    function handleScheduleEdit(e) {
        // console.log(e)
        if (e.deleted) {
            const apId = e.deleted
            // console.log("delete pressed")
            console.log(`Appointment id ${e.deleted} to be deleted`)
            fetch(`/appointment/${apId}`, {
                method: 'DELETE',
                headers: {'Content-type': 'application/json; charset=UTF-8'},
                body: {}
            })
            .then(() => {
                const remainingAps = appointments.filter((ap) => (ap.id !== apId))
                console.log(remainingAps)
                setAppointments(remainingAps)
            })
        }
        else if (e.changed) {
            const apId = parseInt(Object.keys(e.changed)[0])
            // console.log(apId)
            const apChanges = e.changed[Object.keys(e.changed)[0]]
            console.log(apChanges)
            console.log(`Appointment id ${apId} to be patched`)
        }
        else if (e.added) {
            console.log(e.added)
            const newAp = e.added
            console.log(newAp)
            console.log(`New appointment to be posted`)
            // fetch(`/appointments}`, {
            //     method: 'POST',
            //     headers: {'Content-type': 'application/json; charset=UTF-8'},
            //     body: {}
            // })
            // .then(() => {
            //     setAppointments()
            // })
        }
    }

    function handleAppointmentMetaChange({data, target}) {
        console.log("hi jess")
        console.log(data)
        console.log(target)
        setAppointmentMeta({"data": data, "target": target })
    }
    // console.log(appointments)

    if (isLoading) {
        return (
            <Paper>
            <Scheduler
            data={[]}
            height={660}
            >
            <ViewState
                defaultCurrentViewName="Day"
            />
            <MonthView/>
            <Toolbar/>
            <ViewSwitcher/>
            <Appointments
            />
            <DateNavigator/>
            <TodayButton/>
            <AllDayPanel/>
            </Scheduler>
        </Paper>
        )
    }

    return (
        <Paper>
            <Scheduler
            data={appointments}
            height={660}
            >
            <ViewState
                defaultCurrentViewName="Day"
            />
            <EditingState
                defaultEditingAppointment={{}}
                defaultAddedAppointment={{}}
                defaultAppointmentChanges={{}}
                onCommitChanges={handleScheduleEdit}
            />
            <EditRecurrenceMenu/>
            <DayView
                startDayHour={7}
                endDayHour={17}
            />
            <WeekView
                startDayHour={7}
                endDayHour={17}
            />
            <MonthView/>
            {/* <ConfirmationDialog /> */}
            <Toolbar/>
            <ViewSwitcher/>
            <Appointments
            />
            <AppointmentTooltip
                showCloseButton
                visible={appointmentZoomed}
                onVisibilityChange={() => {setAppointmentZoomed(!appointmentZoomed)}}
                appointmentMeta={appointmentMeta}
                onAppointmentMetaChange={handleAppointmentMetaChange}
                
            />
            <AppointmentForm
                // onAppointmentDataChange={handleAppointmentDataChange}
                readOnly={true}
            />
            
            <DateNavigator/>
            <TodayButton/>
            <AllDayPanel/>
            {/* <DragDropProvider
                // allowDrag={allowDrag}
            /> */}
            </Scheduler>
        </Paper>
    );
}

export default ReactScheduler