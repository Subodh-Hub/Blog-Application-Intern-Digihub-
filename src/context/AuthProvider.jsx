  import { createContext, useState } from "react";
  const AuthContext = createContext({});
  const URL = "/getUser-auth"
  export const AuthProvider = ({ children }) => {
    const [userInf, setUserInf] = useState({});
    
    return (
      <AuthContext.Provider value={{ userInf, setUserInf }}>
        {children}
      </AuthContext.Provider>
    );
  };

  export default AuthContext;
