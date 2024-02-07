import React from "react";
import NavBar from "./NavBar";
// import components
import { Switch, Route } from 'react-router-dom';

function App() {

    return (
        <div className="App">
            <NavBar />
            <Switch>
                <Route exact path="/"> </Route>
                <Route exact path="/path1">  </Route>
            </Switch>
        </div>
    );
}

export default App;