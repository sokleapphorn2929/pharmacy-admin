import React from "react";
import logo from "../assets/logo.png"

export default function Login() {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-blue-400">
      <form className="md:w-[30%] w-[90%] h-auto py-10 md:py-16 bg-gray-100 rounded-2xl shadow-2xl flex justify-center items-center">
        <div className="w-[80%] h-[80%] flex flex-col items-center justify-center">
          <div>
            <img src={logo} alt="" />
          </div>
          <div className="flex flex-col gap-7 mt-10 w-full">
            <div className="flex flex-col w-full">
              <label htmlFor="username" className="font-bold">Username</label>
              <input
                id="username"
                type="text"
                placeholder="username"
                className="w-full outline-none bg-blue-100 h-10 rounded-md px-5 mt-1.5"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="font-bold">Password</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full outline-none bg-blue-100 h-10 rounded-md px-5 mt-1.5"
              />
            </div>
          </div>
          <div className="w-full mt-7">
            <button className="bg-blue-500 hover:bg-blue-600 duration-300 w-full h-10 rounded-md text-lg font-bold text-white">Login</button>
          </div>
        </div>
      </form>
    </div>
  );
}
