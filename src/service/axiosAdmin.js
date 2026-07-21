import axios from "axios";

const axiosAdmin = axios.create({
    baseURL: "https://pharmacy-system-backend-j77b.onrender.com/api",
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, //it's mean 10s
})

// concept of request API
axiosAdmin.interceptors.request.use(
    (request) => {
        const token = localStorage.getItem("token");
        if (token) {
            request.headers.Authorization = `Bearer ${token}`;
        }
        return request;
    },

    (error) => {
        return Promise.reject(error);
    }
)

// concept of response API
axiosAdmin.interceptors.response.use(
    (response) => response.data.data,
    (error) => {
        if(error.response && error.response.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
)

export default axiosAdmin;