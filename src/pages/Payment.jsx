import React, { useEffect, useState } from "react";
import { Search, CreditCard, DollarSign, Calendar, User, CheckCircle, Clock, X, Edit3, Filter } from "lucide-react";
import paymentApi from "../service/paymentApi";

export default function Payment() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("unpaid");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchPayments = async () => {
    try {
      const response = await paymentApi.getAll();
      const rawData = Array.isArray(response) ? response : response.data || response.payments || [];
      setPayments(rawData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setPayments([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // Open Modal and populate current status
  const handleOpenModal = (payment) => {
    setSelectedPayment(payment);
    setPaymentStatus(payment.payment_status || "unpaid");
    setIsModalOpen(true);
  };

  // Close Modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPayment(null);
  };

  // Handle Update Form Submission
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPayment) return;

    const paymentId = selectedPayment.id || selectedPayment._id;

    try {
      setIsSubmitting(true);
      
      const formData = new FormData();
      formData.append("payment_status", paymentStatus);

      await paymentApi.update(paymentId, formData);

      // Update local state smoothly
      setPayments((prevPayments) =>
        prevPayments.map((p) => {
          const pId = p.id || p._id;
          if (pId === paymentId) {
            return { ...p, payment_status: paymentStatus };
          }
          return p;
        })
      );

      handleCloseModal();
    } catch (error) {
      console.error("Failed to update payment status:", error);
      alert("Failed to update status. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter payments based on Payment ID, Order ID, or Payment Method
  const filteredPayments = payments.filter((payment) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase().trim();

    const paymentId = String(payment.id || payment._id || "").toLowerCase();
    const orderId = String(payment.order_id || "").toLowerCase();
    const paymentMethod = String(payment.payment_method || "").toLowerCase();
    const currentStatus = String(payment.payment_status || "").toLowerCase();

    const cleanSearchTerm = searchLower.startsWith('#') ? searchLower.slice(1) : searchLower;

    return (
      paymentId.includes(cleanSearchTerm) ||
      orderId.includes(cleanSearchTerm) ||
      paymentMethod.includes(searchLower) ||
      currentStatus.includes(searchLower)
    );
  });

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center font-bold text-lg dark:text-white">
        Loading Data...
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white dark:bg-slate-900 outline-2 outline-gray-300 dark:outline-slate-700 rounded-lg duration-300 overflow-hidden flex flex-col relative">
      {/* Header Section */}
      <div className="w-full md:h-16 h-14 flex items-center md:px-5 px-3 border-b-2 border-gray-200 dark:border-slate-800 duration-300 justify-between p-5 gap-2">
        <div className="flex items-center gap-2 shrink-0">
          <CreditCard className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <div className="md:text-xl font-extrabold text-slate-800 dark:text-white">
            Payments
          </div>
        </div>
        <div className="relative flex-1 max-w-xs md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full outline-2 rounded-sm md:h-9 h-8 bg-gray-100 dark:bg-slate-800 outline-gray-300 dark:outline-slate-700 duration-300 pl-9 pr-3 text-slate-800 dark:text-white text-xs md:text-sm"
            placeholder="Search payment, order ID..."
          />
        </div>
      </div>

      {/* Payments List Section */}
      <div className="w-full overflow-y-auto p-4 md:p-6 space-y-6 flex-1">
        {filteredPayments.length === 0 ? (
          <div className="w-full text-center py-10 text-gray-400 dark:text-gray-500 font-semibold flex flex-col items-center justify-center gap-2">
            <Filter className="w-8 h-8 text-gray-300 dark:text-gray-600" />
            No payments found.
          </div>
        ) : (
          filteredPayments.map((payment) => {
            const paymentId = payment.id || payment._id || "";
            const orderId = payment.order_id || "";
            const paymentMethod = payment.payment_method || "N/A";
            const paymentStatusVal = payment.payment_status || "unpaid";
            const totalPrice = Number(payment.total_price || 0).toFixed(2);
            const totalDiscount = Number(payment.total_discount || 0).toFixed(2);
            const tax = Number(payment.tax || 0).toFixed(2);
            const createdAt = payment.created_at ? payment.created_at.replace("T", " ").substring(0, 19) : "";

            const isPaid = paymentStatusVal.toLowerCase() === "paid";

            return (
              <div
                key={paymentId}
                className="w-full bg-gray-50 dark:bg-slate-800/60 border-2 border-gray-200 dark:border-slate-700 rounded-xl p-4 md:p-6 shadow-sm space-y-4 duration-300"
              >
                {/* Payment Header Info */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-3 border-b border-gray-200 dark:border-slate-700 gap-3">
                  <div className="space-y-1 overflow-hidden w-full sm:w-auto">
                    <div className="font-extrabold text-slate-800 dark:text-white text-xs sm:text-sm md:text-base tracking-wide truncate">
                      PAYMENT ID: #{paymentId}
                    </div>
                    <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium truncate">
                      Order ID: #{orderId}
                    </div>
                    {createdAt && (
                      <div className="text-[11px] md:text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {createdAt}
                      </div>
                    )}
                  </div>
                  
                  {/* Status Badge & Edit Button */}
                  <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                    <span
                      className={`px-3 py-1 rounded-md text-xs font-extrabold uppercase tracking-wider shadow-xs flex items-center gap-1 ${
                        isPaid ? "bg-emerald-500 text-white" : "bg-amber-500 text-white"
                      }`}
                    >
                      {isPaid ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {paymentStatusVal}
                    </span>
                    <button
                      onClick={() => handleOpenModal(payment)}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold rounded-md transition duration-200 cursor-pointer shadow-xs flex items-center gap-1"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      Update Status
                    </button>
                  </div>
                </div>

                {/* Payment Details Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-1 text-xs md:text-sm">
                  <div className="bg-white dark:bg-slate-900/50 p-2.5 rounded-lg border border-gray-200 dark:border-slate-700">
                    <span className="block text-gray-400 dark:text-gray-500 font-semibold uppercase text-[10px]">Method</span>
                    <span className="font-bold text-slate-800 dark:text-white uppercase flex items-center gap-1 mt-0.5">
                      <CreditCard className="w-3.5 h-3.5 text-blue-500" />
                      {paymentMethod}
                    </span>
                  </div>
                  <div className="bg-white dark:bg-slate-900/50 p-2.5 rounded-lg border border-gray-200 dark:border-slate-700">
                    <span className="block text-gray-400 dark:text-gray-500 font-semibold uppercase text-[10px]">Discount</span>
                    <span className="font-bold text-slate-800 dark:text-white flex items-center gap-0.5 mt-0.5">
                      ${totalDiscount}
                    </span>
                  </div>
                  <div className="bg-white dark:bg-slate-900/50 p-2.5 rounded-lg border border-gray-200 dark:border-slate-700">
                    <span className="block text-gray-400 dark:text-gray-500 font-semibold uppercase text-[10px]">Tax</span>
                    <span className="font-bold text-slate-800 dark:text-white flex items-center gap-0.5 mt-0.5">
                      ${tax}
                    </span>
                  </div>
                  <div className="bg-white dark:bg-slate-900/50 p-2.5 rounded-lg border border-gray-200 dark:border-slate-700">
                    <span className="block text-gray-400 dark:text-gray-500 font-semibold uppercase text-[10px]">Total Price</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-0.5 mt-0.5">
                      <DollarSign className="w-3.5 h-3.5" />
                      {totalPrice}
                    </span>
                  </div>
                </div>

                {/* Footer Total */}
                <div className="pt-3 border-t border-gray-200 dark:border-slate-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1 truncate max-w-full">
                    <User className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">User ID: <span className="font-medium text-slate-700 dark:text-slate-300">#{payment.user_id}</span></span>
                  </div>
                  <div className="text-sm sm:text-base md:text-lg font-extrabold text-slate-900 dark:text-white self-end sm:self-auto">
                    Grand Total: <span className="text-blue-600 dark:text-blue-400">${totalPrice}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Update Status Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl w-full max-w-md p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-slate-700 pb-3">
              <h3 className="text-lg font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-blue-600" />
                Update Payment Status
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 font-bold text-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">
                  Select Status
                </label>
                <select
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  className="w-full h-10 px-3 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg text-slate-800 dark:text-white font-medium outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="unpaid">Unpaid</option>
                  <option value="paid">Paid</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-gray-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-slate-700 dark:text-white text-xs font-bold rounded-lg transition duration-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition duration-200 disabled:opacity-50 cursor-pointer shadow-sm flex items-center gap-1.5"
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}