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

export default function TabLayout() {
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
            marginLeft: -15
          },
          tabBarLabelStyle: {
            marginLeft: -15
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
            marginRight: -15
          },
          tabBarLabelStyle: {
            marginRight: -15
          },
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="(accounts)"
        options={{
          title: "Akun",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <AkunIconActive width={28} height={28} />
            ) : (
              <AkunIconInactive width={28} height={28} />
            ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
