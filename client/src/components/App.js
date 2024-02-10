import React from "react";
import NavBar from "./NavBar";
import Login from "./Login";
// import components
import { Switch, Route } from 'react-router-dom';

function App() {
    // javascript here

    // return jsx
    return (
        <div className="App">
            <NavBar />
            <Switch>
                {/* <Route exact path="/portal"> <Portal/> </Route> */}
                <Route exact path="/login"> <Login/> </Route>
                {/* <Route exact path="/path1">  </Route> */}
            </Switch>
        </div>
    );
}

export default App;