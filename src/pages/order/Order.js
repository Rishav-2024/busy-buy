import React, { useEffect } from 'react'
import PurchaseCard from '../../components/purchaseProductCard/PurchaseCard'
import styles from "./order.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { loggedIn } from '../../redux/reducers/userReducer'
import { getOrdersAsync, productSelector } from '../../redux/reducers/productReducer'
import { PulseLoader } from 'react-spinners'

const Order = () => {

  let {orders, loading} = useSelector(productSelector); // Getting state variable

  const dispatch = useDispatch(); // Used dispatch to trigger action to mutate the state

  // useEffect is used to check the user already loggedIn
  useEffect(()=>{
    if(localStorage.getItem('login')){
        dispatch(loggedIn())
    }
  },[dispatch])

  // calling the async function from product reducer to get all the user orders from Firebase
  useEffect(()=>{
    dispatch(getOrdersAsync())
  },[dispatch])

  return (
    <>
      {
        (loading)?
        (
          <div className={styles.loader}>
            <PulseLoader
            size={20}/>
          </div>
        ):(
          <div className={styles.container}>
          {
            (orders.length<1)?<h1>No Order Found!</h1>:<h1>Your Orders</h1>
          }  
          {
            orders.map((order, i)=>(
              <PurchaseCard key={i} order={order}/>
            ))
          }
      </div>
        )
      }
    </>
  )
}

export default Order