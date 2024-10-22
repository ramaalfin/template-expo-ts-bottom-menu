import { StyleSheet, Text, TextInput, View } from "react-native";

type InputBoxProps = {
  inputTitle: any,
  value: any,
  setValue: any,
  type: any,
};

export default function InputBox({ inputTitle, value, setValue, type }: InputBoxProps) {
  return (
    <View>
      <Text
        style={{
          fontFamily: "Inter_500Medium",
          color: "#ADADAD",
          fontSize: 13,
        }}
      >
        {inputTitle}
      </Text>
      {/* tidak bisa menginput spasi  */}
      <TextInput
        style={styles.textInput}
        autoCorrect={false}
        value={value}
        onChangeText={(text) => setValue(text)}
        keyboardType={type}
      />
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
});
