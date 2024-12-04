import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
    {
        path:"/",
        element:<MainLayouts />,     
        errorElement:<ErrorPage />, 
        children:[

        ],
    },

    //auth route start

])

export default router

