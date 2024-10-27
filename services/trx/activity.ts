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
