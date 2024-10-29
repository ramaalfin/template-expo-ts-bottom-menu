import { useCallback, useMemo, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { Href, useRouter } from "expo-router";

// context
import { useAuth } from "~/context/AuthContext";

// services
import { fetchActivitiesByIdUser } from "~/services/trx/activity";

// components
import Topbar from "~/components/TopBar";
import CalendarComponent from "~/components/Calendar";

interface ActivityProps {
  id_activity: number;
  tanggal: string;
  jam_mulai: string;
  jam_selesai: string;
  occurrences: number;
  application: string;
  mst_funding: {
    mst_product: {
      mst_application: {
        application: string;
      };
    };
    nama: string;
  };
  mst_kegiatan: {
    kegiatan: string;
  };
  mst_hasil: {
    hasil: string;
  };
  status: string;
  mst_sts_approval: {
    sts_approval: string;
  };
}

export default function ActivityScreen() {
  const { user, accessToken } = useAuth();
  const [activityDates, setActivityDates] = useState<ActivityProps[]>([]);
  const navigation = useRouter();

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const response = await fetchActivitiesByIdUser({
            token: accessToken.token,
            idUser: user.id_user,
          });

          setActivityDates(response.data.data);
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    }, [accessToken, user.id_user])
  );

  const activities = useMemo(() => {
    const dates = activityDates.map((activity) => ({
      id: activity.id_activity,
      application: activity.mst_funding.mst_product.mst_application.application,
      nama: activity.mst_funding.nama,
      jenis: activity.mst_kegiatan.kegiatan,
      date: activity.tanggal,
      jam_mulai: activity.jam_mulai,
      jam_selesai: activity.jam_selesai,
      status: activity.mst_hasil === null ? "Belum Dilakukan" : "Sudah Dilakukan",
      status_approval: activity.mst_sts_approval.sts_approval,
    }));

    const frequency = dates.reduce((acc: { [key: string]: number }, current) => {
      acc[current.date] = (acc[current.date] || 0) + 1;
      return acc;
    }, {});

    const markedDates = dates.map((date) => ({
      id: date.id,
      occurrences: frequency[date.date],
      application: date.application,
      nama: date.nama,
      jenis: date.jenis,
      date: date.date,
      jam_mulai: date.jam_mulai,
      jam_selesai: date.jam_selesai,
      status: date.status,
      status_approval: date.status_approval
    }));

    return markedDates;
  }, [activityDates])

  return (
    <View style={{ flex: 1, backgroundColor: "#F48120" }} >
      {/* Header */}
      < Topbar titleBar="Aktivitas" />
      {/* header */}

      <View style={styles.container} >
        {/* calendar component */}
        <CalendarComponent activities={activities} />

        <TouchableOpacity
          onPress={() => navigation.push(
            `/(activities)/add` as Href<"/(activities)/add">
          )}

          style={styles.addContainer}
        >
          <Image
            resizeMode="cover"
            source={require("~/assets/icon/add-icon.png")}
            style={{
              width: 25,
              height: 25,
            }}
          />
        </TouchableOpacity>
      </View >
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    marginTop: hp("1%"),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  addContainer: {
    position: "absolute",
    right: 20,
    bottom: 20,
    padding: 10,
    backgroundColor: "#FFF",
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});
