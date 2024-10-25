import axios from "axios";

export const fetchStatusRekening = async (token: string) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await axios.get(
    `${process.env.EXPO_PUBLIC_API_URL}/v1/mst/sts-rekening`,
    { headers }
  );

  return response;
};
