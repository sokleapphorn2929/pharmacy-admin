import axiosAdmin from "./axiosAdmin"

const authApi = {
    login: async(credential) => {
        return await axiosAdmin.post("/adimins/login", credential);
    },

    register: async (adminData) => {
        return await axiosAdmin.post("/admins", adminData)
    },

    logout: async () => {
        return await axiosAdmin.post("/admins/logout")
    }
}