import { Stack } from "expo-router";

export default function PipelineLayout() {
  return (
    <Stack screenOptions={{ headerBackTitle: "Pipeline" }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
