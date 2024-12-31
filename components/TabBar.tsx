import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform } from "react-native";

const TabBar = ({ state, descriptors, navigation }: any) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route: any, index: any) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const icon =
          options.tabBarIcon !== undefined
            ? options.tabBarIcon({ focused: isFocused })
            : null;

        const iconStyle =
          options.tabBarIconStyle !== undefined
            ? options.tabBarIconStyle
            : null;

        const tabStyle =
          options.tabBarStyle !== undefined
            ? options.tabBarStyle
            : null;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[styles.tabBarItem, tabStyle]}
          >
            {iconStyle ? (
              <View style={iconStyle}>{icon}</View>
            ) : (
              icon
            )}

            <Text
              style={{
                color: isFocused ? "#000" : "#999",
                marginTop: 5,
                fontSize: 13,
                fontFamily: "Inter_500Medium",
                ...options.tabBarLabelStyle,
              }}
            >
              {label}
            </Text>

            {isFocused && (
              <View
                style={{
                  height: 5,
                  width: Dimensions.get("window").width / 4,
                  backgroundColor: "#fff",
                  borderRadius: 10,
                  marginTop: 5,
                  shadowColor: "#fff",
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: 0.4,
                  shadowRadius: 10,
                  elevation: 25,
                  ...options.tabBarLabelStyle
                }}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  tabBar: {
    width: Platform.OS === "web" ? 400 : "100%",
    height: Dimensions.get("window").height > 800 ? 70 : 60,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    paddingTop: 6,
    backgroundColor: "#fff",
    shadowRadius: 10,
    shadowOpacity: 0.1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    elevation: 15,
  },

  tabBarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
