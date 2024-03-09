import React, { useEffect, useState } from "react";
import { useUserContext } from '../UserContext';
import { Switch, Route, useHistory } from 'react-router-dom';
// import components
import NavBar from "./NavBar";
import Login from "./Login";
import PatientSelectProvider from "./patients/PatientSelectProvider";
import PatientPortal from "./patients/PatientPortal";
import Account from "./patients/Account";
// import user side pages
import Allergies from "./patients/Allergies";
import Appointments from "./patients/Appointments";
import Education from "./patients/Education";
import Immunizations from "./patients/Immunizations";
import Medications from "./patients/Medications";
import Messages from "./patients/Messages";
import Problems from "./patients/Problems";
import Referrals from "./patients/Referrals";
import Results from "./patients/Results";
import Vitals from "./patients/Vitals";
// provider portal pages
import AddAClient from "./providers/AddAClient";
import ClientsList from "./providers/ClientsList";
import DataEntry from "./providers/DataEntry";
import DataSettings from "./providers/DataSettings";
import EditSurvey from "./providers/EditSurvey";
import Inbox from "./providers/Inbox";
import InsuranceViewer from "./providers/InsuranceViewer";
import Schedule from "./providers/Schedule";
import ProviderPortal from "./providers/ProviderPortal";
import CustomizeDataEntry from "./providers/CustomizeDataEntry";

    function App() {
        const { user, setUser } = useUserContext();
        const [appointments, setAppointments] = useState([])
        const [selectedAppointment, setSelectedAppointment] = useState({})
        const [selectedClient, setSelectedClient] = useState({})
        const [providerOffice, setProviderOffice] = useState({providerOfficeName: 'Office Name', providerCity: 'City', providerState: 'State'})
        const [selectedInsurance, setSelectedInsurance] = useState({})
        const [selectedDataProfile, setSelectedDataProfile] = useState({})

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

    if (sessionStorage.type === 'patient') return (
        <div className="App">
            <NavBar/>
            <Switch>
                <Route exact path="/patient-select-provider"> < PatientSelectProvider setProviderOffice={setProviderOffice}/> </Route>
                <Route exact path="/patient-portal"> < PatientPortal providerOffice={providerOffice}/> </Route>
                <Route exact path="/account"> < Account /></Route>
            </Switch>
        </div>
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
                        <Schedule appointments={appointments} setAppointments={setAppointments} selectedAppointment={selectedAppointment} setSelectedAppointment={setSelectedAppointment} selectedClient={selectedClient} setSelectedClient={setSelectedClient}/>
                    </Route>
                    <Route exact path = "/provider-portal/clients">
                        <NavBar type={"provider"} user={user} setUser={setUser}/>
                        <ClientsList/>
                    </Route>
                    <Route exact path = "/provider-portal/data-entry">
                        <NavBar type={"provider"} user={user} setUser={setUser}/>
                        <DataEntry/>
                    </Route>
                    <Route exact path = "/provider-portal/data-settings">
                        <NavBar type={"provider"} user={user} setUser={setUser}/>
                        <DataSettings setSelectedInsurance={setSelectedInsurance} setSelectedDataProfile={setSelectedDataProfile}/>
                    </Route>
                    <Route path = "/provider-portal/data-settings/insurance-viewer"> 
                        <NavBar type={"provider"} user={user} setUser={setUser}/>
                        <InsuranceViewer insurance={selectedInsurance}/>
                    </Route>
                    <Route path = "/provider-portal/data-settings/customize-data-entry"> 
                        <NavBar type={"provider"} user={user} setUser={setUser}/>
                        <CustomizeDataEntry dataProfile={selectedDataProfile}/>
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