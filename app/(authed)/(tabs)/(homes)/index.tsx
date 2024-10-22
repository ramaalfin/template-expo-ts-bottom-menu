import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// icon
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { Href, Link, useRouter } from "expo-router";

// components
import * as Progress from 'react-native-progress';

export default function HomeScreen() {
  const navigation = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F9F9F9" }}>
      {/* topbar */}
      <View style={styles.topBar}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ width: wp("45%") }}>
            <Text style={styles.topBarPrimaryText}>
              Hi,{" "}
              <Text style={{ fontFamily: "Inter_600SemiBold" }}>
                Rama Alfin{" "}
              </Text>
            </Text>
            <Text style={styles.topBarSecondaryText}>OPS. KC Cimahi Baros</Text>
          </View>

          <View style={{ flexDirection: "row", gap: 15 }}>
            <TouchableOpacity onPress={() => navigation.push("/notification")}>
              <Ionicons name="notifications" size={27} color="#FFFFFF" />
            </TouchableOpacity>

            <Image
              source={require("~/assets/images/nophoto.jpg")}
              resizeMode="cover"
              style={styles.photoProfile}
            />
          </View>
        </View>

        <Text style={styles.topBarSecondaryText}>Your progress</Text>

        <View style={{}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
            <View style={styles.progressContainer}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  resizeMode="cover"
                  source={require("~/assets/icon/double-check-icon.png")}
                  style={{ width: 50, height: 50 }}
                />
                <Text style={styles.progressTitleText}>
                  Pipeline VS Realisasi
                </Text>

                <View
                  style={{
                    flex: 1,
                    alignItems: "flex-end",
                  }}
                >
                  <Text style={styles.progressMainText}>20</Text>
                  <Text style={styles.progressSecondaryText}>of 40</Text>
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
                    fontSize: 45,
                    fontFamily: "Inter_500Medium",
                    color: "#707070",
                  }}
                >
                  50%
                </Text>
              </View>
            </View>

            <View style={styles.progressContainer}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  resizeMode="cover"
                  source={require("~/assets/icon/double-check-icon.png")}
                  style={{ width: 50, height: 50 }}
                />
                <Text style={styles.progressTitleText}>Pending Aktivitas</Text>

                <View
                  style={{
                    flex: 1,
                    alignItems: "flex-end",
                  }}
                >
                  <Text style={styles.progressMainText}>20</Text>
                  <Text style={styles.progressSecondaryText}>of 40</Text>
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
                    fontSize: 45,
                    fontFamily: "Inter_500Medium",
                    color: "#707070",
                  }}
                >
                  50%
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
          <TouchableOpacity
            style={styles.menu}
            onPress={() => navigation.push(
              `/update/1` as Href<"/update/1">
            )}
          >
            <View
              style={{
                backgroundColor: "#FEBC08",
                borderRadius: 20,
                padding: 8,
              }}
            >
              <MaterialIcons
                name="notifications-active"
                size={15}
                color="#FFFFFF"
              />
            </View>
            <View style={styles.menuItem}>
              <Text style={styles.menuText}>08.00 Meeting Client #1</Text>

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

          <TouchableOpacity
            style={styles.menu}
            onPress={() => navigation.push(
              `/update/1` as Href<"/update/1">
            )}
          >
            <View
              style={{
                backgroundColor: "#E84F37",
                borderRadius: 20,
                padding: 8,
              }}
            >
              <MaterialIcons
                name="notifications-active"
                size={15}
                color="#FFFFFF"
              />
            </View>
            <View style={styles.menuItem}>
              <Text style={styles.menuText}>11.00 Konfirmasi Rekening</Text>

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

          <TouchableOpacity
            style={styles.menu}
            onPress={() => navigation.push(
              `/update/1` as Href<"/update/1">
            )}>
            <View
              style={{
                backgroundColor: "#01979E",
                borderRadius: 20,
                padding: 8,
              }}
            >
              <MaterialIcons
                name="notifications-active"
                size={15}
                color="#FFFFFF"
              />
            </View>
            <View style={styles.menuItem}>
              <Text style={styles.menuText}>12.00 Launch Bareng Client #3</Text>

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

          <TouchableOpacity
            style={styles.menu}
            onPress={() => navigation.push(
              `/update/1` as Href<"/update/1">
            )}>
            <View
              style={{
                backgroundColor: "#437BE9",
                borderRadius: 20,
                padding: 8,
              }}
            >
              <MaterialIcons
                name="notifications-active"
                size={15}
                color="#FFFFFF"
              />
            </View>
            <View style={styles.menuItem}>
              <Text style={styles.menuText}>14.00 Survey Agunan Client #2</Text>

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

          <TouchableOpacity
            style={styles.menu}
            onPress={() => navigation.push(
              `/update/1` as Href<"/update/1">
            )}>
            <View
              style={{
                backgroundColor: "#E84F37",
                borderRadius: 20,
                padding: 8,
              }}
            >
              <MaterialIcons
                name="notifications-active"
                size={15}
                color="#FFFFFF"
              />
            </View>
            <View style={styles.menuItem}>
              <Text style={styles.menuText}>16.00 Meeting Client #4</Text>

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

          <TouchableOpacity
            style={styles.menu}
            onPress={() => navigation.push(
              `/update/1` as Href<"/update/1">
            )}>
            <View
              style={{
                backgroundColor: "#E84F37",
                borderRadius: 20,
                padding: 8,
              }}
            >
              <MaterialIcons
                name="notifications-active"
                size={15}
                color="#FFFFFF"
              />
            </View>
            <View style={styles.menuItem}>
              <Text style={styles.menuText}>16.00 Meeting Client #4</Text>

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
        </ScrollView>
      </View>
      {/* content */}
    </SafeAreaView>
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
  },
});
