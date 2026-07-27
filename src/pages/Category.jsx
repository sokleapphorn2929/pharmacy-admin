import { Plus, Pencil, Trash2, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import categoryApi from "../service/categoryApi";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Add Modal State
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryPic, setCategoryPic] = useState(null);

  // Update Modal State
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);
  const [updateCategoryName, setUpdateCategoryName] = useState("");
  const [updateCategoryPic, setUpdateCategoryPic] = useState(null);

  // Delete Modal State
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const [submitting, setSubmitting] = useState(false);

  const fetchCategories = async () => {
    try {
      const data = await categoryApi.getAll();
      setCategories(
        Array.isArray(data) ? data : data.categories || data.data || []
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
      setCategories([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle Add Category Submission
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("category_name", categoryName);
      if (categoryPic) {
        formData.append("category_pic", categoryPic);
      }

      await categoryApi.create(formData);

      setCategoryName("");
      setCategoryPic(null);
      setIsAddOpen(false);
      fetchCategories();
    } catch (error) {
      console.log("Failed to create category:", error);
    } finally {
      setSubmitting(false);
    }
  };

  // Open Update Modal and populate values
  const handleOpenUpdate = (cate) => {
    setCurrentCategoryId(cate.id);
    setUpdateCategoryName(cate.category_name || "");
    setUpdateCategoryPic(null); 
    setIsUpdateOpen(true);
  };

  // Handle Update Category Submission
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("category_name", updateCategoryName);
      if (updateCategoryPic) {
        formData.append("category_pic", updateCategoryPic);
      }

      await categoryApi.update(currentCategoryId, formData);

      setIsUpdateOpen(false);
      fetchCategories();
    } catch (error) {
      console.log("Failed to update category:", error);
    } finally {
      setSubmitting(false);
    }
  };

  // Open Delete Modal
  const handleOpenDelete = (cate) => {
    setCategoryToDelete(cate);
    setIsDeleteOpen(true);
  };

  // Handle Delete Confirmation
  const handleDeleteConfirm = async () => {
    if (!categoryToDelete) return;
    setSubmitting(true);

    try {
      await categoryApi.remove(categoryToDelete.id);
      setIsDeleteOpen(false);
      setCategoryToDelete(null);
      fetchCategories();
    } catch (error) {
      console.log("Failed to delete category:", error);
    } finally {
      setSubmitting(false);
    }
  };

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
          <button 
            onClick={() => setIsAddOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 duration-300 md:px-4 px-2.5 py-2 rounded-md flex items-center gap-1 font-bold text-white text-sm md:text-base cursor-pointer"
          >
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
                    <button 
                      onClick={() => handleOpenUpdate(cate)}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md duration-300 flex items-center gap-1 text-xs md:text-sm font-semibold cursor-pointer"
                    >
                      <Pencil size={16} />
                      <span className="hidden md:inline">Update</span>
                    </button>

                    {/* Delete Button */}
                    <button 
                      onClick={() => handleOpenDelete(cate)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md duration-300 flex items-center gap-1 text-xs md:text-sm font-semibold cursor-pointer"
                    >
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

      {/* Headless UI Add Category Modal */}
      <Dialog open={isAddOpen} onClose={() => setIsAddOpen(false)} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity" />

        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-xl bg-white dark:bg-slate-800 p-6 shadow-2xl border-2 border-gray-200 dark:border-slate-700 space-y-4">
            
            <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-slate-700">
              <DialogTitle className="text-lg font-bold text-slate-800 dark:text-white">
                Add New Category
              </DialogTitle>
              <button 
                onClick={() => setIsAddOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Category Name
                </label>
                <input
                  type="text"
                  required
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="Enter category name..."
                  className="w-full bg-gray-50 dark:bg-slate-900 border-2 border-gray-300 dark:border-slate-700 rounded-md px-3 py-2 text-slate-800 dark:text-white outline-none focus:border-blue-500 duration-200"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Category Picture File
                </label>
                <input
                  type="file"
                  required
                  accept="image/*"
                  onChange={(e) => setCategoryPic(e.target.files[0])}
                  className="w-full bg-gray-50 dark:bg-slate-900 border-2 border-gray-300 dark:border-slate-700 rounded-md px-3 py-2 text-slate-800 dark:text-white outline-none focus:border-blue-500 duration-200 file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 dark:file:bg-slate-700 dark:file:text-white hover:file:bg-blue-100 cursor-pointer"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-gray-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 rounded-md font-semibold bg-gray-200 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-gray-300 duration-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 rounded-md font-semibold bg-blue-500 hover:bg-blue-600 text-white duration-200 disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? "Saving..." : "Save Category"}
                </button>
              </div>
            </form>

          </DialogPanel>
        </div>
      </Dialog>

      {/* Headless UI Update Category Modal */}
      <Dialog open={isUpdateOpen} onClose={() => setIsUpdateOpen(false)} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity" />

        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-xl bg-white dark:bg-slate-800 p-6 shadow-2xl border-2 border-gray-200 dark:border-slate-700 space-y-4">
            
            <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-slate-700">
              <DialogTitle className="text-lg font-bold text-slate-800 dark:text-white">
                Update Category
              </DialogTitle>
              <button 
                onClick={() => setIsUpdateOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Category Name
                </label>
                <input
                  type="text"
                  required
                  value={updateCategoryName}
                  onChange={(e) => setUpdateCategoryName(e.target.value)}
                  placeholder="Enter category name..."
                  className="w-full bg-gray-50 dark:bg-slate-900 border-2 border-gray-300 dark:border-slate-700 rounded-md px-3 py-2 text-slate-800 dark:text-white outline-none focus:border-blue-500 duration-200"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Category Picture File <span className="text-xs font-normal text-gray-400">(Leave blank to keep current)</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setUpdateCategoryPic(e.target.files[0])}
                  className="w-full bg-gray-50 dark:bg-slate-900 border-2 border-gray-300 dark:border-slate-700 rounded-md px-3 py-2 text-slate-800 dark:text-white outline-none focus:border-blue-500 duration-200 file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 dark:file:bg-slate-700 dark:file:text-white hover:file:bg-blue-100 cursor-pointer"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-gray-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setIsUpdateOpen(false)}
                  className="px-4 py-2 rounded-md font-semibold bg-gray-200 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-gray-300 duration-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 rounded-md font-semibold bg-blue-500 hover:bg-blue-600 text-white duration-200 disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? "Updating..." : "Update Category"}
                </button>
              </div>
            </form>

          </DialogPanel>
        </div>
      </Dialog>

      {/* Headless UI Delete Confirmation Modal */}
      <Dialog open={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity" />

        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-xl bg-white dark:bg-slate-800 p-6 shadow-2xl border-2 border-gray-200 dark:border-slate-700 space-y-4">
            
            <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-slate-700">
              <DialogTitle className="text-lg font-bold text-slate-800 dark:text-white">
                Delete Category
              </DialogTitle>
              <button 
                onClick={() => setIsDeleteOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="py-2 text-slate-700 dark:text-slate-300 text-sm">
              Are you sure you want to delete <span className="font-bold text-slate-900 dark:text-white">{categoryToDelete?.category_name}</span>? This action cannot be undone.
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-gray-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setIsDeleteOpen(false)}
                className="px-4 py-2 rounded-md font-semibold bg-gray-200 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-gray-300 duration-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={submitting}
                onClick={handleDeleteConfirm}
                className="px-4 py-2 rounded-md font-semibold bg-red-500 hover:bg-red-600 text-white duration-200 disabled:opacity-50 cursor-pointer"
              >
                {submitting ? "Deleting..." : "Delete Category"}
              </button>
            </div>

          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}