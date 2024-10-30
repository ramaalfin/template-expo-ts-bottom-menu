import { Stack } from "expo-router";

export default function ApprovalLayout() {
  return (
    <Stack screenOptions={{ headerBackTitle: "Approval" }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
