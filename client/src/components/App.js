import React, { useEffect, useState } from "react";
import { Switch, Route } from 'react-router-dom';
// import components
import NavBar from "./NavBar";
import Login from "./Login";
import PatientPortal from "./PatientPortal";
import ProviderPortal from "./ProviderPortal";
import { useUserContext } from '../UserContext';

function App() {
    const { user, setUser } = useUserContext();
    const [ appointments, setAppointments ] = useState([])


    function formatDate(date) {
        const pieces = date.split(",")
        return new Date(parseInt(pieces[0]), parseInt(pieces[1]), parseInt(pieces[2]), parseInt(pieces[3]), parseInt(pieces[4]))
    }

    useEffect(() => {
        const userData = async () => {
            const response = await fetch(`/${sessionStorage.type}_check_session`)
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
                    console.log(formattedAppointments)
                    const new_u = u
                    new_u.appointments = formattedAppointments
                    setUser(new_u)
                    setAppointments(formattedAppointments)
                })
            }
        }
        userData()
    }, [setUser])


    if (sessionStorage.user_id) {
        return (
            <div className="App">
                <Switch>
                    <Route exact path = "/provider-login"> <Login type={"provider"} setUser={setUser}/> </Route>
                    <Route exact path = "/client-login"> <Login type={"client"} setUser={setUser}/> </Route>
                    <Route exact path = "/provider-portal"> 
                        <NavBar type={"provider"} user={user} setUser={setUser}/>
                        <ProviderPortal type={"provider"} appointments={appointments} setAppointments={setAppointments}/>
                    </Route>
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
                <Route exact path = {["/", "/provider-login"]}> <Login type={"provider"} setUser={setUser}/> </Route>
                <Route exact path = "/client-login"> <Login type={"client"} setUser={setUser}/> </Route>
            </Switch>
        </div>
    )
}

export default App;