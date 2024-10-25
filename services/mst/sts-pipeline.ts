import axios from "axios";

export const fetchStatusPipeline = async (token: string) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return await axios.get(
    `${process.env.EXPO_PUBLIC_API_URL}/v1/mst/sts-pipeline`,
    {
      headers,
    }
  );
};
