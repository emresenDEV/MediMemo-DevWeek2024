import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function DataSettings() {
  const history = useHistory()

  function newInsurance(){
    setTimeout(()=>{
      history.push("/provider-portal/data-settings/new-insurance")
    }, 125)
  }
  
  function viewInsurance(e){
    const fetchId = e.target.className //used to fetch the settings for that insurance that you've laid out
    setTimeout(() => {
      history.push(`data-settings/insurance-viewer`)
    }, 125)
  }

  function newDataForm(){
    setTimeout(()=>{
      history.push("/provider-portal/data-settings/new-data-form")
    }, 125)
  }

  function viewCustomizer(e){
    const fetchId = e.target.className
    setTimeout(() => {
      history.push(`data-settings/customize-data-entry`)
    }, 125)
  }

  return (
    <div id="data-settings">
      <div id="ds/insurances">
        <h3>
          Manage Your Accepted Insurances
        </h3>
        <button onClick={newInsurance}>New</button>
        <ul>
          <li><span className="1" onClick={viewInsurance}>Medicare</span></li>
          <li><span className="2" onClick={viewInsurance}>Blue Cross Blue Shield</span></li>
        </ul>
      </div>
      <div id="ds/data-entry-forms">
        <h3>
          Customize Your Data Entry Forms
        </h3>
        <button onClick={newDataForm}>New</button>
        <ul>
          <li><span className="1" onClick={viewCustomizer}>Informed Consent</span></li>
          <li><span className="2" onClick={viewCustomizer}>New Patient</span></li>
          <li><span className="3" onClick={viewCustomizer}>Well Visit</span></li>
          <li><span className="4" onClick={viewCustomizer}>Sick Visit</span></li>
        </ul>
      </div>
    </div>
  )
}

export default DataSettings