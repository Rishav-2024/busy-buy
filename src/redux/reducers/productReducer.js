import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore"
import db from "../../firebase.config"

// initial state
const initialState = {
    products:[],
    filteredProducts:[],
    sliderValue:13000,
    loading:true,
    searchRef:"",
    categories:{
        "men's clothing":false,
        "women's clothing":false,
        "jewelery":false,
        "electronics":false,
    },
    cartItems:[],
    orders:[],
}

// getting all the products from firebase
export const getAllProductAsync = createAsyncThunk("addProducts", async(arg, thunkAPI)=>{
    thunkAPI.dispatch(loader(true))
    thunkAPI.dispatch(setSliderValue(13000))
    const fetchedProd = []
    try{
        const querySnapshot = await getDocs(collection(db, "products"));
        querySnapshot.forEach((doc) => {
            fetchedProd.push({productId:doc.id, ...doc.data()})
        });
        thunkAPI.dispatch(addProducts(fetchedProd))
        thunkAPI.dispatch(filterProducts(fetchedProd))
        thunkAPI.dispatch(loader(false))
    }catch(err){
        console.log(err);
    }
})

// adding product in user cart
export const addCartItemAsync = createAsyncThunk("", async(arg)=>{
    const user = localStorage.getItem('uid')
        if(!user){
            return
        }

    const {product, addItemNotify} = arg;    
    const cartRef = collection(db, "carts");
    const querySnapshot = await getDocs(query(cartRef, where("uid", "==", user), where("productId", "==", product.productId)));

    if(querySnapshot.docs.length > 0){
        const cartDoc = querySnapshot.docs[0]
        const cartRefWithId = doc(db, "carts", cartDoc.id)
        const currentQuantity = cartDoc.data().quantity

        await updateDoc(cartRefWithId, {
            quantity:currentQuantity+1
        });

        addItemNotify("Product Quantity Increased!")
        return
    }else{
        await addDoc(collection(db, "carts"), {
            uid:localStorage.getItem('uid'),
            quantity:1,
            productId:product.productId,
            ...product
        });
        addItemNotify("Product Added Successfully!")
    }
});

// getting cart item for perticular user
export const getUserCartItemsAsync = createAsyncThunk("addCartItem", (arg, thunkAPI)=>{
    thunkAPI.dispatch(loader(true))
    const userID = localStorage.getItem('uid');
    const cartRef = collection(db, "carts");
    onSnapshot(query(cartRef, where("uid", "==", userID)), (snapshot)=>{
        const userItems = []
        snapshot.forEach((doc)=>{
            userItems.push({cartId:doc.id, ...doc.data()});
        });
        thunkAPI.dispatch(addCartItem(userItems))
        thunkAPI.dispatch(loader(false))
    });
});

// deleting cart item
export const deleteCartItemAsync = createAsyncThunk('', async(arg)=>{
    const {cartId, notify} = arg;
    await deleteDoc(doc(db, "carts", cartId));
    notify("Product Removed Successfully!")
})

// Updating product in user cart
export const updateQuantityAsync = createAsyncThunk('', async(arg)=>{
    const {cartId, qty, notify} = arg;
    console.log(arg);
    const cartRef = doc(db, "carts", cartId)
    const cartItem = await getDoc(cartRef);
    const currentQuantity = cartItem.data().quantity
    if (currentQuantity === 1 && qty === -1){
        const confirmation = window.confirm("Do you want to Remove Product? If Yes, Click OK") 
        if(!confirmation){
            return
        }
        await deleteDoc(doc(db, "carts", cartId));
        notify("Product Removed Successfully!")
        return
    }

    await updateDoc(cartRef, {
        quantity:currentQuantity + qty
    })
})

// adding user cart items to the order list 
export const purchaseProductsAsync = createAsyncThunk('', async(arg)=>{

    const {notify, cartItems} = arg;
    const purchaseDate = new Date().toISOString().slice(0, 10)
    
    await addDoc(collection(db, "orders"), {
        uid:localStorage.getItem('uid'),
        orderDate:purchaseDate,
        cartItems
    });

    cartItems.forEach(async(item)=>{
        await deleteDoc((doc(db, "carts", item.cartId)))
    })

    notify("Thanks for Purchasing!")
})

// getting all the products from order list
export const getOrdersAsync = createAsyncThunk("addOrders", async(_, thunkAPI)=>{

    thunkAPI.dispatch(loader(true))
    const userID = localStorage.getItem('uid');
    const orderRef = collection(db, "orders");

    onSnapshot(query(orderRef, where("uid", "==", userID)), (snapshot)=>{
        const userOrders = []
        snapshot.forEach((doc)=>{
            userOrders.push(doc.data());
        });
        thunkAPI.dispatch(addOrders(userOrders))
        thunkAPI.dispatch(loader(false))
    });
})

const productSlice = createSlice({
    name:"products",
    initialState,
    reducers:{
        addProducts:(state, action)=>{
            state.products=[...action.payload]
        },
        filterProducts:(state, action)=>{
            state.filteredProducts=[...action.payload]
        },
        setSliderValue:(state, action)=>{
            state.sliderValue = action.payload
        },
        loader:(state, action)=>{
            state.loading = action.payload
        },
        setCategories:(state, action)=>{
            state.categories = {...state.categories, [action.payload]:!state.categories[action.payload]}
        },
        addCartItem:(state, action)=>{
            state.cartItems = [...action.payload]
        },
        addOrders:(state, action)=>{
            state.orders = [...action.payload]
        }
    }
})


export const productReducer = productSlice.reducer;

export const {addProducts, filterProducts, setSliderValue, loader, setCategories, setSearchRef, addCartItem, addOrders} = productSlice.actions;

export const productSelector = (state)=> state.productReducer;