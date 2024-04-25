import ProductCard from '../../components/card/ProductCard';
import styles from "./home.module.css"
import PulseLoader from "react-spinners/PulseLoader";
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loggedIn } from '../../redux/reducers/userReducer';
import { filterProducts, getAllProductAsync, productSelector, setCategories, setSliderValue } from '../../redux/reducers/productReducer';

const Home = () => {

  const searchRef = useRef(); // To get the input value

  const {products, 
        loading, 
        filteredProducts, 
        sliderValue, 
        categories} = useSelector(productSelector); // Getting state variables

  const dispatch = useDispatch();  // Used dispatch to trigger action to mutate the state

  // useEffect is used to check the user already loggedIn
  useEffect(()=>{
    if(localStorage.getItem('login')){
        dispatch(loggedIn())
    }
  },[dispatch])

  // calling the async function from product reducer to get all the products from Firebase
  useEffect(()=>{
    dispatch(getAllProductAsync())
  },[dispatch])


  useEffect(()=>{
    filterProductBySearch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[sliderValue, categories]);

  // Handling Slider
  const handlePriceRange = (e)=>{
    const value = parseInt(e.target.value);
    dispatch(setSliderValue(value))
  }

    // Handling Category filter
  const handleCategory = (e)=>{
    const category = e.target.value;
    dispatch(setCategories(category))
  }


  const filterProductBySearch = ()=>{
    const searchTitle = searchRef.current?(searchRef.current.value).toLowerCase():""
    const filtered = products.filter((p)=> 
        p.title.toLowerCase().includes(searchTitle) && 
        p.price <= sliderValue && 
        (categories[p.category] || Object.values(categories).every(value => !value))
    );
    dispatch(filterProducts(filtered))
    }

  return (
    <>
    {
      loading?(<div className={styles.loader}>
        <PulseLoader 
          size={20}/>
        </div>
        ):(
        <div className={styles.container}>
          <div className={styles.innerContainer}>
            <div className={styles.filter}>
              <div className={styles.search}>
                <input type='text' name='searchBar' placeholder='Search By Name. . .' ref={searchRef} onInput={filterProductBySearch} />
              </div>
              <h3 className={styles.filterHeading}>Filter</h3>
              <p>Price: <span>{sliderValue}</span></p>
              <input type="range" id="slider" name="slider" min="1" max="20000" value={sliderValue} onChange={handlePriceRange} />
              <h3 className={styles.category}>Category</h3>
              <div className={styles.checkbox}>
                <input type="checkbox" id="Men's Clothing" name="Men's Clothing" value="men's clothing" onChange={handleCategory}/>
                <label htmlFor="Men's Clothing">Men's Clothing</label>
              </div>
              <div className={styles.checkbox}>
                <input type="checkbox" id="Women's Clothing" name="Women's Clothing" value="women's clothing" onChange={handleCategory}/>
                <label htmlFor="Women's Clothing">Women's Clothing</label>
              </div>
              <div className={styles.checkbox}>
                <input type="checkbox" id='Jewelery' name="Jewelery" value="jewelery" onChange={handleCategory}/>
                <label htmlFor="Jewelery">Jewelery</label>
              </div>
              <div className={styles.checkbox}>
                <input type="checkbox" id='Electronics' name="Electronics" value="electronics" onChange={handleCategory}/>
                <label htmlFor="Electronics">Electronics</label>
              </div>
            </div>
            <div className={styles.products}>
              {
                filteredProducts.map((product, i)=>(
                  <ProductCard key={i} product={product} />
                  ))
              }
            </div>
          </div>
        </div>
      )
    }
    
    </>
  )
}

export default Home
