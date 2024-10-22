import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

// icons
import { Feather } from "@expo/vector-icons";

type InputPasswordProps = {
  labelPassword: any,
  togglePasswordVisibility: () => void,
  value: any,
  setValue: any,
  style: object,
};

export default function InputPassword({
  labelPassword,
  value,
  setValue,
  style,
}: InputPasswordProps) {
  // const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={style}>
      <Text
        style={{
          fontFamily: "Inter_500Medium",
          color: "#ADADAD",
          fontSize: 13,
        }}
      >
        {labelPassword}
      </Text>
      <View style={styles.password}>
        <TextInput
          style={styles.textInput}
          secureTextEntry={!showPassword}
          value={value}
          onChangeText={(text) => setValue(text)}
          autoCorrect={false}
        />
        <View style={{ position: "absolute", right: 10, top: 15 }}>
          {showPassword ? (
            <Feather
              name="eye"
              size={15}
              color="#F48120"
              onPress={togglePasswordVisibility}
            />
          ) : (
            <Feather
              name="eye-off"
              size={15}
              color="#F48120"
              onPress={togglePasswordVisibility}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    fontFamily: "Inter_400Regular",
    borderWidth: 1,
    borderTopColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#ADADAD",
    width: "100%",
    paddingHorizontal: 10,
    padding: 8,
    color: "#707070",
  },
  password: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
});
