import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="app-container text-slate-800 dark:text-white bg-gray-100 dark:bg-slate-900 duration-300">
      <Navbar />

      <main className="content">
        <Outlet />
      </main>

      {/* <Footer /> */}
    </div>
  );
}
