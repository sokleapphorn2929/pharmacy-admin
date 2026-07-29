import axiosAdmin from "./axiosAdmin";

const orderItemApi = {
    getAll: async (params = {}) => await axiosAdmin.get("/order-items", {params}),
    getById: async (id) => await axiosAdmin.get(`/order-items/${id}`),
}

export default orderItemApi;