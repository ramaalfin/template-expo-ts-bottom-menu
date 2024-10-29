import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// icon
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { Href, useRouter } from "expo-router";

// components
import * as Progress from 'react-native-progress';
import { useEffect, useState } from "react";
import { dashboardByIdUser, fetchActivitiesByIdUserToday } from "~/services/trx/activity";
import { useAuth } from "~/context/AuthContext";

interface DataProps {
  countClosing: number;
  countTotal: number;
  pctClosing: number;
  countPending: number;
  pctPending: number;
}

interface ActivityTodayProps {
  jam_mulai: string;
  jam_selesai: string;
}

export default function HomeScreen() {
  const navigation = useRouter();
  const { accessToken, user } = useAuth();
  const [photo, setPhoto] = useState(require("~/assets/images/nophoto.jpg"));

  const [data, setData] = useState<DataProps>();
  const [activityToday, setActivityToday] = useState<ActivityTodayProps[]>([]);

  useEffect(() => {
    user?.photo ? setPhoto({ uri: user.photo }) : setPhoto(require("~/assets/images/nophoto.jpg"));
  })

  useEffect(() => {
    const fetchData = async () => {
      // fetch data
      const response = await dashboardByIdUser({
        token: accessToken.token,
        idUser: user.id_user,
      });

      if (response.data.code === 200) {
        setData(response.data.data);
      } else {
        console.log("Gagal mengambil data");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchActivitiesByIdUserToday({
        token: accessToken.token,
        idUser: user.id_user,
      });

      if (response.data.code === 200) {
        setActivityToday(response.data.data);
      } else {
        console.log("Gagal mengambil data");
      }
    }

    fetchData();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#F9F9F9" }}>
      {/* topbar */}
      <View style={styles.topBar}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ width: wp("45%") }}>
            <Text style={styles.topBarPrimaryText}>
              Hi,{" "}
              <Text style={{ fontFamily: "Inter_600SemiBold" }}>
                {user.nama}
              </Text>
            </Text>
            <Text style={styles.topBarSecondaryText}>OPS. KC Cimahi Baros</Text>
          </View>

          <View style={{ flexDirection: "row", gap: 15 }}>
            <TouchableOpacity onPress={() => navigation.push("/notification")}>
              <Ionicons name="notifications" size={27} color="#FFFFFF" />
            </TouchableOpacity>

            <Image
              source={photo}
              resizeMode="cover"
              style={styles.photoProfile}
            />
          </View>
        </View>

        <Text style={styles.topBarSecondaryText}>Your progress</Text>

        <View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
            <View style={styles.progressContainer}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  resizeMode="cover"
                  source={require("~/assets/icon/ic_ceklis.png")}
                  style={{ width: 50, height: 50 }}
                />
                <Text style={styles.progressTitleText}>
                  Pipeline VS Realisasi
                </Text>

                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.progressMainText}>{data?.countClosing || '-'}</Text>
                  <Text style={styles.progressSecondaryText}>of {data?.countTotal || '-'}</Text>
                </View>
              </View>

              <Progress.Bar progress={0.5} width={240} color="#9CEF39" style={{ marginTop: 15 }} />

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={styles.shareContainer}
                  onPress={() => {
                    navigation.push("/pipeline-realisasi");
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Inter_400Regular",
                      fontSize: 12,
                      color: "#707070",
                    }}
                  >
                    Lihat Semua
                  </Text>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={18}
                    color="#FFFFFF"
                    style={{
                      backgroundColor: "#1D4592",
                      borderRadius: 20,
                      paddingHorizontal: 2,
                    }}
                  />
                </TouchableOpacity>

                <Text
                  style={{
                    fontSize: 34,
                    fontFamily: "Inter_500Medium",
                    color: "#707070",
                  }}
                >
                  {data?.pctClosing ? data?.pctClosing.toFixed(1).replace('.', ',') : '-'}%
                </Text>
              </View>
            </View>

            <View style={styles.progressContainer}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  resizeMode="cover"
                  source={require("~/assets/icon/ic_jam.png")}
                  style={{ width: 50, height: 50 }}
                />
                <Text style={styles.progressTitleText}>Pending Aktivitas</Text>

                <View
                  style={{
                    flex: 1,
                    alignItems: "flex-end",
                  }}
                >
                  <Text style={styles.progressMainText}>{data?.countPending || '-'}</Text>
                  <Text style={styles.progressSecondaryText}>of {data?.countTotal}</Text>
                </View>
              </View>

              <Progress.Bar progress={0.5} width={240} color="#9A3EEC" style={{ marginTop: 15 }} />

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <TouchableOpacity
                  style={styles.shareContainer}
                  onPress={() => {
                    navigation.push("/pending-activity");
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Inter_400Regular",
                      fontSize: 12,
                      color: "#707070",
                    }}
                  >
                    Lihat Semua
                  </Text>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={18}
                    color="#FFFFFF"
                    style={{
                      backgroundColor: "#1D4592",
                      borderRadius: 20,
                      paddingHorizontal: 2,
                    }}
                  />
                </TouchableOpacity>

                <Text
                  style={{
                    fontSize: 34,
                    fontFamily: "Inter_500Medium",
                    color: "#707070",
                  }}
                >
                  {data?.pctPending ? data?.pctPending.toFixed(1).replace('.', ',') : '-'}%
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
      {/* topbar */}

      {/* content */}
      <View style={styles.titleContent}>
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 14,
            color: "#707070",
          }}
        >
          Daftar Pengingat Hari Ini
        </Text>

        <TouchableOpacity>
          <MaterialCommunityIcons
            name="dots-horizontal"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.meetContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ height: hp("33%") }}
        >
          {activityToday.map((item: any, index: number) => (
            <TouchableOpacity
              key={index}
              style={styles.menu}
              onPress={() => navigation.push(
                `/update/${item.id_activity}` as Href<{ id_activity: number }>
              )}
            >
              <Image
                source={require("~/assets/icon/ic_notif_kuning.png")}
                style={{ width: 30, height: 30 }}
              />
              <View style={styles.menuItem}>
                <Text style={styles.menuText}>
                  {item.mst_funding.nama} - {item.deskripsi}
                </Text>

                <View
                  style={{
                    backgroundColor: "#1D4592",
                    borderRadius: 20,
                    padding: 2,
                  }}
                >
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={16}
                    color="#FFFFFF"
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {/* content */}
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: "#F48120",
    paddingHorizontal: 25,
    paddingVertical: 25,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: hp("30%"),
  },
  topBarPrimaryText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Inter_400Regular",
  },
  topBarSecondaryText: {
    color: "white",
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
  photoProfile: {
    width: 80,
    height: 80,
    borderRadius: 75,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#fff",
  },
  progressContainer: {
    backgroundColor: "#fff",
    width: wp("75%"),
    margin: 4,
    padding: 15,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 3,
  },
  progressTitleText: {
    color: "#707070",
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    marginLeft: 10,
  },
  progressMainText: {
    fontFamily: "Inter_400Regular",
    fontSize: 25,
    color: "#707070",
    textAlign: "center",
  },
  progressSecondaryText: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#707070",
    textAlign: "center",
  },
  shareContainer: {
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 20,
    width: 130,
    justifyContent: "space-between",
    marginTop: 10,
  },
  titleContent: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    marginTop: hp("15%"),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  meetContainer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 25,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menu: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 5,
  },
  menuItem: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#707070",
    alignItems: "center",
    justifyContent: "space-between",
    width: wp("60%"),
  },
  menuText: {
    color: "#707070",
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    marginVertical: 10,
    width: wp("50%"),
  },
});
