import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { success } from "../utility/toastMsg";

export default function Register() {
  const { createNewUser, setUser, updateUserProfile, signInWithGoogle } =
    useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    const name = data.name;
    const url = data.photoURL;

    createNewUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        updateUserProfile({
          displayName: name,
          photoURL: url,
        })
          .then(() => {
            navigate("/");
            success()
          })
          .catch((err) => setError(err.code));
      })
      .catch((error) => {
        setError(error.code);
      });
  };

  //   google signin

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);
        Navigate(location?.state ? location.state : "/");
      })
      .catch((err) => setError(err.code));
  };

  return (
    <div className="container mx-auto px-5">
      <div className="hero bg-base-200 min-h-screen flex items-center justify-center">
        <div className="hero-content flex flex-col lg:flex-row-reverse items-center gap-10">
          {/* Text Section */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register</h1>
            <p className="py-6 text-gray-600">
              Access your account by entering your login credentials below.
            </p>
          </div>

          {/* reg Card */}
          <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
              {/* name input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="input input-bordered"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <span className="text-red-500 m-2">
                    ** This field is required
                  </span>
                )}
              </div>
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
                />
                {errors.email && (
                  <span className="text-red-500 m-2">
                    ** This field is required
                  </span>
                )}
              </div>
              {/* photo url input  */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="url"
                  placeholder="Enter your photo URL"
                  className="input input-bordered"
                  {...register("photoURL", { required: true })}
                />
                {errors.photoURL && (
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
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/,
                      message:
                        "Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long",
                    },
                  })}
                />
                {errors.password && (
                  <span className="text-red-500 m-2">
                    ** {errors.password.message}
                  </span>
                )}
              </div>

              {error && (
                <p className="text-sm font-semibold text-red-500 my-2">
                  ** {error}
                </p>
              )}

              {/* Login Button */}
              <div className="form-control mt-6">
                <button className="btn btn-primary w-full">Signup</button>
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
                Already have an account?{" "}
                <Link to="/login" className="font-semibold text-blue-500">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
