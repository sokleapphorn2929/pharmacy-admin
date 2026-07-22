import axiosAdmin from "./axiosAdmin"

const authApi = {
    loginAdmin: async(credential) => {
        return await axiosAdmin.post("/admins/login", credential);
    },

    registerAdmin: async (adminData) => {
        return await axiosAdmin.post("/admins", adminData)
    },

    logoutAdmin: async () => {
        return await axiosAdmin.post("/admins/logout")
    }
}

export default authApi;