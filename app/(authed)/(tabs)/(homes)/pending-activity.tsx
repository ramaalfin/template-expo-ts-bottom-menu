import { ScrollView, StyleSheet, Text, View } from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// context
import { useAuth } from "~/context/AuthContext";

// icons
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// components
import Topbar from "~/components/TopBar";
import { useEffect, useState } from "react";
import { fetchActivitiesByIdUser } from "~/services/trx/activity";
import { formatDate } from "~/utils/formatDate";

interface PendingActivityProps {
  deskripsi: string;
  mst_funding: {
    nama: string;
    sys_user_checker: {
      nama: string;
    }
  };
  mst_kegiatan: {
    kegiatan: string;
  },
  tanggal: string;
  jam_mulai: string;
  jam_selesai: string;
  status: string;
  mst_sts_approval: {
    id_sts_approval: number;
    sts_approval: string;
  }
}

export default function PendingActivityScreen() {
  const { logout, user } = useAuth();

  const [data, setData] = useState<PendingActivityProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchActivitiesByIdUser(user.id_user);

      if (response.status === 200) {
        setData(response.data.data.filter((item: PendingActivityProps) => item.mst_sts_approval.id_sts_approval === 1));
      } else {
        logout();
      }
    }

    fetchData();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#F48120" }}>
      {/* Header */}
      <Topbar titleBar="Pending Aktivitas" />
      {/* header */}

      <View style={styles.container}>
        <MaterialIcons name="sort" size={24} color="black" style={{ marginVertical: 20, paddingHorizontal: 10 }} />

        <ScrollView showsVerticalScrollIndicator={false}>
          {data.length > 0 ? data.map((item, index) => (
            <View style={styles.contentContainer} key={index}>
              <View style={{
                backgroundColor: "#FBCE0D",
                width: '3%',
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
              }}
              ></View>
              <View style={{ padding: 10, width: "90%" }}>
                <Text style={styles.titleText}>{item.deskripsi || "-"}</Text>
                <Text style={styles.textDesc}>{item.mst_funding.nama || "-"}</Text>
                <Text style={styles.textDesc}>Jenis: {item.mst_kegiatan.kegiatan || "-"}</Text>
                <Text style={styles.date}>
                  {`${formatDate(item.tanggal)} ${item.jam_mulai.split("T")[1].split(":")[0] + ":" + item.jam_mulai.split("T")[1].split(":")[1]} - ${item.jam_selesai.split("T")[1].split(":")[0] + ":" + item.jam_selesai.split("T")[1].split(":")[1]}`}
                </Text>
                <Text style={styles.textDesc}>Approval: <Text>{item.mst_sts_approval.sts_approval || "-"}</Text></Text>
                <Text style={styles.textDesc}>Approve By: {item.mst_funding.sys_user_checker.nama || "-"}</Text>
              </View>
            </View>
          )) : <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 14,
              color: "#707070",
              textAlign: "center",
              marginTop: 10,
            }}>
            Tidak ada data
          </Text>}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    marginTop: hp("1%"),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 10
  },
  contentContainer: {
    borderRadius: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  titleText: {
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    paddingBottom: 5,
  },
  textDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    paddingVertical: 2,
  },
  date: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: "#707070",
    paddingVertical: 2,
  },
});
