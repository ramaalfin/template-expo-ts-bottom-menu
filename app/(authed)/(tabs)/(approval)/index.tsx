import { useCallback, useEffect, useState } from "react";
import { Href, useFocusEffect, useRouter } from "expo-router";
import { ScrollView, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import {
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

// context
import { useAuth } from "~/context/AuthContext";

// services
import { fetchPemutusByIdUserPemutus } from "~/services/trx/activity";

// icons
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface ApprovalProps {
  id_activity: number;
  mst_funding: {
    id_funding: number;
    nama: string;
  };
  mst_kegiatan: {
    id_kegiatan: number;
    kegiatan: string;
  };
  deskripsi: string;
}

export default function ApprovalScreen() {
  const { tokens, logout, user } = useAuth();
  const [photo, setPhoto] = useState(require("~/assets/images/nophoto.jpg"));
  const [approval, setApproval] = useState<ApprovalProps[]>([]);
  const navigation = useRouter();

  useEffect(() => {
    user?.photo ? setPhoto({ uri: user.photo }) : setPhoto(photo);
  })

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const response = await fetchPemutusByIdUserPemutus(user.id_user);

          if (response.data.code === 200) {
            setApproval(response.data.data);
          } else {
            logout();
          }
        } catch (error) {
          logout();
        }
      };

      fetchData();
    }, [user.id_user])
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#F9F9F9" }}>
      <View style={styles.topBar}>
        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ width: wp("50%") }}>
            <Text style={styles.topBarPrimaryText}>
              {user.nama}
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
      </View>

      <View style={{ marginTop: hp("-12%"), marginHorizontal: 20 }}>
        <Text style={styles.topBarSecondaryText}>Daftar Persetujuan</Text>
        <View style={styles.approvalContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginBottom: 10 }}
          >
            {approval.length > 0 ? approval.map((item, index) => (
              <View key={index} style={styles.menu}>
                <Image
                  source={require("~/assets/icon/ic_notif_kuning.png")}
                  style={{ width: 20, height: 20 }}
                />
                <View style={styles.menuItem}>
                  <View>
                    <Text style={styles.menuText}>{item?.mst_funding?.nama} - {item?.mst_kegiatan?.kegiatan} - {item?.deskripsi}</Text>
                  </View>
                  <TouchableOpacity
                    style={{ backgroundColor: "#1D4592", borderRadius: 20, padding: 2 }}
                    onPress={() => navigation.push(
                      `/(approval)/detail/${item.id_activity}` as Href<"(approval)/detail/[id]">,
                    )}
                  >
                    <MaterialIcons name="keyboard-arrow-right" size={16} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              </View>
            )) :
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: "#707070",
                  textAlign: "center",
                  marginTop: 10,
                }}
              >
                Tidak ada data persetujuan
              </Text>
            }
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: "#F48120",
    paddingHorizontal: 25,
    paddingVertical: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    height: hp("30%"),
  },
  topBarPrimaryText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Inter_600SemiBold"
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

  approvalContainer: {
    height: hp("67%"),
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginTop: 15,
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
    borderBottomWidth: 0.5,
    borderBottomColor: "#707070",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: wp("68%"),
  },
  menuText: {
    color: "#000",
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    marginVertical: 10,
    width: wp("50%"),
  },
});