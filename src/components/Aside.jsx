import {
  BottleWine,
  ChartBarStacked,
  ContactRound,
  Dices,
  DollarSign,
  Gauge,
  Info,
  PackageSearch,
  Receipt,
  ShoppingCart,
} from "lucide-react";
import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Aside() {
  // Helper function to handle active/inactive styling cleanly
  const linkClass = ({ isActive }) =>
    `cursor-pointer w-full h-10 rounded-md flex md:px-5 justify-center md:justify-start items-center gap-3 transition-all duration-300 ease-in-out hover:scale-[1.02] ${
      isActive
        ? "bg-blue-600 text-white dark:bg-blue-600 dark:text-white shadow-md shadow-blue-900/20"
        : "bg-gray-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-gray-300 dark:hover:bg-slate-600"
    }`;

  return (
    <aside className="h-full md:w-64 w-16 bg-white dark:bg-slate-900 rounded-lg outline-2 dark:outline-slate-700 outline-gray-300 overflow-hidden md:px-5 px-1 md:py-5 py-1 flex flex-col duration-300">
      <div className="w-full h-full rounded-md flex flex-col md:gap-3 gap-1">
        <NavLink to="/admin/dashboard" className={linkClass}>
          <Gauge />
          <div className="font-extrabold cursor-pointer hidden md:block">
            DASHBOARD
          </div>
        </NavLink>

        <NavLink to="/admin/category" className={linkClass}>
          <ChartBarStacked />
          <div className="font-extrabold cursor-pointer hidden md:block">
            CATEGORY
          </div>
        </NavLink>

        <NavLink to="/admin/brand" className={linkClass}>
          <Dices />
          <div className="font-extrabold cursor-pointer hidden md:block">
            BRAND
          </div>
        </NavLink>

        <NavLink to="/admin/product" className={linkClass}>
          <PackageSearch />
          <div className="font-extrabold cursor-pointer hidden md:block">
            PRODUCT
          </div>
        </NavLink>

        <NavLink to="/admin/order" className={linkClass}>
          <ShoppingCart />
          <div className="font-extrabold cursor-pointer hidden md:block">
            ORDER
          </div>
        </NavLink>

        <NavLink to="/admin/payment" className={linkClass}>
          <DollarSign />
          <div className="font-extrabold cursor-pointer hidden md:block">
            PAYMENT
          </div>
        </NavLink>

        <NavLink to="/admin/invoice" className={linkClass}>
          <Receipt />
          <div className="font-extrabold cursor-pointer hidden md:block">
            INVOICE
          </div>
        </NavLink>
      </div>

      <div className="flex flex-col md:gap-3 gap-1">
        {/* If ABOUT and CONTACT are routes, you can change these to NavLink too */}
        <Link to="/admin/about" className="cursor-pointer w-full h-10 bg-gray-200 dark:bg-slate-700 rounded-md flex md:px-5 justify-center md:justify-start items-center gap-3 text-slate-800 dark:text-slate-200">
          <Info />
          <div className="font-extrabold cursor-pointer hidden md:block">
            ABOUT
          </div>
        </Link>
        <Link to="/admin/contact" className="cursor-pointer w-full h-10 bg-gray-200 dark:bg-slate-700 rounded-md flex md:px-5 justify-center md:justify-start items-center gap-3 text-slate-800 dark:text-slate-200">
          <ContactRound />
          <div className="font-extrabold cursor-pointer hidden md:block">
            CONTACT
          </div>
        </Link>
      </div>
    </aside>
  );
}
