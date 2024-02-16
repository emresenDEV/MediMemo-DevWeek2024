import React, { useState } from "react";
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
    TodayButton
    } from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
const schedulerData = [
    {
      title: 'Website Re-Design Plan',
      startDate: new Date(2024, 2, 16, 9, 35),
      endDate: new Date(2024, 2, 16, 11, 30),
      id: 0,
      location: 'Room 1',
    }, {
      title: 'Book Flights to San Fran for Sales Trip',
      startDate: new Date(2024, 2, 16, 12, 11),
      endDate: new Date(2024, 2, 16, 13, 0),
      id: 1,
      location: 'Room 1',
    }
];

// function ReactScheduler() {

//     return (
//         <Paper>
//             <Scheduler
//             data={schedulerData}
//             >
//             <ViewState
//                 defaultCurrentViewName="Week"
//                 // currentViewName={}
//                 // onCurrentViewNameChange={}
//             />
//             <DayView
//                 startDayHour={8}
//                 endDayHour={14}
//             />
//             <WeekView 
//                 startDayHour={8}
//                 endDayHour={14}
//             />
//             <MonthView/>
//             <Toolbar/>
//             <DateNavigator/>
//             <TodayButton/>
//             <ViewSwitcher/>
//             <Appointments />
//             </Scheduler>
//         </Paper>
//     )
// }


// export default ReactScheduler


export default class ReactScheduler extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        data: schedulerData
      };
  
      this.commitChanges = this.commitChanges.bind(this);
    }
  
    commitChanges({ added, changed, deleted }) {
      this.setState((state) => {
        let { data } = state;
        if (added) {
          const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
          data = [...data, { id: startingAddedId, ...added }];
        }
        if (changed) {
          data = data.map(appointment => (
            changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
        }
        if (deleted !== undefined) {
          data = data.filter(appointment => appointment.id !== deleted);
        }
        return { data };
      });
    }
  
    render() {
      const { data } = this.state;
  
      return (
        <Paper>
          <Scheduler
            data={data}
            height={660}
          >
            <ViewState
              defaultCurrentViewName="Week"
            />
            <EditingState
              onCommitChanges={this.commitChanges}
            />
            <IntegratedEditing />
            <DayView
              startDayHour={7}
              endDayHour={17}
            />
            <WeekView
              startDayHour={7}
              endDayHour={17}
            />
            <MonthView/>
            <ConfirmationDialog />
            <Appointments />
            <AppointmentTooltip
              showOpenButton
              showDeleteButton
            />
            <AppointmentForm />
            <Toolbar/>
            <DateNavigator/>
            <TodayButton/>
            <ViewSwitcher/>
          </Scheduler>
        </Paper>
      );
    }
  }

  //appoint changes do not persist. i'll switch this to be handled by our database hopefully