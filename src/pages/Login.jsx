import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useContext, useRef } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useForm } from "react-hook-form";
import { success } from "../utility/toastMsg";

export default function Login() {
  const { login, setUser, signInWithGoogle, handleForgetPassword } =
    useContext(AuthContext);
  const [error, setError] = useState("");
  const emailRef = useRef(null);
  const location = useLocation();
  const Navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;

    login(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        Navigate(location?.state ? location.state : "/");
        success();
      })
      .catch((err) => setError(err.code));
  };

  //   google signin

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);
        Navigate(location?.state ? location.state : "/");
        success();
      })
      .catch((err) => setError(err.code));
  };

  // password reset

  const handlePassword = () => {
    const email = emailRef.current.value;

    if (!email) {
      setError("Please provide a valid email address");
    } else {
      handleForgetPassword(email);
      Navigate("/reset");
    }
  };

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
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
              {/* Email Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered"
                  {...register("email", { required: true })}
                  ref={(e) => {
                    register("email").ref(e); // Register's ref
                    emailRef.current = e; // Your manual ref
                  }}
                />
                {errors.email && (
                  <span className="text-red-500 m-2">
                    ** This field is required
                  </span>
                )}
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
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <span className="text-red-500 m-2">
                    ** This field is required
                  </span>
                )}
                <label className="label">
                  <a
                    href="#"
                    className="label-text-alt link link-hover text-blue-500"
                    onClick={handlePassword}
                  >
                    Forgot password?
                  </a>
                </label>
              </div>

              {error && (
                <p className="text-sm font-semibold text-red-500 my-2">
                  ** {error}
                </p>
              )}

              {/* Login Button */}
              <div className="form-control mt-6">
                <button className="btn btn-primary w-full">Login</button>
              </div>
            </form>

            {/* Google Login */}
            <div className="text-center">
              <p className="text-sm text-gray-600">Or</p>
              <button
                onClick={handleGoogleSignIn}
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
                <Link
                  to="/register"
                  className="font-semibold text-blue-500"
                >
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
