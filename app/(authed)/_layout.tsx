import { Redirect, Stack } from "expo-router";

export default function AppLayout() {
  const isLogged = true; // Gantilah logika sesuai autentikasi Anda

  if (!isLogged) {
    // Pastikan navigasi terjadi setelah layout telah di-render
    return <Redirect href="/login" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
