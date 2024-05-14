// Write your code at relevant places in the code below:

import React, { useState,useEffect,useContext,useReducer,useRef} from "react";
import AuthContext from "../../store/auth-context";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

const emailReducer = (state,action) =>{
  if(action.type==='USER_INPUT'){
     return{ value: action.payload, isValid: action.payload.includes('@')};
  }
  if(action.type === "INPUT_BLUR"){
    return {value:state.value, isValid:state.value.includes('@')}
  }
   return {value:'', isValid:false};
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
   return { value: action.payload, isValid: action.payload.trim().length > 6 };
 }
  if (action.type === "INPUT_BLUR") {
   return { value: state.value, isValid: state.value.trim().length > 6  };
 }
 return { value: "", isValid: false };
}



const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

const[emailState,dispatchEmail] = useReducer(emailReducer,{
  value:'' , 
  isValid: null

});

const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
  value: "",
  isValid: null,
});

  //VIDEO 3 OBJECT-DESTRUCTING-METHOD-USED

  const {isValid:emailIsValid} = emailState;
  const {isValid:passwordIsValid} = passwordState;

const emailInputRef = useRef();
const passwordInputRef = useRef();

  useEffect(()=>{
 const timer =  setTimeout(()=>{
    setFormIsValid(
      emailIsValid && passwordIsValid  
  )
  },500)

  return(()=>
   { clearTimeout(timer)}
  );
},[emailIsValid,passwordIsValid])
  
  const emailChangeHandler = (event) => {
  //  setEnteredEmail(event.target.value);
 dispatchEmail({type:'USER_INPUT',payload:event.target.value});
   
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type:'USER_INPUT',payload:event.target.value});

    
  };

  const validateEmailHandler = () => {
   // setEmailIsValid(emailState.isValid);
   dispatchEmail({type: "INPUT_BLUR"});
  };

  const validatePasswordHandler = () => {
    //setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({type: "INPUT_BLUR"})
  };

  const submitHandler = (event) => {
    event.preventDefault();
   if(formIsValid){
    authCtx.onLogin(emailState.value, passwordState.value);
   }
   else if(!emailIsValid){
    emailInputRef.current.focus();
   }
   else{
   passwordInputRef.current.focus();
   }
   
  };
   const authCtx = useContext(AuthContext);
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input id="email" type="email" label="E-Mail" 
        value={emailState.value}
        onChange={emailChangeHandler}
        onBlur={validateEmailHandler}
        isValid={emailIsValid}
        ref={emailInputRef}
        />
      <Input 
      id="password" 
      type="password"
       label="Password" 
        value={passwordState.value}
        onChange={passwordChangeHandler}
        onBlur={validatePasswordHandler}
        isValid={passwordIsValid}
        ref={passwordInputRef}
        />
        
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
