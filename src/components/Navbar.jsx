import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { PiSignOutLight, PiSignInLight } from "react-icons/pi";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navItems = (
    <>
      <li>
        <NavLink to="/" className="text-linksColor">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/allMovies" className="text-linksColor">
          All Movies
        </NavLink>
      </li>
      {user && user?.email && (
        <>
          <li>
            <NavLink to="/addMovies" className="text-linksColor">
              Add Movies
            </NavLink>
          </li>
          <li>
            <NavLink to="/favorite" className="text-linksColor">
              My Favorites
            </NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink to="/news" className="text-linksColor">
          News
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 w-full md:w-10/12 md:mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navItems}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl font-cinzel md:text-2xl">
          Cine Craft
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>
      <div className="navbar-end flex flex-col md:flex-row">
        {user && user?.email ? (
          <div className="flex items-center gap-1">
            <div className="tooltip  tooltip-left" data-tip={user.displayName}>
              <img
                src={user.photoURL}
                alt="image"
                className="w-10 h-10 rounded-full object-cover object-top"
              ></img>
            </div>

            <button className="btn btn-ghost text-linksColor" onClick={logout}>
              Logout
              <PiSignOutLight />
            </button>
          </div>
        ) : (
          <>
            <Link to="/login" className="btn btn-ghost ">
              {" "}
              <PiSignInLight size="18" />
              <span className="text-linksColor">Login</span>
            </Link>
            <Link to="/register" className="btn btn-ghost ">
              {" "}
              <span className="text-linksColor">Register</span>
            </Link>
          </>
        )}
        <ThemeToggle />
      </div>
      
    </div>
  );
}
