import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";

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

        ],
    },

   
    

])

export default router

