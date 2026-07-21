import axiosAdmin from "./axiosAdmin";

const categoryApi = {
    getAll: async (params = {}) => await axiosAdmin.get("/categories", {params}),
    getById: async (id) => await axiosAdmin.get(`/categories/${id}`),
    create: async (data) => await axiosAdmin.post("/categories", data),
    update: async (id, data) => await axiosAdmin.put(`/categories/${id}`, data),
    remove: async (id) => await axiosAdmin.delete(`/categories/${id}`),
}

export default categoryApi;