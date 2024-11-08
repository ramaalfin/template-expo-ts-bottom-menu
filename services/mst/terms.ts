import axios from "../index";

export const fetchTerms = async () => {
  const response = await axios.get(`/v1/mst/terms`);

  return response;
};
