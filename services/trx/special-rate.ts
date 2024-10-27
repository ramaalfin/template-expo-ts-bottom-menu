import axios from "axios";

interface DataSpecialRateProps {
  no_rekening: string;
  nama: string;
  id_term: number;
  tgl_buka: string;
  tgl_jatuh_tempo: string;
  nominal: number;
  nominal_dpk: number;
  rate_sebelum: number;
  rate_dimohon: number;
  id_sts_rekening: number;
}

export const createSpecialRate = async ({
  token,
  data,
}: {
  token: string;
  data: DataSpecialRateProps;
}) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return await axios.post(
    `${process.env.EXPO_PUBLIC_API_URL}/v1/trx/special-rate`,
    data,
    { headers }
  );
};
