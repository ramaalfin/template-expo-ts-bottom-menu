import axios from "axios";
import axiosWithAuth from "./index";

interface LoginProps {
  email: string;
  password: string;
}

interface RefreshTokenProps {
  refreshToken: string;
}

interface ChangePasswordProps {
  password: string;
  newPassword: string;
}

export const loginUser = async ({ email, password }: LoginProps) => {
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/v1/auth/login`,
      {
        email,
        password,
      },
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
