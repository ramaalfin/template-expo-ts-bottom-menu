import axios from "../index";

export const fetchStatusRekening = async () => {
  const response = await axios.get(`/v1/mst/sts-rekening`);

  return response;
};
