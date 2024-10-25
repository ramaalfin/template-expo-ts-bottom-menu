import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

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
            style={styles.tabBarItem}
          >
            {iconStyle ? (
              <View style={iconStyle}>{icon}</View>
            ) : (
              icon
            )}

            <Text
              style={{
                color: isFocused ? "#F48120" : "#707070",
                marginTop: 5,
                fontSize: 12,
                fontFamily: "Inter_400Regular",
                ...options.tabBarLabelStyle,
              }}
            >
              {label}
            </Text>

            {isFocused && (
              <View
                style={{
                  height: 5,
                  width: wp("15%"),
                  backgroundColor: "#F48120",
                  borderRadius: 10,
                  marginTop: 5,
                  shadowColor: "#F48120",
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
    height: hp("9%"),
    flexDirection: "row",
    paddingTop: 6,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowRadius: 10,
    shadowOpacity: 0.1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    elevation: 15,
  },

  tabBarItem: { flex: 1, justifyContent: "center", alignItems: "center" },
});
