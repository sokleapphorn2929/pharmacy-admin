import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import profile from "../assets/profile.png";
import { Moon, Sun } from "lucide-react";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(() => {
    return(
      localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <nav className="fixed w-full h-15 bg-white dark:bg-slate-900 duration-300 border-b-2 border-gray-300 dark:border-slate-700">
      <div className="flex h-full items-center md:px-10 px-5 justify-between">
        {/* branding logo */}
        <div>
          <img src={logo} alt="logo" className="md:h-10 h-7" />
        </div>
        {/* search */}
        <div className="hidden md:block">
          <input
            type="text"
            className="w-96 h-9 bg-gray-100 dark:bg-slate-800 outline-2 outline-gray-300 dark:outline-slate-700 rounded-md px-5 text-black dark:text-white duration-300"
            placeholder="Search here..."
          />
        </div>
        {/* darkmode button and profile */}
        <div className="flex md:gap-5 gap-3">
          {/* darkmode button */}
          <div className="">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-9 h-9 flex items-center justify-center bg-gray-100 dark:bg-slate-800 outline-2 outline-gray-300 dark:outline-slate-700 rounded-md"
            >
              {darkMode ? (
                <Sun className="text-white hover:text-yellow-500 duration-300" />
              ) : (
                <Moon className="text-black hover:text-yellow-500 duration-300" />
              )}
            </button>
          </div>
          {/* profile picture */}
          <div>
            <img
              src={profile}
              alt=""
              className="size-9 rounded-md outline-2 outline-gray-400 dark:outline-slate-700"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
