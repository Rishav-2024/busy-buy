import React, { useEffect } from 'react'
import styles from "./cart.module.css"
import CartCard from '../../components/cartProductCard/CartCard';
import PulseLoader from "react-spinners/PulseLoader";
import { useDispatch, useSelector } from 'react-redux';
import { loggedIn } from '../../redux/reducers/userReducer';
import { getUserCartItemsAsync, purchaseProductsAsync } from '../../redux/reducers/productReducer';
import { productSelector} from '../../redux/reducers/productReducer';
import { toast } from 'react-toastify';

const Cart = () => {

  const {cartItems, loading} = useSelector(productSelector); // getting the cartItems & loading state
  const dispatch = useDispatch(); // Used dispatch to trigger action to mutate the state

  // useEffect is used to check the user already loggedIn
  useEffect(()=>{
    if(localStorage.getItem('login')){
        dispatch(loggedIn())
    }
  },[dispatch])

  // calling the async function from product reducer to get all the cart Items
  useEffect(()=>{
    dispatch(getUserCartItemsAsync())
  },[dispatch])

  // for notification
  const notify = (msg)=>toast.success(msg, {
    position: "top-center",
    autoClose: 3000,
  });
  
  // Calculating total Price of all the products added in the cart 
  const totalPrice = cartItems.reduce((acc, cur)=> acc+(cur.price * cur.quantity), 0) 


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
        cartItems.length < 1
      )?(
        <div className={styles.noProduct}>
          <h1>No Product Added Yet!</h1>
        </div>
      ):(
        <div className={styles.container}>
          <div className={styles.products}>
          {
            cartItems.map((item, i)=>(
              <CartCard key={i} item={item}/>
            ))
          }
          </div>
          <div className={styles.buyContainer}>
              <h2>Total Price: &#x20B9; {totalPrice}</h2>
              <button className={styles.purchaseBtn} onClick={()=>dispatch(purchaseProductsAsync({notify, cartItems}))}>Purchase</button>
          </div>
        </div>
      )
    }
    </>
  )
}

export default Cart