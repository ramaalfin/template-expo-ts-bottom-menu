import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const tokens = await AsyncStorage.getItem("tokens");
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
      AsyncStorage.removeItem("user");
      AsyncStorage.removeItem("tokens");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
