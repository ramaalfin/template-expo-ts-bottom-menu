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
            source={require("~/assets/icon/icon_login.png")}
            resizeMode="contain"
            style={{ width: 65, height: 65 }}
          />
          <View>
            <Text style={styles.titleContent}>
              Funding App of Super Team
            </Text>
            <Text style={styles.textContent}>Versi 1.0.0</Text>
          </View>
        </View>

        <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere eligendi, aut blanditiis laborum dolores illum? Facere odit quis non doloremque. Magnam accusamus temporibus ipsam autem ipsum eligendi facere facilis voluptates.</Text>
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
    borderBottomWidth: 0.5,
    borderBottomColor: "#707070",
    paddingBottom: 15,
  },
  titleContent: {
    color: "#F48120",
    fontSize: 14,
    fontFamily: "Inter_500Medium",
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
