import { useEffect, useState } from "react";
import { Href, useRouter } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// context
import { useAuth } from "~/context/AuthContext";

// services
import { fetchAllFunding } from "~/services/mst/fundings";

// icons
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// components
import Topbar from "~/components/TopBar";
import { Input } from "~/components/ui/input";

interface PipelineScreenProps {
  id_funding: number;
  nama: string;
  alamat: string;
  mst_prospect: {
    prospect: string;
  }
  mst_assignment: {
    target: string;
  }
  trx_activity: {
    mst_hasil: {
      hasil: string;
    }
  }
}

export default function PipelineScreen() {
  const navigation = useRouter();
  const { accessToken } = useAuth();

  const [pipelines, setPipelines] = useState<PipelineScreenProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchAllFunding(accessToken.token);

      if (response.data.code === 200) {
        setPipelines(response.data.data);
      } else {
        console.log("Gagal mengambil data");
      }
    }

    fetchData();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#F48120" }}>
      {/* Header */}
      <Topbar titleBar="Pipeline" />
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
          {pipelines.length > 0 ? (pipelines.map((item, index) => (
            <View style={styles.pipelineContainer} key={index}>
              <View style={styles.pipelineContent}>
                <Image
                  source={require("~/assets/icon/ic_kartu_sq.png")}
                  style={{ width: 45, height: 45 }}
                />
                <View style={{ width: "90%" }}>
                  <Text style={styles.titleText}>{item.nama} - {item.alamat}</Text>
                  <Text style={styles.prospectStatus}>Hot Prospect</Text>
                  <Text style={styles.nominal}>Rp. 1.700.000</Text>
                  <Text style={styles.statusHasil}>Top Up</Text>
                </View>
              </View>

              <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                <TouchableOpacity
                  style={styles.shareContainer}
                  onPress={() => navigation.push(`/(pipelines)/detail/${item.id_funding}` as Href<"/(pipelines)/detail/[id]">)}
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
          ))) : (
            <Text style={{ textAlign: "center", marginTop: 20 }}>Data tidak ditemukan</Text>
          )}
        </ScrollView>
      </View>

      <TouchableOpacity
        onPress={() => navigation.push(
          `/(pipelines)/add` as Href<"/(pipelines)/add">
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
  pipelineContainer: {
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
  pipelineContent: {
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