import axios from "axios";

export const fetchSubSectorByIdSector = async (
  id_sector: number,
  token: string
) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await axios.get(
    `${process.env.EXPO_PUBLIC_API_URL}/v1/mst/sub-sektor/sektor/${id_sector}`,
    { headers }
  );

  return response;
};
