import { Stack } from "expo-router";

export default function SpecialRatePemutusLayout() {
  return (
    <Stack screenOptions={{ headerBackTitle: "Special Rate Pemutus" }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
