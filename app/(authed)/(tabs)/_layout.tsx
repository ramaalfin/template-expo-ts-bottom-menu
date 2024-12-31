import { Tabs } from "expo-router";

// components
import TabBar from "~/components/TabBar";

// icons
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabLayout() {
  return (
    <Tabs tabBar={(props: any) => <TabBar {...props} />}>
      <Tabs.Screen
        name="(homes)"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="home-sharp" size={24} color="black" />
            ) : (
              <Ionicons name="home-outline" size={24} color="black" />
            ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="(pipelines)"
        options={{
          title: "Pipeline",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome5 name="user-alt" size={24} color="black" />
            ) : (
              <FontAwesome5 name="user" size={24} color="black" />
            ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="(special-rate)"
        options={{
          title: "Special Rate",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialCommunityIcons name="contacts" size={24} color="black" />
            ) : (
              <MaterialCommunityIcons name="contacts-outline" size={24} color="black" />
            ),
          headerShown: false,
          tabBarStyle: {
            display: "flex",
          },
        }}
      />
    </Tabs>
  );
}
