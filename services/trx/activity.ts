import axios from "../index";

interface ActivityProps {
  id_funding: number;
  id_kegiatan: number;
  id_sts_pipeline: number;
  tanggal: string;
  jam_mulai: string;
  jam_selesai: string;
  deskripsi: string;
  latitude: string;
  longtitude: string;
}

interface ActivityResultProps {
  id_hasil: number;
  id_tindakan: number;
  id_product: number;
  realisasi: number;
  keterangan_hasil: string | null;
  no_rekening: string | null;
}

interface ActivityApprovalProps {
  id: number;
  keterangan_approval: string;
}

export const createActivity = async (data: ActivityProps) => {
  return await axios.post(`/v1/trx/activity`, data);
};

export const fetchActivityById = async (id: number) => {
  return await axios.get(`/v1/trx/activity/${id}`);
};

export const fetchActivitiesByIdUser = async (idUser: number) => {
  return await axios.get(`/v1/trx/activity/user/${idUser}`);
};

export const fetchActivitiesByIdUserToday = async (idUser: number) => {
  return await axios.get(`/v1/trx/activity/user/${idUser}/today`);
};

export const dashboardByIdUser = async (idUser: number) => {
  return await axios.get(`/v1/trx/activity/dashboard/${idUser}`);
};

export const fetchPemutusByIdUserPemutus = async (idUser: number) => {
  return await axios.get(`/v1/trx/activity/pemutus/${idUser}`);
};

export const updateResultActivityById = async ({
  id,
  data,
}: {
  id: number;
  data: ActivityResultProps;
}) => {
  return await axios.put(`/v1/trx/activity/update-hasil/${id}`, data);
};

export const updateResultActivityNextAppointmentById = async ({
  id,
  data,
}: {
  id: number;
  data: ActivityResultProps;
}) => {
  return await axios.put(
    `/v1/trx/activity/update-hasil-next-appointment/${id}`,
    data
  );
};

export const activityApprove = async ({
  id,
  data,
}: {
  id: number;
  data: ActivityApprovalProps;
}) => {
  return await axios.put(`/v1/trx/activity/approve/${id}`, data);
};

export const activityReject = async ({
  id,
  data,
}: {
  id: number;
  data: ActivityApprovalProps;
}) => {
  return await axios.put(`/v1/trx/activity/reject/${id}`, data);
};

export const nofitication = async (idUser: number) => {
  return await axios.get(`/v1/trx/activity/notifikasi/${idUser}`);
};
