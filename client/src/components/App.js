import React from "react";
// import components
import {Route, Switch} from 'react-router-dom';

import NavBar from "./NavBar";

function App() {

    return (
        <div className="App">
            <NavBar />
            <Switch>
                <Route exact path="/"> </Route> 
                {/* <Route exact path="/path1">  </Route> */
}
            </Switch>
        </div>
    );
            }

            export default App;