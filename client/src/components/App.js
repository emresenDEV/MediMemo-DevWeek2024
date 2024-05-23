import React, { useEffect, useState } from "react";
import { useUserContext } from '../UserContext';
import { Switch, Route, useHistory } from 'react-router-dom';
// import components
import NavBar from "./NavBar";
// import Login from "./Login";
import PatientSelectProvider from "./patients/PatientSelectProvider";
import PatientPortal from "./patients/PatientPortal";
import Account from "./patients/Account";
// provider portal pages
import ClientsList from "./providers/ClientsList";
import DataEntry from "./providers/DataEntry";
import Schedule from "./providers/Schedule";


function App() {
    const { user, setUser } = useUserContext();
    const [appointments, setAppointments] = useState([])
    const [selectedAppointment, setSelectedAppointment] = useState({})
    const [selectedClient, setSelectedClient] = useState({})
    const [providerOffice, setProviderOffice] = useState({providerOfficeName: 'Office Name', providerCity: 'City', providerState: 'State'})

    //-----------------------------------------------------------------------------------------------------------------
    //Choose which type of user to simulate (leave the other commented out):

    //CLIENT:
    sessionStorage.setItem("type", "client")

    //PROVIDER:
    // sessionStorage.setItem("type", "provider")
    // setUser({
    //     "_password_hash": "$2b$12$vUssJqFlzpUEUCDsXQIZTu/nGlrQUJBRwlR4k6vPyixHKjo6eWIYu",
    //     "appointments": [
    //         {
    //             "allDay": null,
    //             "client": {
    //                 "email": "tom@gmail.com",
    //                 "id": 1
    //             },
    //             "clientFK": 1,
    //             "endDate": "2024-02-18T16:30:00.000Z",
    //             "exDate": null,
    //             "id": 1,
    //             "providerFK": 1,
    //             "rRule": null,
    //             "startDate": "2024-02-18T14:30:00.000Z",
    //             "title": "Well Check-Up"
    //         },
    //         {
    //             "allDay": null,
    //             "client": {
    //                 "email": "tom@gmail.com",
    //                 "id": 1
    //             },
    //             "clientFK": 1,
    //             "endDate": "2024-02-19T16:30:00.000Z",
    //             "exDate": null,
    //             "id": 2,
    //             "providerFK": 1,
    //             "rRule": null,
    //             "startDate": "2024-02-19T14:30:00.000Z",
    //             "title": "Follow Up"
    //         }
    //     ],
    //     "clients": [
    //         {
    //             "client": {
    //                 "email": "tom@gmail.com",
    //                 "id": 1
    //             }
    //         },
    //         {
    //             "client": {
    //                 "email": "jerry@gmail.com",
    //                 "id": 2
    //             }
    //         }
    //     ],
    //     "email": "velma@gmail.com",
    //     "id": 1,
    //     "provider_code": "100000000"
    // })
    //-----------------------------------------------------------------------------------------------------------------

    // console.log(appointments)
    function formatDate(date) {
        const pieces = date.split(",")
        return new Date(parseInt(pieces[0]), parseInt(pieces[1]), parseInt(pieces[2]), parseInt(pieces[3]), parseInt(pieces[4]))
    }

    // useEffect(() => {
    //     // auto-login
    //     fetch(`/${sessionStorage.type}_check_session`).then((r) => {
    //         if (r.ok) {
    //             r.json().then((u) => {
    //             setUser(u)
    //             const formattedAppointments = []
    //             const old_appointments = u.appointments
    //             old_appointments.forEach((ap) => {
    //             const new_ap = ap
    //             new_ap.startDate = formatDate(ap.startDate)
    //             if (ap.endDate.length) {new_ap.endDate = formatDate(ap.endDate)}
    //             formattedAppointments.push(new_ap)
    //     })
    //     setAppointments(formattedAppointments)
    //             });
    //         }
    //     });
    // }, [setUser]);

    // console.log(user)

    if (sessionStorage.type === "provider") {
        return (
            <div className="App">
                <Switch>
                    {/* <Route exact path = "/provider-login"> <Login type={"provider"} setUser={setUser}/> </Route> */}
                    {/* <Route exact path = "/provider-portal"> 
                        <NavBar type={"provider"} user={user} setUser={setUser}/>
                    </Route> */}
                    <Route exact path = "/">
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
                </Switch>
            </div>
        )
    }

    else if (sessionStorage.type === "client") {
        return (
            <div className="App">
                <NavBar/>
                <Switch>
                    <Route exact path="/"> < PatientSelectProvider setProviderOffice={setProviderOffice}/> </Route>
                    <Route exact path="/patient-portal"> < PatientPortal providerOffice={providerOffice}/> </Route>
                    <Route exact path="/account"> < Account /></Route>
                </Switch>
            </div>
        )
    }

    // return (
    //     <div className="App">
    //         <Switch>
    //             <Route exact path = {["/", "/provider-login"]}> <Login type={"provider"} setAppointments={setAppointments}/> </Route>
    //             <Route exact path = "/client-login"> <Login type={"client"} setAppointments={setAppointments}/> </Route>
    //         </Switch>
    //     </div>
    // )
}

export default App;