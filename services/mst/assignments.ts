import axios from "axios";

export const fetchAssignmentByIdUser = async (
  id_user: number,
  token: string
) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await axios.get(
    `${process.env.EXPO_PUBLIC_API_URL}/v1/mst/assignments/user/${id_user}`,
    { headers }
  );

  return response;
};
