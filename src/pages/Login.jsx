import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import axiosAdmin from "../service/axiosAdmin";
import authApi from "../service/authApi";
import { LoaderCircle, Send } from "lucide-react";

export default function Login() {
  const [adminData, setAdminData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginStatus(false);

    try {
      const rsp = await authApi.loginAdmin(adminData);
      localStorage.setItem("token", rsp.access_token);
      navigate("/admin/dashboard");
    } catch (error) {
      console.log(error);
      setLoginStatus(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-blue-400">
      <form
        className="md:w-[30%] w-[90%] h-auto py-10 md:py-16 bg-gray-100 rounded-2xl shadow-2xl flex justify-center items-center"
        onSubmit={handleLogin}
      >
        <div className="w-[80%] h-[80%] flex flex-col items-center justify-center">
          <div>
            <img src={logo} alt="" />
          </div>
          <div className="flex flex-col gap-7 mt-10 w-full">
            <div className="flex flex-col w-full">
              <label htmlFor="username" className="font-bold">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="username"
                value={adminData.username}
                onChange={handleChange}
                required
                className="w-full outline-none bg-blue-100 h-10 rounded-md px-5 mt-1.5"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="font-bold">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={adminData.password}
                onChange={handleChange}
                required
                className="w-full outline-none bg-blue-100 h-10 rounded-md px-5 mt-1.5"
              />
            </div>
          </div>
          <div className="w-full mt-7">
            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-600 duration-300 w-full h-10 rounded-md text-lg font-bold text-white flex items-center justify-center gap-2  ${loading ? "cursor-not-allowed" : ""}`}
            >
              {loading ? <LoaderCircle className="animate-spin" /> : <Send />}
              {loading ? "Logining..." : "Login"}
            </button>

            {loginStatus && (
              <div className="w-full h-auto px-5 py-1.5 bg-red-50 outline-2 outline-red-300 mt-2.5 rounded-md flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <div className="text-red-500 font-bold">Wrong Credential🙏</div>
              </div>
            )}

          </div>
        </div>
      </form>
    </div>
  );
}
