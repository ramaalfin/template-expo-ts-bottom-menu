import { Platform, StyleSheet, Text, View } from "react-native";

// components
import Topbar from "~/components/TopBar";

export default function SpesialRateScreen() {
  return (
    <View style={Platform.OS === "web" ? styles.webContainer : styles.container}>
      <Topbar titleBar="Special Rate" />

      <View style={styles.content}>
        <Text>Special Rate</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#fff",
    width: "100%",
    maxWidth: 400,
  },
  container: {
    alignItems: "center",
    flex: 1,
  },
  content: {
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
});