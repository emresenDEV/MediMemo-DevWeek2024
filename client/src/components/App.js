import React, {useState} from "react";
import {Route, Switch} from 'react-router-dom';

import {useUserContext} from '../UserContext';

import Login from "./Login";
// import components
import NavBar from "./NavBar";
import PatientPortal from "./PatientPortal";
import ProviderPortal from "./ProviderPortal";

function App() {
  const {users, setUsers} = useUserContext();

  // sessionStorage.clear()
  console.log(sessionStorage.user_id)

  if (sessionStorage.user_id) {
    return (
        <div className = "App"><Switch><Route exact path = "/provider-portal">
        <NavBar type = {"provider"} users = {users} setUsers =
         {
           setUsers
         } />
                        <ProviderPortal type={"provider"} users={users} setUsers={setUsers}/>
        </Route>
                    <Route exact path = "/client - portal "> 
             < NavBar type = {"client"} users = {users} setUsers =
         {
           setUsers
         } />
                        <PatientPortal type={"client"} users={users} setUsers={setUsers}/>
        </Route>
                </Switch>
        </div>
        )
    }

    return (
        <div className="App">
            <Switch>
                <Route exact path = {["/", "/provider-login"]}> <Login type={"provider"} setUsers={setUsers}/>
        </Route>
                <Route exact path = "/client - login
             "> <Login type={" client "} setUsers={setUsers}/> </Route>
         < /Switch>
        </div>)
  }

  export default App;