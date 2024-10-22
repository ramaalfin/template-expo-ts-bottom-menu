import { Text, TouchableOpacity, View } from "react-native";

type SubmitButtonProps = {
  loading: any,
  handleSubmit: any,
};

export default function SubmitButton({ loading, handleSubmit }: SubmitButtonProps) {
  return (
    <View style={{ marginTop: 30 }}>
      <TouchableOpacity
        style={{ backgroundColor: "#1D4592", padding: 12, borderRadius: 10 }}
        onPress={handleSubmit}
      >
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            fontFamily: "Inter_400Regular",
            fontSize: 13,
          }}
        >
          {loading ? "Loading..." : "Masuk"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
