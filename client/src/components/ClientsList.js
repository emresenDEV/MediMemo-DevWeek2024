import React, { useState, useEffect }  from "react";
import { useUserContext } from "../UserContext";
import ClientTr from "./ClientTr";

function ClientsList() {
  const { user, setUser } = useUserContext() //global state
  const [ clientsList, setClientsList ] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect (() => { //check that the data has compiled and been sent over
    if (user === null) {
      setIsLoading(true)
    }
    else{ //if the data has been received, format it for this page
      setIsLoading(false)
      const formattedClients = user.clients.map(clientObj => clientObj.client)
      console.log(formattedClients)
      setClientsList(formattedClients)
    }
  }, [user])

  if (isLoading) { //loading screen
    return (
      <p>loading......</p>
    )
  }

  const clients = clientsList.map(clientData => <ClientTr clientData={clientData}/>)

  return(
    <div className="clients-list">
      <div>
        <button>Add a Client</button>
      </div>
      <div>
        <button>Edit Client Survey</button>
      </div>
      <div>
        <h2>Clients List</h2>
        <table style={{border: "1px solid black"}}>
          <tr >
            <th style={{"text-align": "left"}}>Initials</th>
            <th style={{"text-align": "left"}}>Name</th>
            <th style={{"text-align": "left"}}>DOB</th>
            {/* <th style={{"text-align": "left"}}>SSN</th> */}
            <th style={{"text-align": "left"}}>Email</th>
          </tr>
          {clients}
        </table>
      </div>
    </div>
  )
}

export default ClientsList