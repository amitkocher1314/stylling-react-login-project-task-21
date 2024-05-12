// Write your code here:
import React, {useState,useEffect} from "react";
const AuthContext = React.createContext(
  {
    isLoggedIn:false,
    onLogout:()=>{},
    onLogin : (uEmail,uPassword)=>{ }
   }
);

export const AuthContextProvider = (props)=>{
    
        const [isLoggedIn, setIsLoggedIn] = useState(false);

            useEffect(()=>{
            const statusValue =   localStorage.getItem('isLoggedIn')
            if(statusValue === '1'){
                setIsLoggedIn(true)
            } 
            },[])
            const loginHandler = (email, password) => {
                // We should of course check email and password
                // But it's just a dummy/ demo anyways
                setIsLoggedIn(true);
                localStorage.setItem('isLoggedIn','1')
            };

            const logoutHandler = () => {
                setIsLoggedIn(false);
                localStorage.removeItem('isLoggedIn')
            };


            return(  <AuthContext.Provider value={{
                isLoggedIn: isLoggedIn,
                onLogin : loginHandler,
                onLogout:  logoutHandler,
              }} >
                {props.children}</AuthContext.Provider>
                )
}
export default AuthContext;