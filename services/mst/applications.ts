import axios from "../index";

export const fetchApplications = async () => {
  const response = await axios.get(`/v1/mst/applications`);

  return response;
};
