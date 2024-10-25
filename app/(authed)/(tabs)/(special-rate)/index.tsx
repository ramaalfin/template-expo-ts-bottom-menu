import { Href, useRouter } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// icons
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// components
import Topbar from "~/components/TopBar";
import { Input } from "~/components/ui/input";

export default function SpesialRateScreen() {
  const navigation = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: "#F48120" }}>
      {/* Header */}
      <Topbar titleBar="Special Rate" />
      {/* header */}

      <View style={styles.container}>
        <View style={{ position: "relative" }}>
          <Input
            placeholder="Cari Nama Nasabah"
            style={styles.input}
          />

          <MaterialIcons
            name="search"
            size={24}
            color="#707070"
            style={{
              position: "absolute",
              top: hp("2%"),
              right: 25
            }}
          />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.specialRateContainer}>
            <View style={styles.specialRateContent}>
              <Image
                source={require("~/assets/icon/ic_koin_sq.png")}
                style={{ width: 45, height: 45 }}
              />

              <View style={{ width: "90%" }}>
                <Text style={styles.titleText}>Fajri Akbar - Jl M. Nawi</Text>
                <Text style={styles.prospectStatus}>Hot Prospect</Text>
                <Text style={styles.nominal}>Rp. 1.700.000</Text>
                <Text style={styles.statusHasil}>Top Up</Text>
              </View>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <TouchableOpacity
                style={styles.shareContainer}
              // onPress={() => navigation.push('/(special-rate)/detail/1' as Href<'/(special-rate)/detail/1'>)}
              >
                <Text style={styles.textShare}>
                  Lihat Detail
                </Text>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={18}
                  color="#FFFFFF"
                  style={styles.iconShare}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>

      <TouchableOpacity
        onPress={() => navigation.push(
          `/(special-rate)/add` as Href<"/(special-rate)/add">
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    marginTop: hp("1%"),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 15,
  },
  specialRateContainer: {
    borderRadius: 20,
    backgroundColor: "#fff",
    padding: 10,
    marginHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginBottom: 10,
  },
  specialRateContent: {
    flexDirection: "row",
    gap: 10,
  },
  titleText: {
    fontFamily: "Inter_700Bold",
    fontSize: 15,
    color: '#000',
    marginBottom: 5,
  },
  prospectStatus: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    color: '#F48120',
    marginBottom: 2,
  },
  nominal: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: '#000',
    marginBottom: 2,
  },
  statusHasil: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    color: '#000',
    marginBottom: 2,
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
  textShare: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#707070",
  },
  iconShare: {
    backgroundColor: "#1D4592",
    borderRadius: 20,
    paddingHorizontal: 2,
  },

  input: {
    marginTop: 5,
    marginBottom: 15,
    marginHorizontal: 15,
    borderColor: "#979797",
    fontSize: 13,
    fontFamily: "Inter_400Regular"
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
  },
});