import axios from "../index";

export const fetchAssignmentByIdUser = async (id_user: number) => {
  const response = await axios.get(`/v1/mst/assignments/user/${id_user}`);

  return response;
};
