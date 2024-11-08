import axios from "../index";

export const fetchProductByIdApplication = async (id_application: number) => {
  const response = await axios.get(
    `/v1/mst/products/application/${id_application}`
  );

  return response;
};
