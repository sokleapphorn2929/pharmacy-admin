import axiosAdmin from "./axiosAdmin";

const productApi = {
    getAll: async (params = {}) => await axiosAdmin.get("/products", {params}),
    getById: async (id) => await axiosAdmin.get(`/products/${id}`),
    create: async (data) => await axiosAdmin.post("/products", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    }),
    update: async (id, data) => {
        if (data instanceof FormData && !data.has("_method")) {
            data.append("_method", "PUT");
        }
        
        return await axiosAdmin.post(`/products/${id}`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
    remove: async (id) => await axiosAdmin.delete(`/products/${id}`),
}

export default productApi;