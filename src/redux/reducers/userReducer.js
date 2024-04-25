import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";

// initial state
const initialState = {
    login:false,
}

// User Sign In authentication using firebase
export const userLoginAsync = createAsyncThunk("loggedIn", async(arg, thunkAPI)=>{
    const {email, password, navigate, signUpNotify, errorNotify} = arg;
    try{       
        const auth =  getAuth()
        const userCred = await signInWithEmailAndPassword(auth, email, password)
        thunkAPI.dispatch(loggedIn())
        localStorage.setItem("uid", userCred.user.uid)
        navigate("/")
        signUpNotify()
    }catch(err){
        errorNotify()
    }
})

// User Sign Up authentication using firebase
export const userSignUpAsync = createAsyncThunk("signUp", async(arg)=>{
       const {email, password, signUpNotify, errorNotify, navigate} = arg;
       try{
            const auth = getAuth()
            await createUserWithEmailAndPassword(auth, email, password); // Firebase authentication function for Sign up
            signUpNotify()
            navigate("/signin")
       }catch(err){
            errorNotify("Something went Wrong!")
       }
})

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        
        loggedIn:(state, action)=>{
            state.login = true
            localStorage.setItem("login", true)
        },
        logout:(state, action)=>{
            state.login = false
            localStorage.removeItem("login")
            localStorage.removeItem('uid')
        }
    }
})

export const userReducer = userSlice.reducer;

export const {loggedIn, logout, loginFailed} = userSlice.actions;

export const userSelector = (state)=> state.userReducer;
