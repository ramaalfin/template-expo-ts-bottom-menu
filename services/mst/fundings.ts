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
  keterangan: string;
  id_checker: string;
}

export const fetchAllFunding = async (token: string) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/v1/mst/fundings`, {
    headers,
  });
};

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

export const fetchFundingById = async ({
  id_funding,
  token,
}: {
  id_funding: number;
  token: string;
}) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return await axios.get(
    `${process.env.EXPO_PUBLIC_API_URL}/v1/mst/fundings/${id_funding}`,
    {
      headers,
    }
  );
};

export const storeFunding = async ({
  token,
  data,
}: {
  token: string;
  data: DataFundingProps;
}) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return await axios.post(
    `${process.env.EXPO_PUBLIC_API_URL}/v1/mst/fundings`,
    data,
    { headers }
  );
};

export const updateFunding = async ({
  id_funding,
  token,
  data,
}: {
  id_funding: number;
  token: string;
  data: DataFundingProps;
}) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return await axios.put(
    `${process.env.EXPO_PUBLIC_API_URL}/v1/mst/fundings/${id_funding}`,
    data,
    { headers }
  );
};
