import React from 'react'
import styles from "./productCard.module.css"
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCartItemAsync } from '../../redux/reducers/productReducer';
import { toast } from 'react-toastify';

const ProductCard = ({product}) => {
    const {image, title, price} = product; // destructuring from Product
    const user = localStorage.getItem("uid"); // getting userId from local storage
    const dispatch = useDispatch();

    const addItemNotify = (msg)=>toast.success(msg, {
      position: "top-center",
      autoClose: 3000,
    })

  return (
    <>
        <div className={styles.container}>
            <div className={styles.img}>
                <img src={image} alt="product"/>
            </div>
            <h2 className={styles.title}>{title}</h2>
            <h2 className={styles.price}>&#8377; {price}</h2>
            {
              !user?
              <Link to="/signin">
                <button className={styles.btn}>Add To Cart</button>
              </Link>
              :
              <button className={styles.btn} onClick={()=>dispatch(addCartItemAsync({product, addItemNotify}))}>Add To Cart</button>
            }
        </div>
    </>
  )
}

export default ProductCard