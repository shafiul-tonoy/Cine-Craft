import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import PasswordReset from "../pages/PasswordReset";

const router = createBrowserRouter([
    {
        path:"/",
        element:<MainLayouts />,     
        errorElement:<ErrorPage />, 
        children:[
            {
                path:"login",
                element:<Login />,
            },
            {
                path:"reset",
                element:<PasswordReset />
            },

        ],
    },

   
    

])

export default router

