import { useCallback, useRef, useState } from "react";

import { Href, useFocusEffect, useRouter } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { useAuth } from "~/context/AuthContext";

// services
import { fetchSpecialRate } from "~/services/trx/special-rate";

// icons
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// components
import Topbar from "~/components/TopBar";
import { Input } from "~/components/ui/input";
import SearchBar from "~/components/SearchBar";

interface SpecialRateProps {
  id_special_rate: number;
  nama: string;
  nominal: string;
  mst_sts_special_rate: {
    sts_special_rate: string;
  }
  mst_prospect: {
    prospect: string;
  }
}

export default function SpesialRateScreen() {
  const { accessToken } = useAuth();
  const navigation = useRouter();

  const [specialRate, setSpecialRate] = useState<SpecialRateProps[]>([]);
  const [filteredSpecialRate, setFilteredSpecialRate] = useState<SpecialRateProps[]>([]);

  const scrollViewRef = useRef<ScrollView>(null);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const response = await fetchSpecialRate({ token: accessToken.token });

          if (response.data.code === 200) {
            setSpecialRate(response.data.data.data);
            setFilteredSpecialRate(response.data.data.data);
          } else {
            console.log("Gagal mengambil data");
          }
        } catch (error) {
          console.log("Gagal mengambil data");
        }
      };

      fetchData();
    }, [accessToken])
  );

  const handleSearch = (keyword: string) => {
    if (keyword === "") {
      setFilteredSpecialRate(specialRate);

      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: 0, animated: true });
      }
    } else {
      const filtered = specialRate.filter((item) => {
        return item.nama.toLocaleLowerCase().includes(keyword.toLocaleLowerCase());
      });

      setFilteredSpecialRate(filtered);
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#F48120" }}>
      {/* Header */}
      <Topbar titleBar="Special Rate" />
      {/* header */}

      <View style={styles.container}>
        <View style={{ position: "relative" }}>
          <SearchBar onSearch={handleSearch} />

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

        <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef}>
          {filteredSpecialRate.length > 0 ? (filteredSpecialRate.map((item, index) => (
            <View style={styles.specialRateContainer} key={index}>
              <View style={styles.specialRateContent}>
                <Image
                  source={require("~/assets/icon/ic_koin_sq.png")}
                  style={{ width: 45, height: 45 }}
                />

                <View style={{ width: "90%" }}>
                  <Text style={styles.titleText}>{item?.nama}</Text>
                  <Text style={styles.prospectStatus}>{item?.mst_prospect?.prospect || "-"}</Text>
                  <Text style={styles.nominal}>Rp. {item?.nominal.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
                  <Text style={styles.statusHasil}>{item?.mst_sts_special_rate?.sts_special_rate || "-"}</Text>
                </View>
              </View>
            </View>
          ))) : (
            <Text style={{
              textAlign: "center",
              marginTop: 20,
              fontFamily: "Inter_400Regular",
            }}>
              Data tidak ditemukan
            </Text>
          )}
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