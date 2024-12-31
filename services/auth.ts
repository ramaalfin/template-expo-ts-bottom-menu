import axios from "axios";
import axiosWithAuth from "./index";

interface LoginProps {
  username: string;
  password: string;
}

interface RefreshTokenProps {
  refreshToken: string;
}

interface ChangePasswordProps {
  password: string;
  newPassword: string;
}

export const loginUser = async (username: string, password: string) => {
  const data = {
    username: username,
    password: password,
    id_jns_mobile: 4,
  };

  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/auth/login`,
      data
    );

    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const refreshTokenUser = async ({ refreshToken }: RefreshTokenProps) => {
  try {
    const response = await axios.post(
      ` ${process.env.EXPO_PUBLIC_API_URL}/v1/auth/refresh-tokens`,
      { refreshToken },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const changePassword = async ({
  password,
  newPassword,
}: ChangePasswordProps) => {
  try {
    const response = await axiosWithAuth.post(`/v1/auth/change-password`, {
      password,
      newPassword,
    });

    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};
