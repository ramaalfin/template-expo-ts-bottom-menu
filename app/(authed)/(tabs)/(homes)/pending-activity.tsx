import { ScrollView, StyleSheet, Text, View } from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// icons
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// components
import Topbar from "~/components/TopBar";

export default function PendingActivityScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "#F48120" }}>
      {/* Header */}
      <Topbar titleBar="Pending Aktivitas" />
      {/* header */}

      <View style={styles.container}>
        <MaterialIcons name="sort" size={24} color="black" style={{ marginVertical: 20, paddingHorizontal: 10 }} />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.contentContainer}>
            <View style={{
              backgroundColor: "#FBCE0D",
              width: '3%',
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            }}
            ></View>
            <View style={{ padding: 10, width: "90%" }}>
              <Text style={styles.titleText}>jumpa di rumah</Text>
              <Text style={styles.textDesc}>Bpk/Ibu Syahril Gunawan</Text>
              <Text style={styles.textDesc}>Jenis: Visit</Text>
              <Text style={styles.date}>31 Januari 2024 10:00 - 12:00</Text>
              <Text style={styles.textDesc}>Status: <Text style={{ color: "green" }}>Sudah dilakukan</Text></Text>
              <Text style={styles.textDesc}>Approval: <Text style={{ color: "green" }}>approve</Text></Text>
              <Text style={styles.textDesc}>Approve By: M. Yasir</Text>
            </View>
          </View>

          <View style={styles.contentContainer}>
            <View style={{
              backgroundColor: "#FBCE0D",
              width: '3%',
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            }}
            ></View>
            <View style={{ padding: 10, width: "90%" }}>
              <Text style={styles.titleText}>jumpa di rumah</Text>
              <Text style={styles.textDesc}>Bpk/Ibu Syahril Gunawan</Text>
              <Text style={styles.textDesc}>Jenis: Visit</Text>
              <Text style={styles.date}>31 Januari 2024 10:00 - 12:00</Text>
              <Text style={styles.textDesc}>Status: <Text style={{ color: "green" }}>Sudah dilakukan</Text></Text>
              <Text style={styles.textDesc}>Approval: <Text style={{ color: "green" }}>approve</Text></Text>
              <Text style={styles.textDesc}>Approve By: M. Yasir</Text>
            </View>
          </View>

          <View style={styles.contentContainer}>
            <View style={{
              backgroundColor: "#FBCE0D",
              width: '3%',
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            }}
            ></View>
            <View style={{ padding: 10, width: "90%" }}>
              <Text style={styles.titleText}>jumpa di rumah</Text>
              <Text style={styles.textDesc}>Bpk/Ibu Syahril Gunawan</Text>
              <Text style={styles.textDesc}>Jenis: Visit</Text>
              <Text style={styles.date}>31 Januari 2024 10:00 - 12:00</Text>
              <Text style={styles.textDesc}>Status: <Text style={{ color: "green" }}>Sudah dilakukan</Text></Text>
              <Text style={styles.textDesc}>Approval: <Text style={{ color: "green" }}>approve</Text></Text>
              <Text style={styles.textDesc}>Approve By: M. Yasir</Text>
            </View>
          </View>
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
