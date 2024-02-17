import React, { useState, PureComponent } from "react";
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
    DragDropProvider,
    EditRecurrenceMenu,
    AllDayPanel
    } from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';

export default class ReactScheduler extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: props.myEventsList
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
          <Appointments
          />
          <AppointmentTooltip
            showOpenButton
            showDeleteButton
          />
          <AppointmentForm />
          <Toolbar/>
          <DateNavigator/>
          <TodayButton/>
          <ViewSwitcher/>
          <AllDayPanel/>
          <DragDropProvider
            // allowDrag={allowDrag}
          />
        </Scheduler>
      </Paper>
    );
  }
}

//appoint changes do not persist. i'll switch this to be handled by our database hopefully
