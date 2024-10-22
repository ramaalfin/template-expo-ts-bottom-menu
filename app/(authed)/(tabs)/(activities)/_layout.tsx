import { Stack } from "expo-router";

export default function ActivityLayout() {
  return (
    <Stack screenOptions={{ headerBackTitle: "Aktivitas" }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
