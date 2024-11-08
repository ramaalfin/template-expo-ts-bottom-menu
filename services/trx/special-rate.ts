import axios from "../index";

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

export const fetchSpecialRateByIdUser = async (idUser: number) => {
  return await axios.get(`/v1/trx/special-rate/user/${idUser}`);
};

export const fetchSpecialRateByIdUserPemutus = async (idUser: number) => {
  return await axios.get(`/v1/trx/special-rate/pemutus/${idUser}`);
};

export const fetchSpecialRateById = async (id: number) => {
  return await axios.get(`/v1/trx/special-rate/${id}`);
};

export const createSpecialRate = async (data: DataSpecialRateProps) => {
  return await axios.post(`/v1/trx/special-rate`, data);
};

export const specialRateApprove = async ({
  id,
  data,
}: {
  id: number;
  data: SpecialRateApprovalProps;
}) => {
  return await axios.put(`/v1/trx/special-rate/approve/${id}`, data);
};

export const specialRateReject = async ({
  id,
  data,
}: {
  id: number;
  data: SpecialRateApprovalProps;
}) => {
  return await axios.put(`/v1/trx/special-rate/reject/${id}`, data);
};
