import { useMemo } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// components
import Topbar from "~/components/TopBar";
import CalendarComponent from "~/components/Calendar";
import { Href, useRouter } from "expo-router";

export default function ActivityScreen() {
  const navigation = useRouter();

  const activities = useMemo(() => {
    const dates = [
      { id: 1, date: '2024-10-01' },
      { id: 2, date: '2024-10-01' },
      { id: 3, date: '2024-10-02' },
    ];

    const frequency = dates.reduce((acc: { [key: string]: number }, current) => {
      acc[current.date] = (acc[current.date] || 0) + 1;
      return acc;
    }, {});

    const markedDates = dates.map((date) => ({
      id: date.id,
      date: date.date,
      occurrences: frequency[date.date],
    }));

    return markedDates;
  }, []);

  return (

    <View style={{ flex: 1, backgroundColor: "#F48120" }}>
      {/* Header */}
      <Topbar titleBar="Aktivitas" />
      {/* header */}

      <View style={styles.container}>
        {/* calendar component */}
        <CalendarComponent activities={activities} />

        <TouchableOpacity
          onPress={() => navigation.push(
            `/(activities)/add` as Href<"/(activities)/add">
          )}

          style={styles.addContainer}
        >
          <Image
            resizeMode="cover"
            source={require("~/assets/icon/add-icon.png")}
            style={{
              width: 25,
              height: 25,
            }}
          />
        </TouchableOpacity>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    marginTop: hp("1%"),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  addContainer: {
    position: "absolute",
    right: 20,
    bottom: 20,
    padding: 10,
    backgroundColor: "#FFF",
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});
