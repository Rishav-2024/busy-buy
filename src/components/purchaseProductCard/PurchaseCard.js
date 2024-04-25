import React from 'react'
import styles from "./purchaseCard.module.css"

const PurchaseCard = ({order}) => {

    // Calculating total oder value using reduce function
    const totalOrderValue = order.cartItems.reduce((acc, cur)=> acc+ (cur.price * cur.quantity), 0)
    
  return (
    <>
    <div className={styles.container}>
        <h2>ORDER PLACED: {order.orderDate}</h2>
        <table>
            <thead>
            <tr>
                <th className={styles.title}>Title</th>
                <th className={styles.price}>Price</th>
                <th className={styles.qty}>Quantity</th>
                <th className={styles.totalPrice}>Total Price</th>
            </tr>
            </thead>
            <tbody>
            {
                order.cartItems.map((o, i)=>(
                <tr key={i} className={styles.products}>
                    <td className={styles.title}><p className={styles.prodTitle}>{o.title}</p></td>
                    <td className={styles.price}>{o.price}</td>
                    <td className={styles.qty}>{o.quantity}</td>
                    <td className={styles.totalPrice}>{o.price * o.quantity}</td>
                </tr>
                ))
            }
            <tr className={styles.totalContainer}>
                <td  colSpan="3"> Total Order Cost:</td>
                <td className={styles.total}>{totalOrderValue}</td>
            </tr>
            </tbody>
        </table>
        </div>
    </>
  )
}

export default PurchaseCard