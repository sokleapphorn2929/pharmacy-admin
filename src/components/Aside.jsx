import { BottleWine, ChartBarStacked, ContactRound, Dices, DollarSign, Gauge, Info, PackageSearch, Receipt, ShoppingCart } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function Aside() {
  return (
    <aside className="h-full md:w-64 w-16 bg-white dark:bg-slate-900 rounded-lg outline-2 dark:outline-slate-700 outline-gray-300 overflow-hidden md:px-5 px-1 md:py-5 py-1 flex flex-col duration-300">
      <div className="w-full h-full rounded-md flex flex-col md:gap-3 gap-1">
        <Link to="/admin/dashboard" className="cursor-pointer w-full h-10 bg-gray-200 dark:bg-slate-700 rounded-md flex md:px-5 justify-center md:justify-start items-center gap-3">
          <Gauge />
          <div className="font-extrabold cursor-pointer hidden md:block">DASHBOARD</div>
        </Link>
        <Link to="/admin/category" className="cursor-pointer w-full h-10 bg-gray-200 dark:bg-slate-700 rounded-md flex md:px-5 justify-center md:justify-start items-center gap-3">
          <ChartBarStacked/>
          <div className="font-extrabold cursor-pointer hidden md:block">CATEGORY</div>
        </Link>
        <Link to="/admin/brand" className="cursor-pointer w-full h-10 bg-gray-200 dark:bg-slate-700 rounded-md flex md:px-5 justify-center md:justify-start items-center gap-3 ">
          <Dices />
          <div className="font-extrabold cursor-pointer hidden md:block">BRAND</div>
        </Link>
        <Link to="/admin/product" className="cursor-pointer w-full h-10 bg-gray-200 dark:bg-slate-700 rounded-md flex md:px-5 justify-center md:justify-start items-center gap-3 ">
          <PackageSearch />
          <div className="font-extrabold cursor-pointer hidden md:block">PRODUCT</div>
        </Link>
        <Link to="/admin/order" className="cursor-pointer w-full h-10 bg-gray-200 dark:bg-slate-700 rounded-md flex md:px-5 justify-center md:justify-start items-center gap-3 ">
          <ShoppingCart />
          <div className="font-extrabold cursor-pointer hidden md:block">ORDER</div>
        </Link>
        <Link to="/admin/payment" className="cursor-pointer w-full h-10 bg-gray-200 dark:bg-slate-700 rounded-md flex md:px-5 justify-center md:justify-start items-center gap-3 ">
          <DollarSign />
          <div className="font-extrabold cursor-pointer hidden md:block">PAYMENT</div>
        </Link>
        <Link to="/admin/invoice" className="cursor-pointer w-full h-10 bg-gray-200 dark:bg-slate-700 rounded-md flex md:px-5 justify-center md:justify-start items-center gap-3 ">
          <Receipt />
          <div className="font-extrabold cursor-pointer hidden md:block">INVOICE</div>
        </Link>
      </div>
      <div className="flex flex-col md:gap-3 gap-1">
        <div className="cursor-pointer w-full h-10 bg-gray-200 dark:bg-slate-700 rounded-md flex md:px-5 justify-center md:justify-start items-center gap-3 ">
          <Info />
          <div className="font-extrabold cursor-pointer hidden md:block">ABOUT</div>
        </div>
        <div className="cursor-pointer w-full h-10 bg-gray-200 dark:bg-slate-700 rounded-md flex md:px-5 justify-center md:justify-start items-center gap-3 ">
          <ContactRound />
          <div className="font-extrabold cursor-pointer hidden md:block">CONTACT</div>
        </div>
      </div>
    </aside>
  );
}
