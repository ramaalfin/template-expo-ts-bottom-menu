import axios from "axios";

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

export const createActivity = async ({
  token,
  data,
}: {
  token: string;
  data: ActivityProps;
}) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return await axios.post(
    `${process.env.EXPO_PUBLIC_API_URL}/v1/trx/activity`,
    data,
    { headers }
  );
};

export const fetchActivityById = async ({
  token,
  id,
}: {
  token: string;
  id: number;
}) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return await axios.get(
    `${process.env.EXPO_PUBLIC_API_URL}/v1/trx/activity/${id}`,
    { headers }
  );
};

export const fetchActivitiesByIdUser = async ({
  token,
  idUser,
}: {
  token: string;
  idUser: number;
}) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return await axios.get(
    `${process.env.EXPO_PUBLIC_API_URL}/v1/trx/activity/user/${idUser}`,
    { headers }
  );
};

export const fetchActivitiesByIdUserToday = async ({
  token,
  idUser,
}: {
  token: string;
  idUser: number;
}) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return await axios.get(
    `${process.env.EXPO_PUBLIC_API_URL}/v1/trx/activity/user/${idUser}/today`,
    { headers }
  );
};

export const dashboardByIdUser = async ({
  token,
  idUser,
}: {
  token: string;
  idUser: number;
}) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return await axios.get(
    `${process.env.EXPO_PUBLIC_API_URL}/v1/trx/activity/dashboard/${idUser}`,
    { headers }
  );
};

export const updateResultActivityById = async ({
  token,
  id,
  data,
}: {
  token: string;
  id: number;
  data: ActivityResultProps;
}) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return await axios.put(
    `${process.env.EXPO_PUBLIC_API_URL}/v1/trx/activity/update-hasil/${id}`,
    data,
    { headers }
  );
};

export const updateResultActivityNextAppointmentById = async ({
  token,
  id,
  data,
}: {
  token: string;
  id: number;
  data: ActivityResultProps;
}) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return await axios.put(
    `${process.env.EXPO_PUBLIC_API_URL}/v1/trx/activity/update-hasil-next-appointment/${id}`,
    data,
    { headers }
  );
};
