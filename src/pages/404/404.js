import React, { useEffect } from 'react'
import styles from './404.module.css'
import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {

    // using useNavigate hook to going back to the previous page
    const navigate = useNavigate() 

    // setting setTimeout to call navigate after 2s once the conponent mount 
    useEffect(()=>{
        setTimeout(()=>{
            navigate(-1)
        },2000)
    },[navigate])

  return (
    <>
    <div className={styles.container}>
        <h1>OOPs! Page Not Found.</h1>
    </div>
    </>
  )
}

export default ErrorPage