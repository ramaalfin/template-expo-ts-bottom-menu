import axios from "../index";

export const fetchHasil = async () => {
  const response = await axios.get(`/v1/mst/hasil`);

  return response;
};
