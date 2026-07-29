import axiosAdmin from "./axiosAdmin";

const orderApi = {
    getAll: async (params = {}) => await axiosAdmin.get("/orders", {params}),
    getById: async (id) => await axiosAdmin.get(`/orders/${id}`),
    // create: async (data) => await axiosAdmin.post("/orders", data, {
    //     headers: {
    //         "Content-Type": "multipart/form-data",
    //     },
    // }),
    // update: async (id, data) => {
    //     if (data instanceof FormData && !data.has("_method")) {
    //         data.append("_method", "PUT");
    //     }
        
    //     return await axiosAdmin.post(`/orders/${id}`, data, {
    //         headers: {
    //             "Content-Type": "multipart/form-data",
    //         },
    //     });
    // },
    // remove: async (id) => await axiosAdmin.delete(`/orders/${id}`),
}

export default orderApi;