import axios from "axios";

export const fetchUsers = async () => {
  return await axios.get(
    `${process.env.EXPO_PUBLIC_API_URL}/v1/sys/users/active`
  );
};

export const fetchUserById = async (id_user: number, token: string) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await axios.get(
    `${process.env.EXPO_PUBLIC_API_URL}/v1/sys/users/${id_user}`,
    { headers }
  );

  return response;
};
