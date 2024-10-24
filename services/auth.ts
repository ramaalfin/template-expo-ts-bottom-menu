import axios from "axios";

interface LoginProps {
  email: string;
  password: string;
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

export const logoutUser = async (accessToken: string) => {
  try {
    const response = await axios.post(
      ` ${process.env.EXPO_PUBLIC_API_URL}/v1/auth/logout`,
      {
        accessToken,
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
