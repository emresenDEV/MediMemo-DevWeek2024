import React, { useState } from "react";
import { Switch, Route, useHistory } from 'react-router-dom';
// import components
import NavBar from "./NavBar";
import Login from "./Login";
import PatientSelectProvider from "./PatientSelectProvider";
import ProviderPortal from "./ProviderPortal";
import PatientPortal from "./PatientPortal";
import Account from "./Account";

function App() {
    // javascript here
    // const [user, setUser] = useState("")
    const [user, setUser] = useState({type:"patient"})
    const [providerOffice, setProviderOffice] = useState({providerOfficeName: 'Office Name', providerCity: 'City', providerState: 'State'})
    const history = useHistory();
    history.push('/patient-select-provider')
    // const [user, setUser] = useState({type:"provider"})
    // return jsx

    if(!user) return (
        <div className="App">
            <Switch>
                <Route exact path = {["/", "/provider-login"]}> <Login type={"provider"}/> </Route>
                <Route exact path = "/patient-login"> <Login type={"client"}/> </Route>
                {/* <Route exact path = {["/", "/provider-login"]}> <Login type={"provider"}/> </Route>
                <Route exact path = "/patient-login"> <Login type={"patient"}/> </Route> */}
            </Switch>
        </div>
    )

    // if(!user) return (
    //     <div className="App">
    //         <Login/>
    //     </div>
    // )

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

    return (
        <div className="App">
            <NavBar />
            <Switch>
                {/* <Route exact path="/portal"> <Portal/> </Route> */}
                <Route exact path="/"> </Route>
                {/* <Route exact path="/path1">  </Route> */}
            </Switch>
        </div>
    );
}

export default App;