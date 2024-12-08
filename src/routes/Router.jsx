import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/home";
import Login from "../pages/Login";
import PasswordReset from "../pages/PasswordReset";
import Register from "../pages/Register";

import AddMovies from "../pages/AddMovies";
import AllMovies from "../pages/AllMovies";
import Details from "../pages/Details";
import Favorite from "../pages/Favorite";
import News from "../pages/News";
import UpdateMovies from "../pages/UpdateMovies";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => fetch(`https://cine-craft-server.vercel.app`),
      },
      {
        path: "allMovies",
        element: <AllMovies />,
        loader: () => fetch(`https://cine-craft-server.vercel.app/movies`),
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
          fetch(`https://cine-craft-server.vercel.app/movies/${params.id}`),
      },
      {
        path: "details/:id",
        element: (
          <PrivateRoute>
            <Details />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://cine-craft-server.vercel.app/movies/${params.id}`),
      },
      {
        path: "favorite",
        element: (
          <PrivateRoute>
            <Favorite />
          </PrivateRoute>
        ),
        // loader:({params}) => fetch(`https://cine-craft-server.vercel.app/favorites/${params.email}`),
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
