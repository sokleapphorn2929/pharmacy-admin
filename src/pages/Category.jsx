import { Plus, Pencil, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import categoryApi from "../service/categoryApi";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryApi.getAll();
        // setCategories(data);
        setCategories(
          Array.isArray(data) ? data : data.categories || data.data || [],
        );
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center font-bold text-lg dark:text-white">
        Loading Data...
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white dark:bg-slate-900 outline-2 outline-gray-300 dark:outline-slate-700 rounded-lg duration-300 overflow-hidden flex flex-col">
      {/* Header Section */}
      <div className="w-full md:h-16 h-14 flex items-center md:px-5 px-3 border-b-2 border-gray-200 dark:border-slate-800 duration-300 justify-between p-5">
        <div className="md:text-xl font-extrabold text-slate-800 dark:text-white">
          Category
        </div>
        <div>
          <input
            type="text"
            className="outline-2 rounded-sm md:w-96 w-40 md:h-9 h-8 bg-gray-100 dark:bg-slate-800 outline-gray-300 dark:outline-slate-700 duration-300 md:px-5 px-2 text-slate-800 dark:text-white"
            placeholder="Search category..."
          />
        </div>
        <div>
          <button className="bg-blue-500 hover:bg-blue-600 duration-300 md:px-4 px-2.5 py-2 rounded-md flex items-center gap-1 font-bold text-white text-sm md:text-base">
            <Plus size={18} />
            <div className="md:block hidden">Add Category</div>
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="md:w-full w-72 overflow-x-auto p-3 md:p-5">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-200 dark:border-slate-800 text-gray-500 dark:text-gray-400 text-sm md:text-base">
              <th className="py-3 px-4">No.</th>
              <th className="py-3 px-4">Picture</th>
              <th className="py-3 px-4">Category Name</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cate, index) => (
              <tr
                key={cate.id || index}
                className="border-b border-gray-100 dark:border-slate-800/60 hover:bg-gray-50 dark:hover:bg-slate-800/50 duration-200"
              >
                <td className="py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">
                  {`#${index + 1}`}
                </td>
                <td className="py-3 px-4">
                  <img
                    src={cate.category_pic}
                    alt={cate.category_name}
                    className="w-10 h-10 rounded-md object-cover outline outline-gray-300 dark:outline-slate-700"
                  />
                </td>
                <td className="py-3 px-4 font-bold text-slate-800 dark:text-white">
                  {cate.category_name}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-center gap-2">
                    {/* Update Button */}
                    <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md duration-300 flex items-center gap-1 text-xs md:text-sm font-semibold">
                      <Pencil size={16} />
                      <span className="hidden md:inline">Update</span>
                    </button>

                    {/* Delete Button */}
                    <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md duration-300 flex items-center gap-1 text-xs md:text-sm font-semibold">
                      <Trash2 size={16} />
                      <span className="hidden md:inline">Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
