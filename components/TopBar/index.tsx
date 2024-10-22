import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const Topbar = ({ titleBar }: any) => {
  const [containerStyle, setContainerStyle] = useState<{ [key: string]: any }>(styles.areaTopBar);
  const navigation = useNavigation();

  useEffect(() => {
    if (width > 1440) {
      setContainerStyle({
        ...styles.areaTopBar,
        width: wp("30%"),
        alignSelf: "center",
      });
    } else {
      setContainerStyle(styles.areaTopBar);
    }
  }, [width]);

  return (
    <View style={containerStyle}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <MaterialIcons name="keyboard-arrow-left" size={28} color="white" />
      </TouchableOpacity>

      <Text
        style={{
          color: "white",
          fontSize: 14,
          marginLeft: 10,
          fontFamily: "Inter_500Medium",
        }}
      >
        {titleBar}
      </Text>
    </View>
  );
};

export default Topbar;

const styles = StyleSheet.create({
  areaTopBar: {
    height: hp("6%"),
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
});
