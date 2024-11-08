import { Redirect, Stack } from "expo-router";
import { useState } from "react";
import { useAuth } from "~/context/AuthContext";

export default function AppLayout() {
  const { isLoading, isLoggedIn } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />
}
