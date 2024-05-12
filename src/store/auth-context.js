// Write your code here:
import React from "react";
const AuthContext = React.createContext(
  {
    isLoggedIn:false,
    onLogout:()=>{},
   }
);
export default AuthContext;