import {
  Image,
  StyleSheet,
  Text,
  View,
  Alert,
  Modal,
  Pressable,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";

// storage
import AsyncStorage from "@react-native-async-storage/async-storage";

// context
import { useNavigation } from "@react-navigation/native";
// import { login, storeTokenFCM } from "../api";

// components
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import InputBox from "../components/Forms/InputBox";
import InputPassword from "../components/Forms/InputPassword";
import SubmitButton from "../components/Forms/SubmitButton";
import { Redirect } from "expo-router";

const { width } = Dimensions.get("window");

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigation = useNavigation();

  const handleSubmit = async () => {
    <Redirect href={"/(homes)"} />;
  };

  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        source={require("../assets/images/Vector_right_top.png")}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: wp("60%"),
          height: hp("20%"),
        }}
      />

      <Image
        resizeMode="contain"
        source={require("../assets/images/Vector_left_top.png")}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: wp("52%"),
          height: hp("29.2%"),
        }}
      />

      <KeyboardAvoidingView
        style={styles.formContainer}
        behavior="padding"
        keyboardVerticalOffset={0}
      >
        <View>
          <Image
            style={styles.logo}
            resizeMode="contain"
            source={require("../assets/images/brandIcon.png")}
          />
          <Text style={styles.logoText}>Sales Activity</Text>
          <Text style={styles.logoText}>Management Application</Text>
        </View>

        <View
          style={{
            padding: 20,
            borderRadius: 15,
            marginTop: hp("5%"),
          }}
        >
          <InputBox
            inputTitle="USERNAME"
            value={username}
            setValue={setUsername}
            type="text"
          />

          <InputPassword
            labelPassword="PASSWORD"
            togglePasswordVisibility={togglePasswordVisibility}
            value={password}
            setValue={setPassword}
            style={{ marginTop: 15 }}
          />

          <View style={{ flexDirection: "row" }}>
            <Pressable
              // onPress={() => navigation.navigate("LupaPasswordScreen")}
              style={{
                flex: 1,
                alignItems: "flex-end",
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  color: "#F48120",
                  marginTop: 10,
                  fontSize: 13,
                }}
              >
                Lupa Password?
              </Text>
            </Pressable>
          </View>

          <SubmitButton
            loading={loading}
            handleSubmit={handleSubmit}
          />
        </View>

        <Image
          resizeMode="cover"
          source={require("../assets/images/Vector.png")}
          style={{
            position: "static",
            bottom: hp("-25%"),
            left: 0,
            width: wp("100%"),
            height: hp("5%"),
          }}
        />
      </KeyboardAvoidingView>
      {/* </View> */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                textAlign: "center",
                marginBottom: 20,
              }}
            >
              {error}
            </Text>
            <View style={{ flexDirection: "row", width: "100%" }}>
              <Pressable
                style={{
                  backgroundColor: "#046B67",
                  paddingVertical: 8,
                  paddingHorizontal: 10,
                  borderRadius: 5,
                  width: "100%",
                }}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 14,
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  Tutup
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: 112,
    height: 112,
    alignSelf: "center",
  },
  logoText: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    textAlign: "center",
    color: "#195883",
  },
  formContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: hp("12.5%"),
  },
  textInput: {
    fontFamily: "Inter_400Regular",
    borderWidth: 1,
    borderColor: "#707070",
    borderRadius: 5,
    width: "100%",
    marginTop: 10,
    paddingHorizontal: 10,
    padding: 8,
  },
  password: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  modalView: {
    margin: 20,
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

  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
