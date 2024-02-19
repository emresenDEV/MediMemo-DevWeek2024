import React, { useEffect, useState } from "react";
import { Switch, Route } from 'react-router-dom';
// import components
import NavBar from "./NavBar";
import Login from "./Login";
import PatientPortal from "./PatientPortal";
// import ProviderPortal from "./ProviderPortal";
import { useUserContext } from '../UserContext';
import ClientsList from "./ClientsList";
import AddAClient from "./AddAClient";
import EditSurvey from "./EditSurvey";
import Inbox from "./Inbox";
import ReactScheduler from "./ReactScheduler";
import Test from "./Test";
import DataEntry from "./DataEntry";


function App() {
    const { user, setUser } = useUserContext();

    useEffect(() => {
        // auto-login
        fetch(`/${sessionStorage.type}_check_session`).then((r) => {
            if (r.ok) {
                r.json().then((u) => {
                setUser(u)
                });
            }
        });
    }, [setUser]);

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
                        <Test/>
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
                <Route exact path = {["/", "/provider-login"]}> <Login type={"provider"} setUser={setUser}/> </Route>
                <Route exact path = "/client-login"> <Login type={"client"} setUser={setUser}/> </Route>
            </Switch>
        </div>
    )
}

export default App;