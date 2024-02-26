import React, { useEffect, useState } from "react";
import { useUserContext } from '../UserContext';
import { Switch, Route, useHistory } from 'react-router-dom';
// import components
import NavBar from "./NavBar";
import Login from "./Login";
import PatientSelectProvider from "./PatientSelectProvider";
import ProviderPortal from "./ProviderPortal";
import PatientPortal from "./PatientPortal";
import Account from "./Account";
// import user side pages
import Allergies from "./Allergies";
import Appointments from "./Appointments";
import Education from "./Education";
import Immunizations from "./Immunizations";
import Medications from "./Medications";
import Messages from "./Messages";
import Problems from "./Problems";
import Referrals from "./Referrals";
import Results from "./Results";
import Vitals from "./Vitals";
// provider portal pages
import ClientsList from "./ClientsList";
import AddAClient from "./AddAClient";
import EditSurvey from "./EditSurvey";
import Inbox from "./Inbox";
import ReactScheduler from "./ReactScheduler";
import Test from "./Test";
import DataEntry from "./DataEntry";

    function App() {
        const { user, setUser } = useUserContext();
        const [appointments, setAppointments] = useState([])
        const [selectedAppointment, setSelectedAppointment] = useState({})
        const [selectedClient, setSelectedClient] = useState({})
        const [providerOffice, setProviderOffice] = useState({providerOfficeName: 'Office Name', providerCity: 'City', providerState: 'State'})

    function formatDate(date) {
        const pieces = date.split(",")
        return new Date(parseInt(pieces[0]), parseInt(pieces[1]), parseInt(pieces[2]), parseInt(pieces[3]), parseInt(pieces[4]))
    }

    useEffect(() => {
        // auto-login
        fetch(`/${sessionStorage.type}_check_session`).then((r) => {
            if (r.ok) {
                r.json().then((u) => {
                setUser(u)
                const formattedAppointments = []
                const old_appointments = u.appointments
                old_appointments.forEach((ap) => {
                const new_ap = ap
                new_ap.startDate = formatDate(ap.startDate)
                if (ap.endDate.length) {new_ap.endDate = formatDate(ap.endDate)}
                formattedAppointments.push(new_ap)
        })
        setAppointments(formattedAppointments)
                });
            }
        });
    }, [setUser]);

    if (user.type === 'patient') return (
        <div className="App">
            <NavBar/>
            <Switch>
                <Route exact path="/patient-select-provider"> < PatientSelectProvider setProviderOffice={setProviderOffice}/> </Route>
                <Route exact path="/patient-portal"> < PatientPortal providerOffice={providerOffice}/> </Route>
                <Route exact path="/account"> < Account /></Route>
            </Switch>
        </div>
    )
    
    if (user.type === 'provider') return (
        <>
            <NavBar/>
            <ProviderPortal/>
        </>
    )
    // console.log(user)

    if (sessionStorage.type === "provider") {
        return (
            <div className="App">
                <Switch>
                    <Route exact path = "/provider-login"> <Login type={"provider"} setUser={setUser}/> </Route>
                    {/* <Route exact path = "/provider-portal"> 
                        <NavBar type={"provider"} user={user} setUser={setUser}/>
                    </Route> */}
                    <Route exact path = "/provider-portal/schedule">
                        <NavBar type={"provider"} user={user} setUser={setUser}/>
                        {/* <ReactScheduler/>  */}
                        <Test appointments={appointments} setAppointments={setAppointments} selectedAppointment={selectedAppointment} setSelectedAppointment={setSelectedAppointment} selectedClient={selectedClient} setSelectedClient={setSelectedClient}/>
                    </Route>
                    <Route exact path = "/provider-portal/clients">
                        <NavBar type={"provider"} user={user} setUser={setUser}/>
                        <ClientsList/>
                    </Route>
                    <Route exact path = "/provider-portal/data-entry">
                        <NavBar type={"provider"} user={user} setUser={setUser}/>
                        <DataEntry/>
                    </Route>
                    <Route exact path = "/provider-portal/inbox">
                        <NavBar type={"provider"} user={user} setUser={setUser}/>
                        <Inbox/>
                    </Route>
                </Switch>
            </div>
        )
    }

    else if (sessionStorage.type === "client") {
        return (
            <div className="App">
                <Switch>
                    <Route exact path = "/client-login"> <Login type={"client"} setUser={setUser}/> </Route>
                    <Route exact path = "/client-portal"> 
                        <NavBar type={"client"} user={user} setUser={setUser}/>
                        <PatientPortal type={"client"} user={user} setUser={setUser}/> 
                    </Route>
                </Switch>
            </div>
        )
    }

    return (
        <div className="App">
            <Switch>
                <Route exact path = {["/", "/provider-login"]}> <Login type={"provider"} setAppointments={setAppointments}/> </Route>
                <Route exact path = "/client-login"> <Login type={"client"} setAppointments={setAppointments}/> </Route>
            </Switch>
        </div>
    )
}

export default App;