import React from "react";
import { useHistory } from 'react-router-dom';

function PatientSelectProvider({setProviderOffice}) {
  const history = useHistory();
  const user = {
    firstName:"Jenny", 
    lastName:"Smith",
    photo: 'https://images.pexels.com/photos/3812742/pexels-photo-3812742.jpeg'
  }
  const defaultPhoto = <i class="fa fa-user-circle-o" aria-hidden="true"></i>
    // console.log(providerOffice)

  const providerLocation = {
    providerOfficeName: 'Hillcroft Physicians', 
    providerCity: 'Houston', 
    providerState: 'TX'
  }
  function handleClick(e) {
    console.log('clicked')
    console.log(e.target)
    setProviderOffice(providerLocation)
    setTimeout(() => {
      history.push("/patient-portal")
    }, 125)
  }
  return(
    
    <div className='flexGrid'>
      <div className='all'>
      <img 
            src={user.photo || defaultPhoto}
            alt = {'{user.firstName} {user.lastName}'}
            className="userProfilePic"
        />
        <br/>
      <h2>Welcome</h2>
      <h1>{user.firstName} {user.lastName}</h1>
      <hr className="dividerLine" />
      <br/>
      {/* List ALL registered providers for this patient. MUST be at least ONE. User selects desired Provider's Office name to access their provider's patient portal */}
        <div className='gridContainer'>
          <br/>
          <div className='gridItem' onClick={handleClick}>[{providerLocation.providerOfficeName} - {providerLocation.providerCity}, {providerLocation.providerState}]</div>
        </div>
        </div>
    </div>
  )
}
export default PatientSelectProvider;
// replace client with provider<-------------------FIXME: 
// import React, { useState, useEffect }  from "react";
// import { useUserContext } from "../UserContext";
// import ProviderTr from "./ProviderTr";

// function ProvidersList() {
//   const { provider, setProvider } = useProviderContext() //global state
//   const [ providerList, setProvidersList ] = useState([])
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect (() => { //check that the data has compiled and been sent over
//     if (user === null) {
//       setIsLoading(true)
//     }
//     else{ //if the data has been received, format it for this page
//       setIsLoading(false)
//       const formattedProviders = user.providers.map(providerObj => providerObj.provider)
//       console.log(formattedProviders)
//       setProvidersList(formattedProviders)
//     }
//   }, [provider])

//   if (isLoading) { //loading screen
//     return (
//       <p>loading......</p>
//     )
//   }

//   const providers = providersList.map(providerData => <ProviderTr providerData={providerData}/>)

//   return(
//     <div className="clients-list">
//       <div>
//         <button>Add a Client</button>
//       </div>
//       <div>
//         <button>Edit Client Survey</button>
//       </div>
//       <div>
//         <h2>Clients List</h2>
//         <table style={{border: "1px solid black"}}>
//           <tr >
//             <th style={{"text-align": "left"}}>Initials</th>
//             <th style={{"text-align": "left"}}>Name</th>
//             <th style={{"text-align": "left"}}>DOB</th>
//             {/* <th style={{"text-align": "left"}}>SSN</th> */}
//             <th style={{"text-align": "left"}}>Email</th>
//           </tr>
//           {clients}
//         </table>
//       </div>
//     </div>
//   )
// }

// export default patientSelectProvider;