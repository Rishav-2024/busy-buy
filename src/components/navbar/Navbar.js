import React, { useEffect } from "react"
import styles from "./navbar.module.css"
import { NavLink, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { loggedIn, logout, userSelector } from "../../redux/reducers/userReducer"

const Navbar = () => {


  // const {handleLogout} = useUserContext()  // destructuring from useUserContext value
  const {login} = useSelector(userSelector);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(localStorage.getItem('login')){
        dispatch(loggedIn())
    }
  },[dispatch])

  return (
    <>
        <div className={styles.container}>
            <div className={styles.logo}>
              <h1>Busy Buy</h1>
            </div>
            <div className={styles.links}>
              <NavLink to="/">
                <p>Home</p>
              </NavLink>
              {
                login?(
                <>
                <NavLink to="myorders">
                  <p>My orders</p>
                </NavLink>
                <NavLink to="/cart">
                  <p>Cart</p>
                </NavLink>
                <NavLink to="/" onClick={()=>dispatch(logout())}>
                  <p>Logout</p>
                </NavLink>
                </>
                )
                :
              <NavLink to="/signin">
                <p>SignIn</p>
              </NavLink>
              }
            </div>
        </div>
        <Outlet />
    </>
  )
}

export default Navbar