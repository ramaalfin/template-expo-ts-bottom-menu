import axios from "../index";

// create props interface
interface DataFundingProps {
  id_assignment: number;
  id_product: number;
  id_sts_segment: number;
  id_sub_sektor: number;
  id_prospect: number;
  nik: string;
  nama: string;
  alamat: string;
  no_telp: string;
  email: string;
  target: number;
  keterangan: string;
  id_checker: string;
}

export const fetchAllFunding = async () => {
  return await axios.get(`/v1/mst/fundings`);
};

export const fetchFundingByIdUser = async (id_user: number) => {
  return await axios.get(`/v1/mst/fundings/user/${id_user}`);
};

export const fetchFundingById = async (id_funding: number) => {
  return await axios.get(`/v1/mst/fundings/${id_funding}`);
};

export const storeFunding = async (data: DataFundingProps) => {
  return await axios.post(`/v1/mst/fundings`, data);
};

export const updateFunding = async ({
  id_funding,
  data,
}: {
  id_funding: number;
  data: DataFundingProps;
}) => {
  return await axios.put(`/v1/mst/fundings/${id_funding}`, data);
};
