import axiosAdmin from "./axiosAdmin";

const brandApi = {
    getAll: async (params = {}) => await axiosAdmin.get("/brands", {params}),
    getById: async (id) => await axiosAdmin.get(`/brands/${id}`),
    create: async (data) => await axiosAdmin.post("/brands", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    }),
    update: async (id, data) => {
        if (data instanceof FormData && !data.has("_method")) {
            data.append("_method", "PUT");
        }
        
        return await axiosAdmin.post(`/brands/${id}`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
    remove: async (id) => await axiosAdmin.delete(`/brands/${id}`),
}

export default brandApi;