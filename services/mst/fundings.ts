import axios from "axios";

// create props interface
interface DataFundingProps {
  id_assignment: number;
  id_product: number;
  id_segment: number;
  id_sub_sektor: number;
  nik: string;
  nama: string;
  alamat: string;
  no_telp: string;
  email: string;
  target: number;
  id_checker: string;
}

export const fetchFundingByIdUser = async (id_user: number, token: string) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return await axios.get(
    `${process.env.EXPO_PUBLIC_API_URL}/v1/mst/fundings/user/${id_user}`,
    {
      headers,
    }
  );
};

export const storeFunding = async ({
  token,
  DataFunding,
}: {
  token: string;
  DataFunding: DataFundingProps;
}) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return await axios.post(
    `${process.env.EXPO_PUBLIC_API_URL}/v1/mst/fundings`,
    DataFunding,
    { headers }
  );
};
