import axios from "axios";

const baseURL = "https://k305jhbh09.execute-api.ap-southeast-1.amazonaws.com"


const api = axios.create({
    baseURL: baseURL,
    timeout: 8000,
    headers: { "Content-Type": "application/json" },
});



export async function login(email, password) {
    const response = await createData('auth/signin', {email, password});
    const { accessToken, refreshToken } = response.data;

    //save localStorage
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    return accessToken;
}

async function refreshToken() {
    const currentRefreshToken = localStorage.getItem("refreshToken");
    if (!currentRefreshToken) {
        throw new Error("No refresh token available");
    }

    try {
        const res = await axios.post(`${baseURL}/auth/refresh-token`, {
            refreshToken: currentRefreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = res.data;
        localStorage.setItem("accessToken", accessToken);
        if (newRefreshToken) localStorage.setItem("refreshToken", newRefreshToken);

        return accessToken;
    } catch (error) {
        return Promise.reject(error);
    }
}

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(undefined, async (error) => {
    const originalRequest = error.config;

    const isTokenExpired =
        error.response?.status === 401 ||
        (error.response?.status === 400 && error.response?.data?.message === "token expired");

    if (isTokenExpired && !originalRequest._retry) {
        console.warn("Token expired, attempting refresh...");
        originalRequest._retry = true;

        try {
            await refreshToken();
            const newToken = localStorage.getItem("token");
            originalRequest.headers.Authorization = `Bearer ${newToken}`;

            return api(originalRequest);
        } catch (refreshError) {
            return Promise.reject(refreshError);
        }
    }

    return Promise.reject(error);
});

// CRUD
const handleRequest = async (promise) => {
    try {
        const res = await promise;
        return { data: res.data, error: null };
    } catch (err) {
        return { data: null, error: err.response?.data?.message || err.message };
    }
};

export const getData = (endpoint) => handleRequest(api.get(`/${endpoint}`));
export const getDataId = (endpoint, id) => handleRequest(api.get(`/${endpoint}/${id}`));
export const createData = (endpoint, body) => handleRequest(api.post(`/${endpoint}`, body));
export const updateData = (endpoint, id, body) => handleRequest(api.put(`/${endpoint}/${id}`, body));
export const deleteData = (endpoint, id) => handleRequest(api.delete(`/${endpoint}/${id}`));

