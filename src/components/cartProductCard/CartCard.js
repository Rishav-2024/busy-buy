import React from 'react'
import styles from "./cartCard.module.css"
import { toast } from 'react-toastify'
import { deleteCartItemAsync, updateQuantityAsync } from '../../redux/reducers/productReducer'
import { useDispatch } from 'react-redux'

const CartCard = ({item}) => {

    const dispatch = useDispatch()

    const notify = (msg)=>toast.success(msg, {
        position: "top-center",
        autoClose: 3000,
    });

    const incr = {
        cartId:item.cartId,
        qty: 1,
        notify
    }
    const decr = {
        cartId:item.cartId,
        qty: -1,
        notify
    }

    const removeItem = {
        cartId:item.cartId,
        notify
    }

  return (
    <>
    <div className={styles.product}>
        <div>
            <img src={item.image} alt='product'/>
        </div>
        <div>
            <h3>{item.title}</h3>
            <div className={styles.productPrice}>&#x20B9; {item.price}</div>
        </div>
        <div>
            <div className={styles.qtyContainer}>
                <div className={styles.decr} onClick={()=>dispatch(updateQuantityAsync(decr))}>-</div>
                <div className={styles.productQty}>{item.quantity}</div>
                <div className={styles.incr} onClick={()=>dispatch(updateQuantityAsync(incr))}>+</div>
            </div>
            <button className={styles.removeBtn} onClick={()=> dispatch(deleteCartItemAsync(removeItem))}>Remove</button>
        </div>
    </div>
    </>
  )
}

export default CartCard