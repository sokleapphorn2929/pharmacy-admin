import axiosAdmin from "./axiosAdmin";

const invoiceApi = {
    getAll: async (params = {}) => await axiosAdmin.get("/invoices", {params}),
    getById: async (id) => await axiosAdmin.get(`/invoices/${id}`),
}

export default invoiceApi;