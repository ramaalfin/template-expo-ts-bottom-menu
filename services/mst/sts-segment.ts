import axios from "../index";

export const fetchStatusSegment = async () => {
  const response = await axios.get(`/v1/mst/sts-segment`);

  return response;
};
