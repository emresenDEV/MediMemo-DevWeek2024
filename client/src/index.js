import React from 'react';
import ReactDOM from 'react-dom/client';

import './stylesheets/index.css';
import './stylesheets/login.css';
import './stylesheets/portals.css';
import "./stylesheets/providerPortal.css";
import "./stylesheets/table.css"
import "./stylesheets/dataSettings.css"

import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './UserContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
