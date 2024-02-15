import React, { useState } from "react";
import { Switch, Route } from 'react-router-dom';
// import components
import NavBar from "./NavBar";
import Login from "./Login";
import PatientPortal from "./PatientSelectProvider";
import ProviderPortal from "./ProviderPortal";

function App() {
    // javascript here
    // const [user, setUser] = useState("")
    const [user, setUser] = useState({type:"patient"})
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
        <>
            <NavBar/>
            <PatientPortal/>
        </>
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