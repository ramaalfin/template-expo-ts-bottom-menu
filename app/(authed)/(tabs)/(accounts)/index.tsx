import { ActivityIndicator, Image, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import * as SecureStore from 'expo-secure-store';

// icons
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// router
import { useRouter, Href } from "expo-router";
import Topbar from "~/components/TopBar";
import { useEffect, useState } from "react";
import { useAuth } from "~/context/AuthContext";

// components

export default function AccountScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const { user, logout, isLoading } = useAuth();
  const [photo, setPhoto] = useState(require("~/assets/images/nophoto.jpg"));
  const navigation = useRouter();

  useEffect(() => {
    user?.photo ? setPhoto({ uri: user.photo }) : setPhoto(require("~/assets/images/nophoto.jpg"));
  })

  return (
    <View style={{ flex: 1, backgroundColor: "#F48120" }}>
      <Topbar titleBar="Akun Saya" />

      <View style={styles.container}>
        <Image
          source={photo}
          resizeMode="cover"
          style={styles.photoProfile}
        />

        <Text style={styles.name}>{user?.nama}</Text>
        {/* <Text style={styles.position}>{user?.jabatan}</Text> */}

        <View
          style={{
            borderBottomColor: "#999",
            borderBottomWidth: .5,
            marginVertical: 20,
            width: wp("85%"),
            alignSelf: "center",
          }}
        />

        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: "#707070",
              fontSize: 13,
              fontFamily: "Inter_600SemiBold",
            }}
          >
            Pengaturan Lainnya
          </Text>

          <View>
            <TouchableOpacity
              style={styles.menu}
              onPress={() => {
                navigation.push("/about-apps" as Href<"/about-apps">);
              }}
            >
              <Image
                source={require("~/assets/icon/ic_info.png")}
                style={{ width: 25, height: 25 }}
              />

              <View style={styles.menuItem}>
                <Text style={styles.text}>Tentang Aplikasi</Text>

                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={28}
                  color="#707070"
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menu}
              onPress={() => {
                navigation.push("/change-password" as Href<"/change-password">);
              }}
            >
              <Image
                source={require("~/assets/icon/ic_password2.png")}
                style={{ width: 25, height: 25 }}
              />
              <View style={styles.menuItem}>
                <Text style={styles.text}>Ganti Password</Text>

                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={28}
                  color="#707070"
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menu}>
              <Image
                source={require("~/assets/icon/ic_logout.png")}
                style={{ width: 25, height: 25 }}
              />
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={styles.btnLogout}
              >
                <Text style={styles.text}>Logout</Text>

                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={28}
                  color="#707070"
                />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {modalVisible &&
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{ fontFamily: "Inter_400Regular" }}>
                Apakah Anda yakin ingin keluar?
              </Text>
              {/* confirm logout */}
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  marginTop: 20,
                  gap: 10,
                }}
              >
                <Pressable
                  style={[styles.btnConfirm, { backgroundColor: "#F48120" }]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text
                    style={styles.cancelText}
                  >
                    Batal
                  </Text>
                </Pressable>
                <Pressable
                  style={[styles.btnConfirm, { backgroundColor: "#F5F5F5" }]}
                  onPress={logout}
                >
                  {isLoading ? (
                    <ActivityIndicator size="small" color="#F48120" />
                  ) : (
                    <Text style={styles.logoutText}>
                      Keluar
                    </Text>
                  )}
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 25,
    marginTop: hp("15%"),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  photoProfile: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
    marginTop: hp("-10%"),
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  name: {
    color: "#707070",
    fontSize: 22,
    textAlign: "center",
    fontFamily: "Inter_600SemiBold",
  },
  position: {
    color: "#707070",
    fontSize: 11,
    textAlign: "center",
    fontFamily: "Inter_400Regular",
  },
  btnLogout: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: wp("77%"),
    paddingVertical: 9,
  },
  btnConfirm: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: "50%",
  },
  cancelText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    textAlign: "center",
    color: "white",
  },
  logoutText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    textAlign: "center",
    color: "#F48120",
    justifyContent: "center",
  },
  menu: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  menuItem: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#707070",
    alignItems: "center",
    justifyContent: "space-between",
    width: wp("77%"),
    paddingVertical: 9,
  },
  text: {
    color: "#707070",
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    marginVertical: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },

  modalView: {
    width: '90%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
