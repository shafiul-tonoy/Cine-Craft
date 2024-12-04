import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

export default function PasswordReset() {
  const { passwordReset, forgetPassword } = useContext(AuthContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState(forgetPassword);

  // Handle input changes
  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    passwordReset(email);
    window.location.href = "https://mail.google.com/";
    navigate("");
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold">Reset Password</h1>
          <p className="py-6">
            A password reset link will be sent to your email address.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                onChange={handleChange}  
                value={email}            
                required
              />
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary">Reset</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
