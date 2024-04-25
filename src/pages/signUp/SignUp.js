import React, { useRef } from 'react'
import styles from "./signup.module.css"
import { Link, useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import {toast} from 'react-toastify';
import { useDispatch } from 'react-redux';
import {userSignUpAsync } from '../../redux/reducers/userReducer';

const SignUp = () => {

  // Used useRef to get the form data
  const userNameRef = useRef()
  const userEmailRef = useRef()
  const userPasswordRef = useRef()
  const navigate = useNavigate()

  const dispatch = useDispatch()

  // Used Tostify for Notification
  const signUpNotify = ()=>toast.success("Registered Successfully!", {
        position: "top-right",
        autoClose: 3000,
      })
  
// Used Tostify for Error Notification
  const errorNotify = (msg)=>toast.error(msg, {
        position: "top-right",
        autoClose: 3000,
      })

// Handle sign un function by dispatching the action to user Reducer
  const handleSignUp = async(e)=>{
    e.preventDefault();
    const name = userNameRef.current.value;
    const email = userEmailRef.current.value;
    const password = userPasswordRef.current.value;

    if(password.length < 6){
      errorNotify("password must have at least 6 charactors")
      return
    }

    localStorage.setItem("userName", name); // saving name in the local storage in need in future
    
    dispatch(userSignUpAsync({email, password, signUpNotify, errorNotify, navigate}))
    reset()
  }

  const reset = ()=>{
    userNameRef.current.value = "";
    userEmailRef.current.value = "";
    userPasswordRef.current.value = "";
  }

  return (
    <>
      <div className={styles.container}>
          <div className={styles.formContainer}>
            <h1>Sign Up</h1>
            <form className={styles.form} onSubmit={handleSignUp}>
              <input type='text' name='userName' placeholder='Enter Name' required ref={userNameRef}/>
              <input type='email' name='userEmail' placeholder='Enter Email' required ref={userEmailRef}/>
              <input type='password' name='userPassword' placeholder='Enter Passowrd' required ref={userPasswordRef}/>
              <button type='submit' className={styles.btn}>Submit</button>
              <div className={styles.alreadySignup}>
                <Link to="/signin">
                  <h4>Already signed up?</h4>
                </Link>
              </div>
            </form>
          </div>
      </div>
    </>
  )
}

export default SignUp