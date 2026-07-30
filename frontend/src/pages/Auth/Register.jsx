import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaCheck, FaTimes } from "react-icons/fa";

import Loader from "../../component/Loader";

import { setCredentials } from "../../redux/features/auth/authSlice";
import { useRegisterMutation } from "../../redux/api/users";

import { toast } from "react-toastify";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const passwordRules = [
    { label: "At least 8 characters", test: (pw) => pw.length >= 8 },
    { label: "One uppercase letter", test: (pw) => /[A-Z]/.test(pw) },
    { label: "One lowercase letter", test: (pw) => /[a-z]/.test(pw) },
    { label: "One number", test: (pw) => /[0-9]/.test(pw) },
    {
      label: "One special character",
      test: (pw) => /[^A-Za-z0-9]/.test(pw),
    },
  ];

  const isPasswordValid = passwordRules.every((rule) => rule.test(password));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();

  const sp = new URLSearchParams(search);

  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!isPasswordValid) {
      toast.error("Please meet all password requirements");
      return;
    }

    try {
      const res = await register({
        username,
        email,
        password,
      }).unwrap();

      dispatch(setCredentials({ ...res }));

      toast.success(`Welcome to MovieFlix, ${res.username}!`);

      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || "Registration Failed");
    }
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center px-6"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop')",
      }}
    >
      {/* Overlay */}

      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>

      {/* Register Card */}

      <div className="relative z-10 w-full max-w-md rounded-3xl bg-black/70 border border-gray-700 shadow-2xl backdrop-blur-xl p-8">
        <Link
          to="/"
          className="block text-center text-red-600 text-4xl font-extrabold tracking-wide"
        >
          MovieFlix
        </Link>

        <h1 className="text-center text-white text-2xl font-bold mt-6">
          Create Account 🍿
        </h1>

        <p className="text-center text-gray-400 text-sm mt-2 mb-8">
          Join MovieFlix and build your personal watchlist.
        </p>

        <form onSubmit={submitHandler} className="space-y-5">
          {/* Username */}

          <div>
            <label
              htmlFor="username"
              className="block text-gray-300 mb-1.5 text-sm font-medium"
            >
              Full Name
            </label>

            <input
              type="text"
              id="username"
              placeholder="Enter your full name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#1a1a1a]/90 border border-gray-600 text-white placeholder-gray-400 outline-none transition-all duration-300 focus:border-red-600 focus:ring-2 focus:ring-red-600"
              required
            />
          </div>

          {/* Email */}

          <div>
            <label
              htmlFor="email"
              className="block text-gray-300 mb-1.5 text-sm font-medium"
            >
              Email Address
            </label>

            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#1a1a1a]/90 border border-gray-600 text-white placeholder-gray-400 outline-none transition-all duration-300 focus:border-red-600 focus:ring-2 focus:ring-red-600"
              required
            />
          </div>

          {/* Password */}

          <div>
            <label
              htmlFor="password"
              className="block text-gray-300 mb-1.5 text-sm font-medium"
            >
              Password
            </label>

            <input
              type="password"
              id="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              className="w-full px-4 py-3 rounded-xl bg-[#1a1a1a]/90 border border-gray-600 text-white placeholder-gray-400 outline-none transition-all duration-300 focus:border-red-600 focus:ring-2 focus:ring-red-600"
              required
            />

            {(isPasswordFocused || password.length > 0) && (
              <div className="mt-3 bg-[#1a1a1a]/90 border border-gray-700 rounded-xl p-4 space-y-2">
                {passwordRules.map((rule) => {
                  const passed = rule.test(password);
                  return (
                    <div
                      key={rule.label}
                      className={`flex items-center gap-2 text-sm transition-colors duration-200 ${
                        passed ? "text-green-500" : "text-gray-500"
                      }`}
                    >
                      {passed ? (
                        <FaCheck className="text-xs flex-shrink-0" />
                      ) : (
                        <FaTimes className="text-xs flex-shrink-0" />
                      )}
                      <span>{rule.label}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Confirm Password */}

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-gray-300 mb-1.5 text-sm font-medium"
            >
              Confirm Password
            </label>

            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#1a1a1a]/90 border border-gray-600 text-white placeholder-gray-400 outline-none transition-all duration-300 focus:border-red-600 focus:ring-2 focus:ring-red-600"
              required
            />
          </div>

          {/* Register Button */}

          <button
            type="submit"
            disabled={isLoading || (password.length > 0 && !isPasswordValid)}
            className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 transition-all duration-300 text-white text-base font-semibold shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>

          {isLoading && (
            <div className="flex justify-center">
              <Loader />
            </div>
          )}
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-300 text-sm">
            Already have an account?{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className="text-red-500 hover:text-red-400 font-semibold transition"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* Bottom Text */}

      <p className="relative z-10 mt-8 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} MovieFlix. Discover. Watch. Enjoy.
      </p>
    </section>
  );
};

export default Register;
