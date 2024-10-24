import axios from "axios";

export const fetchProductByIdApplication = async (
  id_application: number,
  token: string
) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await axios.get(
    `${process.env.EXPO_PUBLIC_API_URL}/v1/mst/products/application/${id_application}`,
    { headers }
  );

  return response;
};
