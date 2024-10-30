import { useEffect, useState } from "react";
import { Href, useRouter } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import {
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import { useAuth } from "~/context/AuthContext";

// icons
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { fetchPemutusByIdUser } from "~/services/trx/activity";

// components

export default function ApprovalScreen() {
  const { accessToken, user } = useAuth();
  const [photo, setPhoto] = useState(require("~/assets/images/nophoto.jpg"));
  const [approval, setApproval] = useState([]);
  const navigation = useRouter();

  useEffect(() => {
    user?.photo ? setPhoto({ uri: user.photo }) : setPhoto(require("~/assets/images/nophoto.jpg"));
  })

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchPemutusByIdUser({
        token: accessToken.token,
        idUser: user.id_user
      });

      if (response.status === 200) {
        setApproval(response.data.data.data);
      } else {
        console.log("Gagal mengambil data");
      }
    }

    fetchData();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#F9F9F9" }}>
      <View style={styles.topBar}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
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

        <Text style={styles.topBarSecondaryText}>Your progress</Text>

        <View style={styles.approvalContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ height: hp("65%") }}
          >
            {approval?.length > 0 ? (approval?.map((item: any, index: number) => (
              <TouchableOpacity
                key={index}
                style={styles.menu}
              // onPress={() => navigation.push(
              //   `/update/${item.id_activity}` as Href<"update/[id]">,
              // )}
              >
                <Image
                  source={require("~/assets/icon/ic_notif_kuning.png")}
                  style={{ width: 30, height: 30 }}
                />
                <View style={styles.menuItem}>
                  <Text style={styles.menuText}>
                    {item.mst_funding.nama} - {item.deskripsi} - {item.mst_kegiatan.kegiatan}
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
            ))) : (
              <View style={{
                // place content in the center
                height: hp("65%"),
                justifyContent: "center",
                alignItems: "center",

              }}>
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 14,
                    color: "#707070",
                    textAlign: "center",
                  }}
                >
                  Tidak ada approval
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </View >
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
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
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