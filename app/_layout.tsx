import "../global.css"

import { Slot } from "expo-router";
import * as React from 'react';
import { StatusBar } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";

// fonts
import {
  useFonts,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { AuthProvider } from "~/context/AuthContext";

export default function Root() {
  let [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" />
        <Slot />
      </SafeAreaView>
    </AuthProvider>
  );
}
