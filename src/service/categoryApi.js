import axiosAdmin from "./axiosAdmin";

const categoryApi = {
    getAll: async (params = {}) => await axiosAdmin.get("/categories", {params}),
    getById: async (id) => await axiosAdmin.get(`/categories/${id}`),
    create: async (data) => await axiosAdmin.post("/categories", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    }),
    update: async (id, data) => {
        if (data instanceof FormData && !data.has("_method")) {
            data.append("_method", "PUT");
        }
        
        return await axiosAdmin.post(`/categories/${id}`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
    remove: async (id) => await axiosAdmin.delete(`/categories/${id}`),
}

export default categoryApi;