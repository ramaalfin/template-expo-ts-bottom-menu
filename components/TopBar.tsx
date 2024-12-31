import React from "react";

import {
    Dimensions,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

// icons
import { Fontisto } from "@expo/vector-icons";

const TopBar = ({ navigation, titleBar, is_change_password = false }: any) => {
    return (
        <View style={Platform.OS === "web" ? styles.webContainer : styles.areaTopBar}>
            <Text
                style={{
                    fontFamily: "Inter_500Medium",
                    color: "white",
                }}
            >
                {titleBar}
            </Text>

            {is_change_password && (
                <Pressable
                    style={styles.btnSubmit}
                    onPress={() => navigation.navigate("change_password")}
                >
                    <Fontisto name="locked" size={20} color="white" />
                </Pressable>
            )}
        </View>
    );
};

export default TopBar;

const styles = StyleSheet.create({
    webContainer: {
        position: "relative",
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 10,
        backgroundColor: "#125694",
        alignSelf: "center",
        width: "100%",
    },
    areaTopBar: {
        position: "relative",
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 10,
        backgroundColor: "#125694",
        width: Dimensions.get("window").width,
    },

    btnSubmit: {
        position: "absolute",
        top: 20,
        right: 20,
    },
});
