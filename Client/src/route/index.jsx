import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import Register from "../pages/Register";
import Login from "../pages/Login";


// page router 

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children : [
            {
                path : "",
                element : <Home/>
            },
            {
                path: "search",
                element: <SearchPage/>
            },
            {
                path : "login",
                element: <Login/>
            },
            {
                path: "register",
                element: <Register/>
            }
        ]
    }
])

export default router