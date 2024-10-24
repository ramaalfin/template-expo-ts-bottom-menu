import axios from "axios";

export const fetchStatusSegment = async (token: string) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await axios.get(
    `${process.env.EXPO_PUBLIC_API_URL}/v1/mst/sts-segment`,
    { headers }
  );

  return response;
};
