import axios from "../index";

export const fetchKegiatan = async () => {
  return await axios.get(`/v1/mst/kegiatan`);
};
