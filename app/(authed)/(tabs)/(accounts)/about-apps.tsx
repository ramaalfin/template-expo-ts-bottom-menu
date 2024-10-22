import { Image, StyleSheet, Text, View } from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// components
import Topbar from "~/components/TopBar";

export default function AboutAppsScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "#F48120" }}>
      {/* Header */}
      <Topbar titleBar="Tentang Aplikasi" />
      {/* header */}

      <View style={styles.container}>
        <View style={styles.menu}>
          <Image
            source={require("~/assets/images/profileIcon.png")}
            resizeMode="contain"
            style={{ width: 65, height: 65 }}
          />
          <View style={styles.content}>
            <Text style={styles.titleContent}>
              Sales Activity Management Application
            </Text>
            <Text style={styles.textContent}>Versi 1.0.0</Text>
          </View>
        </View>

        <Text style={styles.description}>Aplikasi yang berfungsi untuk … </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    padding: 25,
    marginTop: hp("1%"),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  menu: {
    gap: 10,
    flexDirection: "row",
  },
  content: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#707070",
    width: wp("60%"),
    paddingBottom: 15,
  },
  titleContent: {
    color: "#1D4592",
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    marginBottom: 10,
    marginTop: 0,
    width: wp("60%"),
  },
  textContent: {
    color: "#707070",
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
  description: {
    color: "#707070",
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    marginTop: 20,
  },
});
