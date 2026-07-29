import { Plus, Pencil, Trash2, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import productApi from "../service/productApi";
import categoryApi from "../service/categoryApi";
import brandApi from "../service/brandApi"; // Ensure you have this or fetch accordingly
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  // Add Modal State
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDiscount, setProductDiscount] = useState("");
  const [productStatus, setProductStatus] = useState("available");
  const [productManufacturedDate, setProductManufacturedDate] = useState("");
  const [productExpiredDate, setProductExpiredDate] = useState("");
  const [productDetail, setProductDetail] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [productPic, setProductPic] = useState(null);

  // Update Modal State
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [updateProductName, setUpdateProductName] = useState("");
  const [updateProductPrice, setUpdateProductPrice] = useState("");
  const [updateProductDiscount, setUpdateProductDiscount] = useState("");
  const [updateProductStatus, setUpdateProductStatus] = useState("available");
  const [updateProductManufacturedDate, setUpdateProductManufacturedDate] =
    useState("");
  const [updateProductExpiredDate, setUpdateProductExpiredDate] = useState("");
  const [updateProductDetail, setUpdateProductDetail] = useState("");
  const [updateCategoryId, setUpdateCategoryId] = useState("");
  const [updateBrandId, setUpdateBrandId] = useState("");
  const [updateProductPic, setUpdateProductPic] = useState(null);

  // Delete Modal State
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    try {
      const [prodRes, catRes, brandRes] = await Promise.all([
        productApi.getAll(),
        categoryApi.getAll(),
        brandApi.getAll().catch(() => []),
      ]);

      setProducts(
        Array.isArray(prodRes)
          ? prodRes
          : prodRes.products || prodRes.data || [],
      );
      setCategories(
        Array.isArray(catRes) ? catRes : catRes.categories || catRes.data || [],
      );
      setBrands(
        Array.isArray(brandRes)
          ? brandRes
          : brandRes.brands || brandRes.data || [],
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
      setProducts([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle Add Product Submission
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("product_name", productName);
      formData.append("product_price", productPrice);
      formData.append("product_discount", productDiscount || 0);
      formData.append("product_status", productStatus);
      if (productManufacturedDate){
        formData.append("product_manufactured_date", productManufacturedDate);
      }
      if (productExpiredDate){
        formData.append("product_expired_date", productExpiredDate);
      }

      formData.append("product_detail", productDetail);
      formData.append("category_id", categoryId);
      formData.append("brand_id", brandId);
      if (productPic) {
        formData.append("product_pic", productPic);
      }

      await productApi.create(formData);

      console.log("Manufactured Date State:", productManufacturedDate);

      // Reset form states
      setProductName("");
      setProductPrice("");
      setProductDiscount("");
      setProductStatus("available");
      setProductManufacturedDate("");
      setProductExpiredDate("");
      setProductDetail("");
      setCategoryId("");
      setBrandId("");
      setProductPic(null);
      setIsAddOpen(false);
      fetchData();
    } catch (error) {
      console.log("Failed to create product:", error);
    } finally {
      setSubmitting(false);
    }
  };

  // Open Update Modal and populate values
  const handleOpenUpdate = (prod) => {
    setCurrentProductId(prod.id);
    setUpdateProductName(prod.product_name || "");
    setUpdateProductPrice(prod.product_price || "");
    setUpdateProductDiscount(prod.product_discount || "");
    setUpdateProductStatus(prod.product_status || "available");
    setUpdateProductManufacturedDate(prod.product_manufactured_date || "");
    setUpdateProductExpiredDate(prod.product_expired_date || "");
    setUpdateProductDetail(prod.product_detail || "");
    setUpdateCategoryId(prod.category_id || "");
    setUpdateBrandId(prod.brand_id || "");
    setUpdateProductPic(null);
    setIsUpdateOpen(true);
  };

  // Handle Update Product Submission
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("product_name", updateProductName);
      formData.append("product_price", updateProductPrice);
      formData.append("product_discount", updateProductDiscount || 0);
      formData.append("product_status", updateProductStatus);
      formData.append(
        "product_manufactured_date",
        updateProductManufacturedDate,
      );
      formData.append("product_expired_date", updateProductExpiredDate);
      formData.append("product_detail", updateProductDetail);
      formData.append("category_id", updateCategoryId);
      formData.append("brand_id", updateBrandId);
      if (updateProductPic) {
        formData.append("product_pic", updateProductPic);
      }

      await productApi.update(currentProductId, formData);

      setIsUpdateOpen(false);
      fetchData();
    } catch (error) {
      console.log("Failed to update product:", error);
    } finally {
      setSubmitting(false);
    }
  };

  // Open Delete Modal
  const handleOpenDelete = (prod) => {
    setProductToDelete(prod);
    setIsDeleteOpen(true);
  };

  // Handle Delete Confirmation
  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;
    setSubmitting(true);

    try {
      await productApi.remove(productToDelete.id);
      setIsDeleteOpen(false);
      setProductToDelete(null);
      fetchData();
    } catch (error) {
      console.log("Failed to delete product:", error);
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
          Product Management
        </div>
        <div>
          <input
            type="text"
            className="outline-2 rounded-sm md:w-96 w-40 md:h-9 h-8 bg-gray-100 dark:bg-slate-800 outline-gray-300 dark:outline-slate-700 duration-300 md:px-5 px-2 text-slate-800 dark:text-white"
            placeholder="Search product..."
          />
        </div>
        <div>
          <button
            onClick={() => setIsAddOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 duration-300 md:px-4 px-2.5 py-2 rounded-md flex items-center gap-1 font-bold text-white text-sm md:text-base cursor-pointer"
          >
            <Plus size={18} />
            <div className="md:block hidden">Add Product</div>
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
              <th className="py-3 px-4">Product Name</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod, index) => (
              <tr
                key={prod.id || index}
                className="border-b border-gray-100 dark:border-slate-800/60 hover:bg-gray-50 dark:hover:bg-slate-800/50 duration-200"
              >
                <td className="py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">
                  {`#${index + 1}`}
                </td>
                <td className="py-3 px-4">
                  <img
                    src={prod.product_pic}
                    alt={prod.product_name}
                    className="w-10 h-10 rounded-md object-cover outline outline-gray-300 dark:outline-slate-700"
                  />
                </td>
                <td className="py-3 px-4 font-bold text-slate-800 dark:text-white">
                  {prod.product_name}
                </td>
                <td className="py-3 px-4 font-medium text-slate-700 dark:text-slate-300">
                  ${prod.product_price}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${prod.product_status === "available" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                  >
                    {prod.product_status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleOpenUpdate(prod)}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md duration-300 flex items-center gap-1 text-xs md:text-sm font-semibold cursor-pointer"
                    >
                      <Pencil size={16} />
                      <span className="hidden md:inline">Update</span>
                    </button>
                    <button
                      onClick={() => handleOpenDelete(prod)}
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

      {/* Add Product Modal */}
      <Dialog
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="w-full max-w-lg rounded-xl bg-white dark:bg-slate-800 p-6 shadow-2xl border-2 border-gray-200 dark:border-slate-700 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-slate-700">
              <DialogTitle className="text-lg font-bold text-slate-800 dark:text-white">
                Add New Product
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
                  Product Name
                </label>
                <input
                  type="text"
                  required
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Enter product name..."
                  className="w-full bg-gray-50 dark:bg-slate-900 border-2 border-gray-300 dark:border-slate-700 rounded-md px-3 py-2 text-slate-800 dark:text-white outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Price
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-gray-50 dark:bg-slate-900 border-2 border-gray-300 dark:border-slate-700 rounded-md px-3 py-2 text-slate-800 dark:text-white outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={productDiscount}
                    onChange={(e) => setProductDiscount(e.target.value)}
                    placeholder="0"
                    className="w-full bg-gray-50 dark:bg-slate-900 border-2 border-gray-300 dark:border-slate-700 rounded-md px-3 py-2 text-slate-800 dark:text-white outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Category Name
                  </label>
                  <select
                    required
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-slate-900 border-2 border-gray-300 dark:border-slate-700 rounded-md px-3 py-2 text-slate-800 dark:text-white outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.category_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Brand Name
                  </label>
                  <select
                    required
                    value={brandId}
                    onChange={(e) => setBrandId(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-slate-900 border-2 border-gray-300 dark:border-slate-700 rounded-md px-3 py-2 text-slate-800 dark:text-white outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="">Select Brand</option>
                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.brand_name || brand.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Manufactured Date
                  </label>
                  <input
                    type="date"
                    value={productManufacturedDate}
                    onChange={(e) => setProductManufacturedDate(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-slate-900 border-2 border-gray-300 dark:border-slate-700 rounded-md px-3 py-2 text-slate-800 dark:text-white outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Expired Date
                  </label>
                  <input
                    type="date"
                    value={productExpiredDate}
                    onChange={(e) => setProductExpiredDate(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-slate-900 border-2 border-gray-300 dark:border-slate-700 rounded-md px-3 py-2 text-slate-800 dark:text-white outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Status
                </label>
                <select
                  value={productStatus}
                  onChange={(e) => setProductStatus(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-slate-900 border-2 border-gray-300 dark:border-slate-700 rounded-md px-3 py-2 text-slate-800 dark:text-white outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="available">Available</option>
                  <option value="out_of_stock">Out of Stock</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Product Details
                </label>
                <textarea
                  value={productDetail}
                  onChange={(e) => setProductDetail(e.target.value)}
                  rows="2"
                  placeholder="Enter specifications or description..."
                  className="w-full bg-gray-50 dark:bg-slate-900 border-2 border-gray-300 dark:border-slate-700 rounded-md px-3 py-2 text-slate-800 dark:text-white outline-none focus:border-blue-500"
                ></textarea>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Product Picture File
                </label>
                <input
                  type="file"
                  required
                  accept="image/*"
                  onChange={(e) => setProductPic(e.target.files[0])}
                  className="w-full bg-gray-50 dark:bg-slate-900 border-2 border-gray-300 dark:border-slate-700 rounded-md px-3 py-2 text-slate-800 dark:text-white outline-none file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 dark:file:bg-slate-700 dark:file:text-white cursor-pointer"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-gray-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 rounded-md font-semibold bg-gray-200 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-gray-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 rounded-md font-semibold bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? "Saving..." : "Save Product"}
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Update Product Modal */}
      <Dialog
        open={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="w-full max-w-lg rounded-xl bg-white dark:bg-slate-800 p-6 shadow-2xl border-2 border-gray-200 dark:border-slate-700 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-slate-700">
              <DialogTitle className="text-lg font-bold text-slate-800 dark:text-white">
                Update Product
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
                  Product Name
                </label>
                <input
                  type="text"
                  required
                  value={updateProductName}
                  onChange={(e) => setUpdateProductName(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-slate-900 border-2 border-gray-300 dark:border-slate-700 rounded-md px-3 py-2 text-slate-800 dark:text-white outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Price
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={updateProductPrice}
                    onChange={(e) => setUpdateProductPrice(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-slate-900 border-2 border-gray-300 dark:border-slate-700 rounded-md px-3 py-2 text-slate-800 dark:text-white outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={updateProductDiscount}
                    onChange={(e) => setUpdateProductDiscount(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-slate-900 border-2 border-gray-300 dark:border-slate-700 rounded-md px-3 py-2 text-slate-800 dark:text-white outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Category Name
                  </label>
                  <select
                    required
                    value={updateCategoryId}
                    onChange={(e) => setUpdateCategoryId(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-slate-900 border-2 border-gray-300 dark:border-slate-700 rounded-md px-3 py-2 text-slate-800 dark:text-white outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.category_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Brand Name
                  </label>
                  <select
                    required
                    value={updateBrandId}
                    onChange={(e) => setUpdateBrandId(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-slate-900 border-2 border-gray-300 dark:border-slate-700 rounded-md px-3 py-2 text-slate-800 dark:text-white outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="">Select Brand</option>
                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.brand_name || brand.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Manufactured Date
                  </label>
                  <input
                    type="date"
                    value={updateProductManufacturedDate}
                    onChange={(e) =>
                      setUpdateProductManufacturedDate(e.target.value)
                    }
                    className="w-full bg-gray-50 dark:bg-slate-900 border-2 border-gray-300 dark:border-slate-700 rounded-md px-3 py-2 text-slate-800 dark:text-white outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Expired Date
                  </label>
                  <input
                    type="date"
                    value={updateProductExpiredDate}
                    onChange={(e) =>
                      setUpdateProductExpiredDate(e.target.value)
                    }
                    className="w-full bg-gray-50 dark:bg-slate-900 border-2 border-gray-300 dark:border-slate-700 rounded-md px-3 py-2 text-slate-800 dark:text-white outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Status
                </label>
                <select
                  value={updateProductStatus}
                  onChange={(e) => setUpdateProductStatus(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-slate-900 border-2 border-gray-300 dark:border-slate-700 rounded-md px-3 py-2 text-slate-800 dark:text-white outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="available">Available</option>
                  <option value="out_of_stock">Out of Stock</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Product Details
                </label>
                <textarea
                  value={updateProductDetail}
                  onChange={(e) => setUpdateProductDetail(e.target.value)}
                  rows="2"
                  className="w-full bg-gray-50 dark:bg-slate-900 border-2 border-gray-300 dark:border-slate-700 rounded-md px-3 py-2 text-slate-800 dark:text-white outline-none focus:border-blue-500"
                ></textarea>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Product Picture File{" "}
                  <span className="text-xs font-normal text-gray-400">
                    (Leave blank to keep current)
                  </span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setUpdateProductPic(e.target.files[0])}
                  className="w-full bg-gray-50 dark:bg-slate-900 border-2 border-gray-300 dark:border-slate-700 rounded-md px-3 py-2 text-slate-800 dark:text-white outline-none file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 dark:file:bg-slate-700 dark:file:text-white cursor-pointer"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-gray-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setIsUpdateOpen(false)}
                  className="px-4 py-2 rounded-md font-semibold bg-gray-200 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-gray-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 rounded-md font-semibold bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? "Updating..." : "Update Product"}
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-xl bg-white dark:bg-slate-800 p-6 shadow-2xl border-2 border-gray-200 dark:border-slate-700 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-slate-700">
              <DialogTitle className="text-lg font-bold text-slate-800 dark:text-white">
                Delete Product
              </DialogTitle>
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="py-2 text-slate-700 dark:text-slate-300 text-sm">
              Are you sure you want to delete{" "}
              <span className="font-bold text-slate-900 dark:text-white">
                {productToDelete?.product_name}
              </span>
              ? This action cannot be undone.
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-gray-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setIsDeleteOpen(false)}
                className="px-4 py-2 rounded-md font-semibold bg-gray-200 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-gray-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={submitting}
                onClick={handleDeleteConfirm}
                className="px-4 py-2 rounded-md font-semibold bg-red-500 hover:bg-red-600 text-white disabled:opacity-50 cursor-pointer"
              >
                {submitting ? "Deleting..." : "Delete Product"}
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
