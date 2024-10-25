import axios from "axios";

export const fetchKegiatan = async (token: string) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/v1/mst/kegiatan`, {
    headers,
  });
};
