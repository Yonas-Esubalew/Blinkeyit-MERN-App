import {createBrowserRouter} from 'react-router-dom'
import App from '../App.jsx'
import Home from '../pages/Home.jsx'
import SearchPage from '../pages/SearchPage.jsx'
import Login from '../pages/Login.jsx'
import Register from '../pages/Register.jsx'
import ForgotPassword from '../pages/ForgotPassword.jsx'
import OtpVerification from '../pages/OtpVerification.jsx'
import ResetPassword from '../pages/ResetPassword.jsx'
import UserMenuMobile from '../pages/userMenuMobile.jsx'
import Dashboard from '../layouts/Dashboard.jsx'
import Profile from '../pages/Profile.jsx'
import MyOrders from '../pages/MyOrders.jsx'
import Address from '../pages/Address.jsx'
import Category from '../pages/Category.jsx'
import SubCategory from '../pages/SubCategory.jsx'
import Product from '../pages/Product.jsx'
import UploadProduct from '../pages/UploadProduct.jsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: 'search',
                element: <SearchPage/>
            },{
                path: "login",
                element: <Login/>
            },{
                path: "register",
                element: <Register/>
            },{
                path: "forgot-password",
                element: <ForgotPassword/>
            },{
                path: "otp-verification",
                element: <OtpVerification/>
            },{
                path: "reset-password",
                element: <ResetPassword/>
            },{
                path : "user",
                element : <UserMenuMobile/>
            },{
                path : "dashboard",
                element : <Dashboard/>,
                children : [
                    {
                        path : "profile",
                        element: <Profile/>
                    },{
                        path : "myorders",
                        element : <MyOrders/>
                    },{
                        path : "address",
                        element : <Address/>
                    },{
                        path : "category",
                        element : <Category/>
                    },{
                        path :  "sub-category",
                        element : <SubCategory/>
                    },{
                        path : "product",
                        element : <Product/>
                    },{
                        path: "upload-product",
                        element : <UploadProduct/>
                    }
                ]
            }
        ]
    },
])
export default router