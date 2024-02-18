import React, { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import { 
    DayView,
    WeekView, 
    MonthView,
    Scheduler, 
    Appointments,
    AppointmentForm,
    AppointmentTooltip,
    ConfirmationDialog, 
    Toolbar, 
    ViewSwitcher,
    DateNavigator,
    TodayButton,
    // DragDropProvider,
    // EditRecurrenceMenu,
    AllDayPanel
    } from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import { useUserContext } from "../UserContext";

function ReactScheduler( {appointments, setAppointments} ) {
    const { user, setUser } = useUserContext();
    
    console.log(user)
    console.log(appointments)

    useEffect(() => {}, [appointments])

    return (
        <Paper>
            <Scheduler
            data={appointments}
            height={660}
            >
            <ViewState
                defaultCurrentViewName="Month"
            />
            {/* <EditingState
                onCommitChanges={this.commitChanges}
            /> */}
            {/* <IntegratedEditing /> */}
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
            {/* <AppointmentTooltip
                showOpenButton
                showDeleteButton
            /> */}
            {/* <AppointmentForm /> */}
            
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

// appoint changes do not persist. i'll switch this to be handled by our database hopefully


//     "@devexpress/dx-react-core": "^4.0.8",
//     "@devexpress/dx-react-scheduler": "^4.0.8",
//     "@devexpress/dx-react-scheduler-material-ui": "^4.0.8",