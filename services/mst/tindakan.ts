import axios from "../index";

export const fetchTindakan = async () => {
  const response = await axios.get(`/v1/mst/tindakan`);

  return response;
};
