import { Stack } from "expo-router";

export default function SpecialRateLayout() {
  return (
    <Stack screenOptions={{ headerBackTitle: "Special Rate" }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
