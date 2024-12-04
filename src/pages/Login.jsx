import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useContext, useRef } from "react";
import { AuthContext } from "../providers/AuthProvider";

export default function Login() {
  return (
    <div className="container mx-auto px-5">
      <div className="hero bg-base-200 min-h-screen flex items-center justify-center">
        <div className="hero-content flex flex-col lg:flex-row-reverse items-center gap-10">
          
          {/* Text Section */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login</h1>
            <p className="py-6 text-gray-600">
              Access your account by entering your login credentials below.
            </p>
          </div>
          
          {/* Login Card */}
          <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
            <form className="card-body">
              {/* Email Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered"
                  required
                />
              </div>
              
              {/* Password Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover text-blue-500">
                    Forgot password?
                  </a>
                </label>
              </div>
              
              {/* Login Button */}
              <div className="form-control mt-6">
                <button className="btn btn-primary w-full">Login</button>
              </div>
            </form>

            {/* Google Login */}
            <div className="text-center">
              <p className="text-sm text-gray-600">Or</p>
              <button
                className="btn mx-auto mt-4 flex items-center justify-center gap-2 bg-white text-black border border-gray-300 hover:bg-gray-100"
              >
                <FcGoogle size="16" />
                Continue with Google
              </button>
            </div>

            {/* Registration Link */}
            <div className="m-6 text-center">
              <p className="text-sm text-gray-600">
                Don’t have an account?{" "}
                <Link to="/auth/register" className="font-semibold text-blue-500">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
