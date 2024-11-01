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

interface SpecialRateApprovalProps {
  approve_ket: string;
}

export const fetchSpecialRateByIdUser = async ({
  idUser,
  token,
}: {
  idUser: number;
  token: string;
}) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return await axios.get(
    `${process.env.EXPO_PUBLIC_API_URL}/v1/trx/special-rate/user/${idUser}`,
    { headers }
  );
};

export const fetchSpecialRateByIdUserPemutus = async ({
  idUser,
  token,
}: {
  idUser: number;
  token: string;
}) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return await axios.get(
    `${process.env.EXPO_PUBLIC_API_URL}/v1/trx/special-rate/pemutus/${idUser}`,
    { headers }
  );
};

export const fetchSpecialRateById = async ({
  id,
  token,
}: {
  id: number;
  token: string;
}) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return await axios.get(
    `${process.env.EXPO_PUBLIC_API_URL}/v1/trx/special-rate/${id}`,
    { headers }
  );
};

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

export const specialRateApprove = async ({
  token,
  id,
  data,
}: {
  token: string;
  id: number;
  data: SpecialRateApprovalProps;
}) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return await axios.put(
    `${process.env.EXPO_PUBLIC_API_URL}/v1/trx/special-rate/approve/${id}`,
    data,
    { headers }
  );
};

export const specialRateReject = async ({
  token,
  id,
  data,
}: {
  token: string;
  id: number;
  data: SpecialRateApprovalProps;
}) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return await axios.put(
    `${process.env.EXPO_PUBLIC_API_URL}/v1/trx/special-rate/reject/${id}`,
    data,
    { headers }
  );
};
