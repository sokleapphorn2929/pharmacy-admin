import React from "react";

export default function CountSection() {
  return (
    <div className="w-full h-auto bg-white dark:bg-slate-900 rounded-lg outline-2 dark:outline-slate-700 outline-gray-300 overflow-hidden duration-300 md:px-5 px-3 md:py-5 py-3 grid grid-cols-2 md:grid-cols-4 md:gap-5 gap-3">
      {/* category */}
      <div className="w-full h-20 md:h-32 bg-white dark:bg-slate-800 outline-2 outline-gray-300 dark:outline-slate-700 rounded-md duration-300 overflow-hidden md:p-5 p-2">
        <div className="w-full h-full flex flex-col md:gap-3 justify-center">
          <div className="font-extrabold md:text-2xl text-center">Category</div>
          <div className="font-extrabold text-center md:text-4xl text-2xl">
            100
          </div>
        </div>
      </div>
      {/* brand */}
      <div className="w-full h-20 md:h-32 bg-white dark:bg-slate-800 outline-2 outline-gray-300 dark:outline-slate-700 rounded-md duration-300 overflow-hidden md:p-5 p-2">
        <div className="w-full h-full flex flex-col md:gap-3 justify-center">
          <div className="font-extrabold md:text-2xl text-center">Brand</div>
          <div className="font-extrabold text-center md:text-4xl text-2xl">
            80
          </div>
        </div>
      </div>
      {/* order */}
      <div className="w-full h-20 md:h-32 bg-white dark:bg-slate-800 outline-2 outline-gray-300 dark:outline-slate-700 rounded-md duration-300 overflow-hidden md:p-5 p-2">
        <div className="w-full h-full flex flex-col md:gap-3 justify-center">
          <div className="font-extrabold md:text-2xl text-center">Order</div>
          <div className="font-extrabold text-center md:text-4xl text-2xl">
            50
          </div>
        </div>
      </div>
      {/* invoice */}
      <div className="w-full h-20 md:h-32 bg-white dark:bg-slate-800 outline-2 outline-gray-300 dark:outline-slate-700 rounded-md duration-300 overflow-hidden md:p-5 p-2">
        <div className="w-full h-full flex flex-col md:gap-3 justify-center">
          <div className="font-extrabold md:text-2xl text-center">Invoice</div>
          <div className="font-extrabold text-center md:text-4xl text-2xl">
            200
          </div>
        </div>
      </div>
    </div>
  );
}
