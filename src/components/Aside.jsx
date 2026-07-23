import { BottleWine, ChartBarStacked, ContactRound, Dices, DollarSign, Info, PackageSearch, Receipt, ShoppingCart } from "lucide-react";
import React from "react";

export default function Aside() {
  return (
    <aside className="h-full md:w-60 w-15 bg-white dark:bg-slate-900 rounded-lg outline-2 dark:outline-slate-700 outline-gray-300 overflow-hidden md:px-5 px-2 py-5 flex flex-col">
      <div className="w-full h-full rounded-md flex flex-col gap-5">
        <div className="cursor-pointer w-full h-10 bg-gray-200 dark:bg-slate-700 rounded-md flex md:px-5 justify-center md:justify-start items-center gap-3">
          <ChartBarStacked/>
          <div className="font-extrabold cursor-pointer hidden md:block">CATEGORY</div>
        </div>
        <div className="cursor-pointer w-full h-10 bg-gray-200 dark:bg-slate-700 rounded-md flex md:px-5 justify-center md:justify-start items-center gap-3">
          <Dices />
          <div className="font-extrabold cursor-pointer hidden md:block">BRAND</div>
        </div>
        <div className="cursor-pointer w-full h-10 bg-gray-200 dark:bg-slate-700 rounded-md flex md:px-5 justify-center md:justify-start items-center gap-3">
          <PackageSearch />
          <div className="font-extrabold cursor-pointer hidden md:block">PRODUCT</div>
        </div>
        <div className="cursor-pointer w-full h-10 bg-gray-200 dark:bg-slate-700 rounded-md flex md:px-5 justify-center md:justify-start items-center gap-3">
          <ShoppingCart />
          <div className="font-extrabold cursor-pointer hidden md:block">ORDER</div>
        </div>
        <div className="cursor-pointer w-full h-10 bg-gray-200 dark:bg-slate-700 rounded-md flex md:px-5 justify-center md:justify-start items-center gap-3">
          <BottleWine />
          <div className="font-extrabold cursor-pointer hidden md:block">ORDER ITEM</div>
        </div>
        <div className="cursor-pointer w-full h-10 bg-gray-200 dark:bg-slate-700 rounded-md flex md:px-5 justify-center md:justify-start items-center gap-3">
          <DollarSign />
          <div className="font-extrabold cursor-pointer hidden md:block">PAYMENT</div>
        </div>
        <div className="cursor-pointer w-full h-10 bg-gray-200 dark:bg-slate-700 rounded-md flex md:px-5 justify-center md:justify-start items-center gap-3">
          <Receipt />
          <div className="font-extrabold cursor-pointer hidden md:block">INVOICE</div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="cursor-pointer w-full h-10 bg-gray-200 dark:bg-slate-700 rounded-md flex md:px-5 justify-center md:justify-start items-center gap-3">
          <Info />
          <div className="font-extrabold cursor-pointer hidden md:block">ABOUT</div>
        </div>
        <div className="cursor-pointer w-full h-10 bg-gray-200 dark:bg-slate-700 rounded-md flex md:px-5 justify-center md:justify-start items-center gap-3">
          <ContactRound />
          <div className="font-extrabold cursor-pointer hidden md:block">CONTACT</div>
        </div>
      </div>
    </aside>
  );
}
