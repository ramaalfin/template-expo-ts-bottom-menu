import axios from "../index";

export const fetchSectors = async () => {
  const response = await axios.get(`/v1/mst/sektor`);

  return response;
};
