import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const tokens = await SecureStore.getItemAsync("tokens");
    if (tokens) {
      const tokenParse = JSON.parse(tokens);
      if (tokenParse.access.token) {
        config.headers.Authorization = `Bearer ${tokenParse.access.token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      SecureStore.deleteItemAsync("user");
      SecureStore.deleteItemAsync("tokens");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
