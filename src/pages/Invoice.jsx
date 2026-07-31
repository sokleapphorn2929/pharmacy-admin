import React, { useEffect, useState } from "react";
import {
  Search,
  FileText,
  Download,
  Calendar,
  DollarSign,
  User,
  Filter,
  Shield,
  Hash,
} from "lucide-react";
import invoiceApi from "../service/invoiceApi";
import orderItemApi from "../service/orderItemApi";
import axiosAdmin from "../service/axiosAdmin";

export default function Invoice() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [downloadingId, setDownloadingId] = useState(null);

  const fetchInvoices = async () => {
    try {
      const response = await invoiceApi.getAll();
      const rawData = Array.isArray(response)
        ? response
        : response.data || response.invoices || [];
      setInvoices(rawData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setInvoices([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  // Handle PDF Download with Product Name Resolution
  const handleDownloadInvoice = async (invoice) => {
    const invoiceId = invoice.id || invoice._id;
    const paymentId = invoice.payment_id;

    try {
      setDownloadingId(invoiceId);

      // 1. Fetch payment to find the order_id
      const paymentRes = await axiosAdmin.get(`/payments/${paymentId}`);
      const paymentData = paymentRes.data.data || paymentRes.data;
      const orderId = paymentData.order_id;

      // 2. Fetch all order items and filter by this order's ID
      const orderItemsRes = await orderItemApi.getAll();
      const allOrderItems = Array.isArray(orderItemsRes)
        ? orderItemsRes
        : orderItemsRes.data || orderItemsRes.order_items || [];

      const currentOrderItems = allOrderItems.filter(
        (item) => item.order_id === orderId,
      );

      // 3. Fetch product names for each order item using product_id
      const itemsWithProductNames = await Promise.all(
        currentOrderItems.map(async (item) => {
          let productName = item.products?.product_name || item.product_id;

          if (!item.products?.product_name && item.product_id) {
            try {
              const prodRes = await axiosAdmin.get(
                `/products/${item.product_id}`,
              );
              const prodData = prodRes.data.data || prodRes.data;
              productName =
                prodData.product_name || prodData.name || item.product_id;
            } catch (err) {
              console.error(
                `Failed to fetch product name for ID: ${item.product_id}`,
                err,
              );
            }
          }

          return {
            ...item,
            resolved_product_name: productName,
          };
        }),
      );

      // 4. Build the HTML string matching the user-side format precisely with product names & discounts
      const htmlContent = `
      <html>
        <head>
          <title>Invoice_${invoice.invoice_number}</title>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; color: #333; }
            .header { border-bottom: 2px solid #eee; padding-bottom: 20px; margin-bottom: 30px; }
            .header h2 { margin: 0; color: #0f172a; font-size: 28px; font-weight: 900; }
            .details { display: flex; justify-content: space-between; margin-bottom: 40px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
            th { background-color: #f8fafc; text-align: left; padding: 12px; font-size: 12px; text-transform: uppercase; color: #64748b; border-bottom: 2px solid #e2e8f0; }
            td { padding: 12px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
            .discount-text { font-size: 11px; color: #16a34a; margin-top: 2px; }
            .total { text-align: right; font-size: 18px; font-weight: bold; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>KH PHARMACY.</h2>
            <p style="color: #64748b; margin-top: 5px;">Official Invoice</p>
          </div>
          
          <div class="details">
            <div>
              <strong>Invoice Number:</strong> ${invoice.invoice_number}<br>
              <strong>Date:</strong> ${new Date(invoice.created_at).toLocaleDateString()}
            </div>
            <div style="text-align: right;">
              <strong>Order ID:</strong> ${orderId}
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th style="text-align: right;">Price</th>
                <th style="text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${
                itemsWithProductNames.length > 0
                  ? itemsWithProductNames
                      .map((item) => {
                        const price = parseFloat(item.price || 0);
                        const discount = parseFloat(item.discount || 0);
                        const qty = parseInt(item.qty || 1);
                        const lineTotal = item.total_price !== undefined ? parseFloat(item.total_price) : (price - discount) * qty;

                        return `
                      <tr>
                        <td>
                          ${item.resolved_product_name}
                          ${discount > 0 ? `<div class="discount-text">Saved $${discount.toFixed(2)} per item</div>` : ''}
                        </td>
                        <td>${qty}</td>
                        <td style="text-align: right;">$${price.toFixed(2)}</td>
                        <td style="text-align: right;">$${lineTotal.toFixed(2)}</td>
                      </tr>
                    `;
                      })
                      .join("")
                  : '<tr><td colspan="4">No items found for this order</td></tr>'
              }
              <tr>
                <td colspan="3"><strong>Delivery Fee</strong></td>
                <td style="text-align: right;"><strong>$1.00</strong></td>
              </tr>
            </tbody>
          </table>

          <div class="total">
            Grand Total: $${(
              (itemsWithProductNames.reduce(
                (sum, item) => {
                  const price = parseFloat(item.price || 0);
                  const discount = parseFloat(item.discount || 0);
                  const qty = parseInt(item.qty || 1);
                  const lineTotal = item.total_price !== undefined ? parseFloat(item.total_price) : (price - discount) * qty;
                  return sum + lineTotal;
                },
                0,
              ) || 0) + 1
            ).toFixed(2)}
          </div>

          <script>
            window.onload = function() { 
              window.print(); 
            }
          </script>
        </body>
      </html>
    `;

      // 5. Print via hidden iframe
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      document.body.appendChild(iframe);

      iframe.contentDocument.open();
      iframe.contentDocument.write(htmlContent);
      iframe.contentDocument.close();
    } catch (error) {
      console.error(error);
      alert("Failed to generate PDF. Check console for details.");
    } finally {
      setDownloadingId(null);
    }
  };

  // Filter invoices based on Invoice Number, Payment ID, or Admin ID
  const filteredInvoices = invoices.filter((invoice) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase().trim();

    const invoiceNum = String(invoice.invoice_number || "").toLowerCase();
    const paymentId = String(invoice.payment_id || "").toLowerCase();
    const adminId = String(invoice.admin_id || "").toLowerCase();
    const invoiceId = String(invoice.id || invoice._id || "").toLowerCase();

    const cleanSearchTerm = searchLower.startsWith("#")
      ? searchLower.slice(1)
      : searchLower;

    return (
      invoiceNum.includes(searchLower) ||
      paymentId.includes(cleanSearchTerm) ||
      adminId.includes(cleanSearchTerm) ||
      invoiceId.includes(cleanSearchTerm)
    );
  });

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center font-bold text-lg dark:text-white">
        Loading Invoices...
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white dark:bg-slate-900 outline-2 outline-gray-300 dark:outline-slate-700 rounded-lg duration-300 overflow-hidden flex flex-col relative">
      {/* Header Section */}
      <div className="w-full md:h-16 h-14 flex items-center md:px-5 px-3 border-b-2 border-gray-200 dark:border-slate-800 duration-300 justify-between p-5 gap-2">
        <div className="flex items-center gap-2 shrink-0">
          <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <div className="md:text-xl font-extrabold text-slate-800 dark:text-white">
            Invoices
          </div>
        </div>
        <div className="relative flex-1 max-w-xs md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full outline-2 rounded-sm md:h-9 h-8 bg-gray-100 dark:bg-slate-800 outline-gray-300 dark:outline-slate-700 duration-300 pl-9 pr-3 text-slate-800 dark:text-white text-xs md:text-sm"
            placeholder="Search invoice number, payment ID..."
          />
        </div>
      </div>

      {/* Invoices List Section */}
      <div className="w-full overflow-y-auto p-4 md:p-6 space-y-6 flex-1">
        {filteredInvoices.length === 0 ? (
          <div className="w-full text-center py-10 text-gray-400 dark:text-gray-500 font-semibold flex flex-col items-center justify-center gap-2">
            <Filter className="w-8 h-8 text-gray-300 dark:text-gray-600" />
            No invoices found.
          </div>
        ) : (
          filteredInvoices.map((invoice) => {
            const invoiceId = invoice.id || invoice._id || "";
            const invoiceNumber = invoice.invoice_number || "N/A";
            const paymentId = invoice.payment_id || "N/A";
            const adminId = invoice.admin_id || "N/A";
            const createdAt = invoice.created_at
              ? invoice.created_at.replace("T", " ").substring(0, 19)
              : "";
            const isDownloading = downloadingId === invoiceId;

            return (
              <div
                key={invoiceId}
                className="w-full bg-gray-50 dark:bg-slate-800/60 border-2 border-gray-200 dark:border-slate-700 rounded-xl p-4 md:p-6 shadow-sm space-y-4 duration-300"
              >
                {/* Invoice Header Info */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-3 border-b border-gray-200 dark:border-slate-700 gap-3">
                  <div className="space-y-1 overflow-hidden w-full sm:w-auto">
                    <div className="font-extrabold text-slate-800 dark:text-white text-xs sm:text-sm md:text-base tracking-wide truncate">
                      INVOICE: {invoiceNumber}
                    </div>
                    <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium truncate">
                      ID: #{invoiceId}
                    </div>
                    {createdAt && (
                      <div className="text-[11px] md:text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {createdAt}
                      </div>
                    )}
                  </div>

                  {/* Download PDF Button */}
                  <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                    <button
                      onClick={() => handleDownloadInvoice(invoice)}
                      disabled={isDownloading}
                      className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold rounded-md transition duration-200 cursor-pointer shadow-xs flex items-center gap-1.5 disabled:opacity-50"
                    >
                      <Download className="w-4 h-4" />
                      {isDownloading ? "Downloading..." : "Download as PDF"}
                    </button>
                  </div>
                </div>

                {/* Invoice Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-1 text-xs md:text-sm">
                  <div className="bg-white dark:bg-slate-900/50 p-2.5 rounded-lg border border-gray-200 dark:border-slate-700">
                    <span className="block text-gray-400 dark:text-gray-500 font-semibold uppercase text-[10px]">
                      Payment ID
                    </span>
                    <span className="font-bold text-slate-800 dark:text-white flex items-center gap-1 mt-0.5 truncate">
                      <Hash className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      {paymentId}
                    </span>
                  </div>
                  <div className="bg-white dark:bg-slate-900/50 p-2.5 rounded-lg border border-gray-200 dark:border-slate-700">
                    <span className="block text-gray-400 dark:text-gray-500 font-semibold uppercase text-[10px]">
                      Admin ID
                    </span>
                    <span className="font-bold text-slate-800 dark:text-white flex items-center gap-1 mt-0.5 truncate">
                      <Shield className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      {adminId}
                    </span>
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
