import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { Href, useRouter } from "expo-router";

// icons
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

// components
import Topbar from "~/components/TopBar";

export default function DetailPipeline() {
    const navigation = useRouter();

    return (
        <>
            <View style={{ flex: 1, backgroundColor: "#F48120" }}>
                {/* Header */}
                <Topbar titleBar="Detail Pipeline" />
                {/* header */}

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.titleContent}>Profil Nasabah</Text>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={styles.textContent}>Segment</Text>
                                <Text style={styles.textContent}>Retail</Text>
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={styles.textContent}>NIK</Text>
                                <Text style={styles.textContent}>1234567890</Text>
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={styles.textContent}>Nama</Text>
                                <Text style={styles.textContent}>Abdul</Text>
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={styles.textContent}>No Telepon</Text>
                                <Text style={styles.textContent}>081234567890</Text>
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={styles.textContent}>Email</Text>
                                <Text style={styles.textContent}>abdul@mail.com</Text>
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={styles.textContent}>Alamat Lengkap</Text>
                                <Text style={styles.textContent}>Jl. Pembangunan, Bogor</Text>
                            </View>

                            <View style={{ borderBottomWidth: .5, borderBottomColor: "#999", marginVertical: 10 }}></View>

                            <Text style={styles.titleContent}>Data Pipeline</Text>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={styles.textContent}>Aplikasi</Text>
                                <Text style={styles.textContent}>Giro</Text>
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={styles.textContent}>Produk</Text>
                                <Text style={styles.textContent}>Swasta</Text>
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={styles.textContent}>Level Pipeline</Text>
                                <Text style={styles.textContent}>Hot Prospect</Text>
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={styles.textContent}>Approval</Text>
                                <Text style={styles.textContent}>Mardianto</Text>
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={styles.textContent}>Target</Text>
                                <Text style={styles.textContent}>Rp. 1.000.000</Text>
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={styles.textContent}>Keterangan</Text>
                                <Text style={styles.textContent}>giro</Text>
                            </View>

                            <TouchableOpacity
                                style={styles.btnItem}
                                onPress={() => navigation.push('/update/1' as Href<'/update/1'>)}
                            >
                                <Text style={styles.btnText}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.historyContainer}>
                        <Text style={styles.titleHistory}>History Prospect</Text>

                        <View style={styles.pipelineContainer}>
                            <View style={styles.pipelineContent}>
                                <View style={styles.pipelineIcon}>
                                    <FontAwesome5 name="coins" size={20} color="#fff" />
                                </View>
                                <View style={{ width: "90%" }}>
                                    <Text style={styles.dateText}>04 Oktober 2024 12:00:00 WIB</Text>
                                    <Text style={styles.titleText}>Fajri Akbar - Jl M. Nawi</Text>
                                    <Text style={styles.textDesc}>Agenda: Inisialisasi/Prospek</Text>
                                    <Text style={styles.textDesc}>Hasil: Top Up</Text>
                                    <Text style={styles.textDesc}>Approval: Menunggu Approval</Text>
                                    <Text style={styles.textDesc}>Approve By: M. Yasir</Text>
                                    <Text style={styles.textDesc}>Catatan Approval: -</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.pipelineContainer}>
                            <View style={styles.pipelineContent}>
                                <View style={styles.pipelineIcon}>
                                    <FontAwesome5 name="coins" size={20} color="#fff" />
                                </View>
                                <View style={{ width: "90%" }}>
                                    <Text style={styles.dateText}>04 Oktober 2024 12:00:00 WIB</Text>
                                    <Text style={styles.titleText}>Fajri Akbar - Jl M. Nawi</Text>
                                    <Text style={styles.textDesc}>Agenda: Inisialisasi/Prospek</Text>
                                    <Text style={styles.textDesc}>Hasil: Top Up</Text>
                                    <Text style={styles.textDesc}>Approval: Menunggu Approval</Text>
                                    <Text style={styles.textDesc}>Approve By: M. Yasir</Text>
                                    <Text style={styles.textDesc}>Catatan Approval: -</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.pipelineContainer}>
                            <View style={styles.pipelineContent}>
                                <View style={styles.pipelineIcon}>
                                    <FontAwesome5 name="coins" size={20} color="#fff" />
                                </View>
                                <View style={{ width: "90%" }}>
                                    <Text style={styles.dateText}>04 Oktober 2024 12:00:00 WIB</Text>
                                    <Text style={styles.titleText}>Fajri Akbar - Jl M. Nawi</Text>
                                    <Text style={styles.textDesc}>Agenda: Inisialisasi/Prospek</Text>
                                    <Text style={styles.textDesc}>Hasil: Top Up</Text>
                                    <Text style={styles.textDesc}>Approval: Menunggu Approval</Text>
                                    <Text style={styles.textDesc}>Approve By: M. Yasir</Text>
                                    <Text style={styles.textDesc}>Catatan Approval: -</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View >
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FAFAFA",
        marginTop: hp("1%"),
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },

    infoContainer: {
        marginHorizontal: 20
    },
    titleContent: {
        fontFamily: "Inter_600SemiBold",
        fontSize: 16,
        color: "#F48120",
        marginBottom: 10,
        textAlign: "center"
    },
    textContent: {
        fontFamily: "Inter_400Regular",
        fontSize: 13,
    },
    btnItem: {
        backgroundColor: "#F48120",
        borderColor: "#F48120",
        borderWidth: 1,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 4,
        marginTop: 20,
        marginHorizontal: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1,
        elevation: 2,
    },
    btnText: {
        color: "#fff",
        fontSize: 14,
        fontFamily: "Inter_400Regular",
    },

    historyContainer: {
        backgroundColor: "#EAEAEA",
        padding: 20,
    },
    titleHistory: {
        fontFamily: "Inter_600SemiBold",
        fontSize: 16,
        color: "#F48120",
        marginBottom: 10,
        textAlign: "center"
    },
    pipelineContainer: {
        borderRadius: 10,
        backgroundColor: "#fff",
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        marginBottom: 10,
    },
    pipelineContent: {
        flexDirection: "row",
        gap: 15,
        padding: 5
    },
    pipelineIcon: {
        backgroundColor: "#1D4592",
        borderRadius: 13,
        paddingHorizontal: 2,
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    dateText: {
        fontFamily: "Inter_400Regular",
        fontSize: 13,
        color: '#000',
        marginBottom: 3,
    },
    titleText: {
        fontFamily: "Inter_700Bold",
        fontSize: 15,
        color: '#000',
        marginBottom: 5,
    },
    textDesc: {
        fontFamily: "Inter_400Regular",
        fontSize: 13,
        color: '#000',
    },
});