import axios from "axios";

interface DataSpecialRateProps {
  no_rekening: number;
  nama: string;
  id_term: string;
  tgl_buka: string;
  tgl_jatuh_tempo: string;
  nominal: string;
  nominal_dpk: string;
  rate_sebelum: number;
  rate_dimohon: number;
  id_sts_rekening: number;
  id_sts_special_rate: number;
}

export const storeSpecialRate = async ({
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
