import axios from "../index";

export const fetchProspects = async () => {
  const response = await axios.get(`/v1/mst/prospects`);

  return response;
};
