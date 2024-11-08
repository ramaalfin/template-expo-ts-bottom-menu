import axios from "../index";

export const fetchSubSectorByIdSector = async (id_sector: number) => {
  const response = await axios.get(`/v1/mst/sub-sektor/sektor/${id_sector}`);

  return response;
};
