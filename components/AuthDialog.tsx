import { Pressable, StyleSheet, Text, View } from "react-native";
import { useAuth } from "~/context/AuthContext";

export const AuthDialog = () => {
    const { logout } = useAuth();

    return (
        <View style={styles.container}>
            <View style={styles.modalContainer}>
                <Text style={styles.title}>Session Expiring Soon</Text>
                <Text style={styles.desc}>
                    Your session is about to expire. Please choose to continue or logout.
                </Text>
                <View style={{ flexDirection: "row", gap: 10 }}>
                    <Pressable style={{ backgroundColor: "#F48120", padding: 8, borderRadius: 5 }}>
                        <Text style={styles.textBtn}>Continue</Text>
                    </Pressable>
                    <Pressable
                        style={{
                            backgroundColor: "#fff",
                            borderWidth: 1,
                            borderColor: "#F48120",
                            padding: 8,
                            borderRadius: 5,
                        }}
                        onPress={logout}
                    >
                        <Text style={styles.textBtn}>Logout</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 8,
        width: 300,
        maxWidth: "90%",
        alignItems: "center",
    },
    title: {
        fontFamily: "Inter_700Bold",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    desc: {
        fontFamily: "Inter_400Regular",
        marginBottom: 20,
        textAlign: "center",
    },
    textBtn: {
        fontFamily: "Inter_500Medium",
        fontSize: 13
    },
})