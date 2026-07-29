import React, { useEffect, useState } from "react";
import orderApi from "../service/orderApi";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchOrders = async () => {
    try {
      const response = await orderApi.getAll();
      const rawData = Array.isArray(response) ? response : response.data || response.orders || [];
      setOrders(rawData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setOrders([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase().trim();
    
    const orderId = String(order.id || order._id || "").toLowerCase();
    const cleanSearchTerm = searchLower.startsWith('#') ? searchLower.slice(1) : searchLower;
    const matchesId = orderId.includes(cleanSearchTerm);

    const matchesProduct = order.order_items && Array.isArray(order.order_items) && order.order_items.some((item) => {
      const productName = item.products?.product_name || "";
      return productName.toLowerCase().includes(searchLower);
    });

    return matchesId || matchesProduct;
  });

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
          Orders
        </div>
        <div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="outline-2 rounded-sm md:w-96 w-40 md:h-9 h-8 bg-gray-100 dark:bg-slate-800 outline-gray-300 dark:outline-slate-700 duration-300 md:px-5 px-2 text-slate-800 dark:text-white text-xs md:text-sm"
            placeholder="Search ID or product..."
          />
        </div>
      </div>

      {/* Orders List Section */}
      <div className="w-full overflow-y-auto p-4 md:p-6 space-y-6 flex-1">
        {filteredOrders.length === 0 ? (
          <div className="w-full text-center py-10 text-gray-400 dark:text-gray-500 font-semibold">
            No orders found.
          </div>
        ) : (
          filteredOrders.map((order) => {
            const orderId = order.id || order._id || "";
            const orderDate = order.order_date || "";
            const orderStatus = order.order_status || "pending";
            const items = order.order_items || [];

            // Calculate order items subtotal + fixed $1.00 delivery fee
            const itemsSubtotal = items.reduce((sum, item) => {
              const itemTotal = item.qty * item.price - (item.discount || 0);
              return sum + itemTotal;
            }, 0);
            const deliveryFee = 1.00;
            const orderGrandTotal = itemsSubtotal + deliveryFee;

            return (
              <div
                key={orderId}
                className="w-full bg-gray-50 dark:bg-slate-800/60 border-2 border-gray-200 dark:border-slate-700 rounded-xl p-4 md:p-6 shadow-sm space-y-4 duration-300"
              >
                {/* Order Header Info */}
                <div className="md:flex justify-between items-start pb-3 border-b border-gray-200 dark:border-slate-700">
                  <div className="space-y-1">
                    <div className="font-extrabold text-slate-800 dark:text-white text-sm md:text-base tracking-wide">
                      ORDER ID: #{orderId}
                    </div>
                    <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium">
                      Date: {orderDate}
                    </div>
                  </div>
                  <div>
                    <span className="px-3 py-1 rounded-md text-xs font-extrabold bg-amber-500 text-white uppercase tracking-wider shadow-xs">
                      {orderStatus}
                    </span>
                  </div>
                </div>

                {/* Ordered Items List */}
                <div className="space-y-2 pt-1">
                  <div className="text-xs font-bold text-gray-400 dark:text-gray-500 tracking-wider uppercase">
                    Ordered Items
                  </div>

                  <div className="space-y-2">
                    {items.map((item, idx) => {
                      const productName = item.products?.product_name || "Unknown Product";
                      const itemTotal = (item.qty * item.price - (item.discount || 0)).toFixed(2);

                      return (
                        <div
                          key={item.id || idx}
                          className="flex justify-between items-center text-sm md:text-base py-1.5"
                        >
                          <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200 font-medium">
                            {item.products?.product_pic && (
                              <img
                                src={item.products.product_pic}
                                alt={productName}
                                className="w-8 h-8 rounded-md object-cover border border-gray-200 dark:border-slate-700"
                              />
                            )}
                            <div>
                              <span>{productName}</span>{" "}
                              <span className="text-gray-400 dark:text-gray-500 font-semibold text-xs">
                                x{item.qty}
                              </span>
                            </div>
                          </div>
                          <div className="font-bold text-slate-800 dark:text-white">
                            ${itemTotal}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Delivery Fee & Total Footer */}
                <div className="pt-3 border-t border-gray-200 dark:border-slate-700 space-y-1.5 text-right">
                  <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium">
                    Delivery Fee: <span className="font-bold text-slate-700 dark:text-slate-300">${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="text-base md:text-lg font-extrabold text-slate-900 dark:text-white">
                    Total: <span className="text-blue-600 dark:text-blue-400">${orderGrandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}