import { Platform, StyleSheet, Text, View } from "react-native";

// components
import TopBar from "~/components/TopBar";

export default function PipelineScreen() {
  return (
    <View style={Platform.OS === "web" ? styles.webContainer : styles.container}>
      <TopBar titleBar="Pipeline" />

      <View style={styles.content}>
        <Text>Pipeline</Text>
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