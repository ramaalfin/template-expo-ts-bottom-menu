import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// icons
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

// router
import { useRouter, Href } from "expo-router";
import Topbar from "~/components/TopBar";

// components

export default function AccountScreen() {
  const navigation = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: "#F48120" }}>
      <Topbar titleBar="Akun Saya" />

      <View style={styles.container}>
        <Image
          source={require("~/assets/images/nophoto.jpg")}
          resizeMode="cover"
          style={styles.photoProfile}
        />

        <Text style={styles.name}>Rahmat Fadilah</Text>
        <Text style={styles.position}>OPS. KC Cimahi Baros</Text>

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
              <FontAwesome5 name="info-circle" size={27} color="#1D4592" />

              <View style={styles.menuItem}>
                <Text style={styles.menuText}>Tentang Aplikasi</Text>

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
              <Fontisto
                name="locked"
                size={27}
                color="#1D4592"
                style={{ marginRight: 4 }}
              />
              <View style={styles.menuItem}>
                <Text style={styles.menuText}>Ganti Password</Text>

                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={28}
                  color="#707070"
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menu}>
              <View
                style={{
                  borderRadius: 50,
                  backgroundColor: "#1D4592",
                  width: 27,
                  height: 27,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="location-exit"
                  size={18}
                  color="white"
                  style={{ transform: [{ rotate: "180deg" }] }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: wp("77%"),
                  paddingVertical: 9,
                }}
              >
                <Text style={styles.menuText}>Logout</Text>

                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={28}
                  color="#707070"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
  menuText: {
    color: "#707070",
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    marginVertical: 10,
  },
});
