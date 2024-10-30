import { Tabs } from "expo-router";

// components
import TabBar from "~/components/TabBar";

// icons
import { HomeIconActive } from "~/assets/menu/HomeIconActive";
import { HomeIconInactive } from "~/assets/menu/HomeIconInactive";
import { AkunIconInactive } from "~/assets/menu/AkunIconInactive";
import { AkunIconActive } from "~/assets/menu/AkunIconActive";
import { AktivitasIconActive } from "~/assets/menu/AktivitasIconActive";
import { AktivitasIconInactive } from "~/assets/menu/AktivitasIconInactive";
import { PipelineIconActive } from "~/assets/menu/PipelineIconActive";
import { PipelineIconInactive } from "~/assets/menu/PipelineIconInactive";
import { SpecialRateIconActive } from "~/assets/menu/SpecialRateIconActive";
import { SpecialRateIconInactive } from "~/assets/menu/SpecialRateIconInactive";
import { useAuth } from "~/context/AuthContext";

export default function TabLayout() {
  const { user } = useAuth();

  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="(homes)"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <HomeIconActive width={27} height={30} />
            ) : (
              <HomeIconInactive width={27} height={30} />
            ),
          headerShown: false,
          tabBarStyle: { marginLeft: -2 },
        }}
      />
      <Tabs.Screen
        name="(pipelines)"
        options={{
          title: "Pipeline",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <PipelineIconActive width={35} height={27} />
            ) : (
              <PipelineIconInactive width={35} height={27} />
            ),
          tabBarIconStyle: {
            marginLeft: user.id_jabatan === 8 ? -25 : -30
          },
          tabBarLabelStyle: {
            marginLeft: user.id_jabatan === 8 ? -25 : -30
          },
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="(special-rate)"
        options={{
          title: "Special Rate",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <SpecialRateIconActive width={35} height={27} />
            ) : (
              <SpecialRateIconInactive width={35} height={27} />
            ),
          headerShown: false,
          tabBarStyle: {
            display: user.id_jabatan === 8 ? "flex" : "none",
            marginLeft: user.id_jabatan === 8 ? -10 : 0,
          },
        }}
      />
      <Tabs.Screen
        name="(activities)"
        options={{
          title: "Aktivitas",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <AktivitasIconActive width={35} height={28} />
            ) : (
              <AktivitasIconInactive width={35} height={28} />
            ),
          tabBarIconStyle: {
            marginRight: user.id_jabatan === 8 ? -10 : 0,
            marginLeft: user.id_jabatan !== 8 ? -45 : 0
          },
          tabBarLabelStyle: {
            marginRight: user.id_jabatan === 8 ? -10 : 0,
            marginLeft: user.id_jabatan !== 8 ? -45 : 0
          },
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="(approval)"
        options={{
          title: "Approval",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <SpecialRateIconActive width={35} height={27} />
            ) : (
              <SpecialRateIconInactive width={35} height={27} />
            ),
          headerShown: false,
          tabBarStyle: {
            display: user.id_jabatan !== 8 ? "flex" : "none",
          },
          tabBarIconStyle: {
            marginLeft: user.id_jabatan === 8 ? 0 : -55
          },
          tabBarLabelStyle: {
            marginLeft: user.id_jabatan === 8 ? 0 : -55
          },
        }}
      />
      <Tabs.Screen
        name="(special-rate-pemutus)"
        options={{
          title: "Special Rate",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <SpecialRateIconActive width={35} height={27} />
            ) : (
              <SpecialRateIconInactive width={35} height={27} />
            ),
          headerShown: false,
          tabBarStyle: {
            display: user.id_jabatan !== 8 ? "flex" : "none",
            marginLeft: -25,
          },
        }}
      />
      <Tabs.Screen
        name="(accounts)"
        options={{
          title: "Profil",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <AkunIconActive width={28} height={28} />
            ) : (
              <AkunIconInactive width={28} height={28} />
            ),
          headerShown: false,
          tabBarStyle: {
            marginLeft: -8,
            marginRight: -2
          },
        }}
      />
    </Tabs>
  );
}
