import axiosAdmin from "./axiosAdmin";

const paymentApi = {
    getAll: async (params = {}) => await axiosAdmin.get("/payments", {params}),
    getById: async (id) => await axiosAdmin.get(`/payments/${id}`),
    create: async (data) => await axiosAdmin.post("/payments", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    }),
    update: async (id, data) => {
        if (data instanceof FormData && !data.has("_method")) {
            data.append("_method", "PUT");
        }
        
        return await axiosAdmin.post(`/payments/${id}`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
    remove: async (id) => await axiosAdmin.delete(`/payments/${id}`),
}

export default paymentApi;