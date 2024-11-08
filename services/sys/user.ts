import axios from "../index";

export const fetchUserById = async (id_user: number) => {
  const response = await axios.get(`/v1/sys/users/${id_user}`);

  return response;
};
