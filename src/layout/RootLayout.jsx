import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="app-container text-black dark:text-white bg-white dark:bg-slate-900 duration-300">
      <Navbar />

      <main className="content">
        <Outlet />
      </main>

      {/* <Footer /> */}
    </div>
  );
}
