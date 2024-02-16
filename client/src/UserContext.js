import React, {createContext, useContext, useState} from 'react';

// Create the context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({children}) => {
  const [users, setUsers] = useState(null);

  return (
    <UserContext.Provider value={{ users, setUsers }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook for using the context
export const useUserContext = () => {
  return useContext(UserContext);
};