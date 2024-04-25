import './App.css';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'; 
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import SignUp from './pages/signUp/SignUp';
import SignIn from './pages/signIn/SignIn';
import { ToastContainer } from 'react-toastify';
import Cart from './pages/cart/Cart';
import Order from './pages/order/Order';
import ErrorPage from './pages/404/404';
import { useSelector } from 'react-redux';
import { userSelector } from './redux/reducers/userReducer';

function App() {

  const {login} = useSelector(userSelector); //getting login state
  
  // used ProgtectRoute to protect cart & order routes
  const ProtectRoute = ({children})=>{
    if(!login) return <Navigate to="/" replace={true} />
    return children
  }
  
  // using createBrowserRouter from React-Router-Dom for routing 
  const router = createBrowserRouter([
    {path:"/", element:<Navbar/>, children:[
      {index:true, element:<Home/>},
      {path:"signup", element:<SignUp/>},
      {path:"signin", element:<SignIn/>},
      {path:"cart", element:<ProtectRoute><Cart/></ProtectRoute>},
      {path:"myorders", element:<ProtectRoute><Order/></ProtectRoute>},
      {path:"*", element:<ErrorPage/>},
    ]}
  ])

  return (
    <>
    <RouterProvider router={router}/>
    <ToastContainer />
    </>
  );
}

export default App;
