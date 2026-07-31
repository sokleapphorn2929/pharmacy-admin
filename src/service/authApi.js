import axiosAdmin from "./axiosAdmin"

const authApi = {
    loginAdmin: async (data) => {
        const response = await axiosAdmin.post('/admins/login', data);
        return response.data ? response.data : response;
    },

    registerAdmin: async (adminData) => {
        return await axiosAdmin.post("/admins", adminData)
    },

    logoutAdmin: async () => {
        return await axiosAdmin.post("/admins/logout")
    }
}

export default authApi;