import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Loader from "../../component/Loader";
import { useProfileMutation } from "../../redux/api/users";
import { setCredentials } from "../../redux/features/auth/authSlice";

const Profile = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const watchlist = useSelector((state) => state.watchlist.movies);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    if (userInfo) {
      setUsername(userInfo.username);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await updateProfile({
        _id: userInfo._id,
        username,
        email,
        password,
      }).unwrap();

      dispatch(setCredentials({ ...res }));

      toast.success("Profile updated successfully");

      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}

        <h1 className="text-5xl font-bold mb-10">My Profile</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Card */}

          <div className="bg-[#181818] border border-gray-800 rounded-2xl p-8 h-fit">
            <div className="flex justify-center">
              <div className="w-32 h-32 rounded-full bg-red-600 flex items-center justify-center text-6xl font-bold">
                {username?.charAt(0).toUpperCase()}
              </div>
            </div>

            <h2 className="text-center text-4xl font-bold mt-6">{username}</h2>

            <p className="text-center text-gray-400 mt-2">{email}</p>

            <div className="mt-10 bg-[#242424] rounded-xl p-6">
              <p className="text-gray-400">Saved Movies</p>

              <h3 className="text-red-500 text-5xl font-bold mt-2">
                {watchlist.length}
              </h3>
            </div>

            <Link
              to="/watchlist"
              className="block w-full text-center mt-6 bg-red-600 hover:bg-red-700 transition rounded-xl py-4 font-semibold text-lg"
            >
              View My Watchlist
            </Link>
          </div>

          {/* Right Card */}

          <div className="lg:col-span-2 bg-[#181818] border border-gray-800 rounded-2xl p-10">
            <h2 className="text-4xl font-bold mb-10">Account Settings</h2>

            <form onSubmit={submitHandler}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-gray-300 font-medium">
                    Username
                  </label>

                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-[#242424] text-white placeholder-gray-400 border border-gray-700 rounded-xl px-5 py-4 outline-none focus:border-red-600 transition"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-gray-300 font-medium">
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#242424] text-white placeholder-gray-400 border border-gray-700 rounded-xl px-5 py-4 outline-none focus:border-red-600 transition"
                  />
                </div>
              </div>

              <div className="border-t border-gray-700 my-10"></div>

              <h3 className="text-2xl font-semibold mb-6">Change Password</h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-gray-300 font-medium">
                    New Password
                  </label>

                  <input
                    type="password"
                    placeholder="Leave blank to keep current password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#242424] text-white placeholder-gray-400 border border-gray-700 rounded-xl px-5 py-4 outline-none focus:border-red-600 transition"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-gray-300 font-medium">
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-[#242424] text-white placeholder-gray-400 border border-gray-700 rounded-xl px-5 py-4 outline-none focus:border-red-600 transition"
                  />
                </div>
              </div>

              <div className="mt-10 flex items-center gap-4">
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 transition px-10 py-4 rounded-xl font-semibold text-lg"
                >
                  Save Changes
                </button>

                {loadingUpdateProfile && <Loader />}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
