import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import Home from "../pages/home";
import Register from "../pages/Register";
import PasswordReset from "../pages/PasswordReset";

import AllMovies from "../pages/AllMovies";
import AddMovies from "../pages/AddMovies";
import Favorite from "../pages/Favorite";
import News from "../pages/News";
import PrivateRoute from "./PrivateRoute";
import Details from "../pages/Details";
import UpdateMovies from "../pages/UpdateMovies";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "allMovies",
        element: <AllMovies />,
        loader: () => fetch(`http://localhost:5000/movies`),
      },
      {
        path: "addMovies",
        element: (
          <PrivateRoute>
            <AddMovies />
          </PrivateRoute>
        ),
      },
      {
        path: "updateMovies/:id",
        element: (
          <PrivateRoute>
            <UpdateMovies />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/movies/${params.id}`),
      },
      {
        path: "details/:id",
        element: (
          <PrivateRoute>
            <Details />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/movies/${params.id}`),
      },
      {
        path: "favorite",
        element: (
          <PrivateRoute>
            <Favorite />
          </PrivateRoute>
        ),
        // loader:({params}) => fetch(`http://localhost:5000/favorites/${params.email}`),
      },
      {
        path: "news",
        element: <News />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "reset",
        element: <PasswordReset />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
