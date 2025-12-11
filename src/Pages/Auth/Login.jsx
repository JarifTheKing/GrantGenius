import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { signInUser, signInWithGoogle } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // previous route or fallback "/"
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then((res) => {
        console.log("Login Success:", res.user);
        navigate(from, { replace: true });
      })
      .catch((err) => console.log("Login Error:", err.message));
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((res) => {
        console.log("Google Login Success:", res.user);
        navigate(from, { replace: true });
      })
      .catch((err) => console.log("Google Login Error:", err.message));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl rounded-2xl p-5">
        <h1 className="text-4xl font-bold text-center mb-6">Login</h1>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-3">
          <fieldset className="fieldset space-y-3">
            <div>
              <label className="label font-semibold">Email</label>
              <input
                type="email"
                {...register("email")}
                className="input input-bordered w-full"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="label font-semibold">Password</label>
              <input
                type="password"
                {...register("password")}
                className="input input-bordered w-full"
                placeholder="Enter your password"
              />
            </div>

            <button className="btn btn-neutral w-full mt-2">Login</button>

            <p className="text-sm text-center mt-3">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 font-semibold">
                Register
              </Link>
            </p>
          </fieldset>
        </form>

        {/* Google */}
        <button
          onClick={handleGoogleLogin}
          className="btn bg-white text-black border-[#e5e5e5]"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
