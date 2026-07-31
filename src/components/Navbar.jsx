import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Moon, Sun, User } from "lucide-react";
import { Link } from "react-router-dom";
import axiosAdmin from "../service/axiosAdmin";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(() => {
    return(
      localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  const [adminPic, setAdminPic] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Fetch admin profile picture on mount
  useEffect(() => {
    const fetchAdminNavProfile = async () => {
      try {
        const res = await axiosAdmin.get('/admins/profile');
        const adminData = res.data || res;
        if (adminData && adminData.admin_pic) {
          setAdminPic(adminData.admin_pic);
        }
      } catch (err) {
        console.error("Failed to load admin navbar profile:", err);
      }
    };

    fetchAdminNavProfile();
  }, []);

  return (
    <nav className="fixed w-full h-15 bg-white dark:bg-slate-900 duration-300 border-b-2 border-gray-300 dark:border-slate-700 z-50">
      <div className="flex h-full items-center md:px-10 px-5 justify-between">
        {/* branding logo */}
        <div>
          <img src={logo} alt="logo" className="md:h-10 h-7" />
        </div>
        {/* search */}
        {/* <div className="hidden md:block">
          <input
            type="text"
            className="w-96 h-9 bg-gray-100 dark:bg-slate-800 outline-2 outline-gray-300 dark:outline-slate-700 rounded-md px-5 text-black dark:text-white duration-300"
            placeholder="Search here..."
          />
        </div> */}
        {/* darkmode button and profile */}
        <div className="flex md:gap-5 gap-3">
          {/* darkmode button */}
          <div className="">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-9 h-9 flex items-center justify-center bg-gray-100 dark:bg-slate-800 outline-2 outline-gray-300 dark:outline-slate-700 rounded-md duration-300"
            >
              {darkMode ? (
                <Sun className="text-white duration-300" />
              ) : (
                <Moon className="text-black duration-300" />
              )}
            </button>
          </div>
          {/* profile picture */}
          <div>
            <Link to="/admin/profile">
              {adminPic ? (
                <img
                  src={adminPic}
                  alt="Admin Profile"
                  className="size-9 rounded-md object-cover outline-2 outline-gray-400 dark:outline-slate-700 hover:opacity-90 transition-opacity"
                />
              ) : (
                <div className="size-9 rounded-md bg-gray-200 dark:bg-slate-800 outline-2 outline-gray-400 dark:outline-slate-700 flex items-center justify-center text-gray-500 dark:text-slate-400">
                  <User size={20} />
                </div>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}