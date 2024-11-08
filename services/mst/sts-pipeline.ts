import axios from "../index";

export const fetchStatusPipeline = async () => {
  return await axios.get(`/v1/mst/sts-pipeline`);
};
