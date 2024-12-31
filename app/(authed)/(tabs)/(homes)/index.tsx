import { useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

// context
import { useAuth } from "~/context/AuthContext";

// icon
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function HomeScreen() {
  const { logout } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={Platform.OS === "web" ? styles.webContainer : styles.container}>
      <View style={{ flex: 1, width: "100%" }}>
        <View style={styles.topBar}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Text
              style={{
                fontFamily: "Inter_500Medium",
                fontSize: 12,
                width: 50,
                lineHeight: 15,
              }}
            >
              Islamic School
            </Text>
          </View>

          <MaterialCommunityIcons
            name="logout-variant"
            size={24}
            color="#125694"
            onPress={() => setModalVisible(true)}
          />
        </View>

        <View style={styles.bioContainer}>
          <Text>Home</Text>
        </View>

        <Modal
          animationType="fade"
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
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  marginTop: 20,
                  gap: 10,
                }}
              >
                <Pressable
                  style={[styles.btnModal, { backgroundColor: "#125694" }]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={[styles.btnModalText, { color: "white" }]}>Batal</Text>
                </Pressable>
                <Pressable
                  style={[styles.btnModal, { backgroundColor: "#f5f5f5" }]}
                  onPress={() => {
                    logout();
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={[styles.btnModalText, { color: "#125694" }]}>Ya</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#fff",
    width: "100%",
    maxWidth: 400,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 5,
    height: Dimensions.get("window").height / 15,
  },
  bioContainer: {
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden'
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    width: "100%",
    maxWidth: Platform.OS === "web" ? 400 : "100%",
    alignSelf: "center",
  },
  modalView: {
    margin: 30,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  btnModal: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: "50%",
  },
  btnModalText: {
    fontFamily: "Inter_600SemiBold",
    textAlign: "center",
  },
});
