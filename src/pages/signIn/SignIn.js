import React, { useRef } from 'react'
import styles from "./signin.module.css"
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useDispatch} from 'react-redux';
import { userLoginAsync } from '../../redux/reducers/userReducer';

const SignIn = () => {

   // Used useRef to get the form data
  const userEmailRef = useRef();
  const userPasswordRef = useRef();

  const dispatch = useDispatch()
  
  const navigate = useNavigate();
  
  // Used Tostify for Notification
  const signUpNotify = ()=>toast.success("Successfully signed In!", {
    position: "top-center",
    autoClose: 3000,
  })
  
  // Used Tostify for Error Notification
  const errorNotify = ()=>toast.error("Wrong Credential!", {
    position: "top-center",
    autoClose: 3000,
  })

  // Handle sign in function by dispatching the action to user Reducer
  const handleSignIn = async(e)=>{
    e.preventDefault()
    const email = userEmailRef.current.value
    const password = userPasswordRef.current.value

    // Firebase authentication function for Sign in
    dispatch(userLoginAsync({email, password, navigate, signUpNotify, errorNotify})) 
    reset()
  }

  const reset = ()=>{
    userEmailRef.current.value = "";
    userPasswordRef.current.value = "";
  }



  return (
    <>
      <div className={styles.container}>
          <div className={styles.formContainer}>
            <h1>Sign In</h1>
            <form className={styles.form} onSubmit={handleSignIn}>
              <input type='email' name="userEmail" placeholder='Enter Email' required ref={userEmailRef}/>
              <input type='password' name='userPassword' placeholder='Enter Passowrd' required ref={userPasswordRef}/>
              <button type='submit' className={styles.btn}>Submit</button>
              <div className={styles.alreadySignup}>
                <Link to="/signup">
                <h4>Not signed up?</h4>
                  {/* <button type='submit'>Sign Up</button> */}
                </Link>
              </div>
            </form>
          </div>
      </div>
    </>
  )
}

export default SignIn