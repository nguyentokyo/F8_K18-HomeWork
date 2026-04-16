import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import type { LoginResponse, LoginAccount, ApiResponse} from "../src/utils"

const baseURL = "https://k305jhbh09.execute-api.ap-southeast-1.amazonaws.com";

const api = axios.create({
    baseURL,
    timeout: 8000,
    headers: { "Content-Type": "application/json" },
});

// 1. Request Interceptor: Gắn Token vào Header
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("accessToken");
        if (token && config.headers) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<any>) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        const isTokenExpired = error.response?.status === 401 ||
            (error.response?.status === 400 && error.response?.data?.message === "token expired");

        if (isTokenExpired && originalRequest && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const currentRefreshToken = localStorage.getItem("refreshToken");

                const res = await axios.post<LoginResponse>(`${baseURL}/auth/refresh-token`, {
                    refreshToken: currentRefreshToken,
                });

                const { accessToken, refreshToken: newRefreshToken } = res.data;

                localStorage.setItem("accessToken", accessToken);
                if (newRefreshToken) localStorage.setItem("refreshToken", newRefreshToken);

                originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                localStorage.clear();
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);


export const login = async (credentials: LoginAccount): Promise<ApiResponse<string>> => {
    try {
        const res = await api.post<LoginResponse>('/auth/signin', credentials);
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        return { data: res.data.accessToken, error: null };
    } catch (err: any) {
        return { data: null, error: err.response?.data?.message || "Sai email hoặc mật khẩu" };
    }
};

const handleRequest = async <T>(promise: Promise<any>): Promise<ApiResponse<T>> => {
    try {
        const res = await promise;
        // Nếu API trả về data null, mình chủ động trả về mảng rỗng ngay tại đây
        return { data: res.data || ([] as unknown as T), error: null };
    } catch (err: any) {
        return { data: null, error: err.response?.data?.message || err.message };
    }
};

export const getData = <T>(endpoint: string) => handleRequest<T>(api.get(endpoint));
export const createData = <T>(endpoint: string, body: any) => handleRequest<T>(api.post(endpoint, body));
export const updateData = <T>(endpoint: string, id: number | string, body: any) => handleRequest<T>(api.put(`${endpoint}/${id}`, body));
export const deleteData = (endpoint: string, id: number | string) => handleRequest(api.delete(`${endpoint}/${id}`));