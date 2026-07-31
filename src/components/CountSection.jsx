import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CountSection() {
  const [counts, setCounts] = useState({
    category: 0,
    brand: 0,
    order: 0,
    invoice: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Adjust the endpoint URL to match your backend route
        const response = await axios.get('https://pharmacy-system-backend-j77b.onrender.com/api/dashboard/counts');
        setCounts(response.data);
      } catch (error) {
        console.error('Error fetching dashboard counts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="w-full h-auto bg-white dark:bg-slate-900 rounded-lg outline-2 dark:outline-slate-700 outline-gray-300 overflow-hidden duration-300 md:px-5 px-3 md:py-5 py-3 grid grid-cols-2 md:grid-cols-4 md:gap-5 gap-3">
      {/* category */}
      <div className="w-full h-20 md:h-32 bg-white dark:bg-slate-800 outline-2 outline-gray-300 dark:outline-slate-700 rounded-md duration-300 overflow-hidden md:p-5 p-2">
        <div className="w-full h-full flex flex-col md:gap-3 justify-center">
          <div className="font-extrabold md:text-2xl text-center text-slate-700 dark:text-slate-200">Category</div>
          <div className="font-extrabold text-center md:text-4xl text-2xl text-slate-900 dark:text-white">
            {loading ? '...' : counts.category}
          </div>
        </div>
      </div>
      {/* brand */}
      <div className="w-full h-20 md:h-32 bg-white dark:bg-slate-800 outline-2 outline-gray-300 dark:outline-slate-700 rounded-md duration-300 overflow-hidden md:p-5 p-2">
        <div className="w-full h-full flex flex-col md:gap-3 justify-center">
          <div className="font-extrabold md:text-2xl text-center text-slate-700 dark:text-slate-200">Brand</div>
          <div className="font-extrabold text-center md:text-4xl text-2xl text-slate-900 dark:text-white">
            {loading ? '...' : counts.brand}
          </div>
        </div>
      </div>
      {/* order */}
      <div className="w-full h-20 md:h-32 bg-white dark:bg-slate-800 outline-2 outline-gray-300 dark:outline-slate-700 rounded-md duration-300 overflow-hidden md:p-5 p-2">
        <div className="w-full h-full flex flex-col md:gap-3 justify-center">
          <div className="font-extrabold md:text-2xl text-center text-slate-700 dark:text-slate-200">Order</div>
          <div className="font-extrabold text-center md:text-4xl text-2xl text-slate-900 dark:text-white">
            {loading ? '...' : counts.order}
          </div>
        </div>
      </div>
      {/* invoice */}
      <div className="w-full h-20 md:h-32 bg-white dark:bg-slate-800 outline-2 outline-gray-300 dark:outline-slate-700 rounded-md duration-300 overflow-hidden md:p-5 p-2">
        <div className="w-full h-full flex flex-col md:gap-3 justify-center">
          <div className="font-extrabold md:text-2xl text-center text-slate-700 dark:text-slate-200">Invoice</div>
          <div className="font-extrabold text-center md:text-4xl text-2xl text-slate-900 dark:text-white">
            {loading ? '...' : counts.invoice}
          </div>
        </div>
      </div>
    </div>
  );
}