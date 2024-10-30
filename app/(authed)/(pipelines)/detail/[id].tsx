import { useCallback, useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { Href, useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";

// context
import { useAuth } from "~/context/AuthContext";

// utils
import { formatDate } from "~/utils/formatDate";

// services
import { fetchFundingById } from "~/services/mst/fundings";

// components
import Topbar from "~/components/TopBar";

interface PipelineScreenProps {
    id_funding: number;
    mst_segment: {
        segment: string;
    };
    nama: string;
    nik: string;
    no_telp: string;
    email: string;
    alamat: string;
    mst_product: {
        mst_application: {
            application: string
        };
        product: string;
    };
    mst_prospect: {
        prospect: string;
    };
    sys_user_checker: {
        nama: string;
    };
    target: string;
    mst_assignment: {
        mst_goalsetting: {
            mst_segment: {
                segment: string;
            };
        };
    }
    keterangan: string;
    trx_activity: [
        {
            tanggal: string;
            jam_mulai: string;
            jam_selesai: string;
            deskripsi: string;
            mst_kegiatan: {
                kegiatan: string;
            };
            mst_hasil: {
                hasil: string | null;
            };
            mst_sts_approval: {
                sts_approval: string | null;
            };
            mst_funding: {
                sys_user_checker: {
                    nama: string;
                }
            };
            keterangan_approval: string;
        }
    ]
}

export default function DetailPipeline() {
    const { id } = useLocalSearchParams();
    const navigation = useRouter();
    const { accessToken } = useAuth();

    const [pipeline, setPipeline] = useState<PipelineScreenProps>();

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                const response = await fetchFundingById({
                    token: accessToken.token,
                    id_funding: Number(id)
                });

                if (response.data.code === 200) {
                    setPipeline(response.data.data);
                } else {
                    console.log("Gagal mengambil data");
                }
            }

            fetchData();
        }, [accessToken])
    );

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
                                <Text style={styles.textContent}>{pipeline?.mst_assignment?.mst_goalsetting?.mst_segment?.segment || "-"}</Text>
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={styles.textContent}>NIK</Text>
                                <Text style={styles.textContent}>{pipeline?.nik || "-"}</Text>
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={styles.textContent}>Nama</Text>
                                <Text style={styles.textContent}>{pipeline?.nama || "-"}</Text>
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={styles.textContent}>No Telepon</Text>
                                <Text style={styles.textContent}>{pipeline?.no_telp || "-"}</Text>
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={styles.textContent}>Email</Text>
                                <Text style={styles.textContent}>{pipeline?.email || "-"}</Text>
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={styles.textContent}>Alamat Lengkap</Text>
                                <Text style={styles.textContent}>{pipeline?.alamat || "-"}</Text>
                            </View>

                            <View style={{ borderBottomWidth: .5, borderBottomColor: "#999", marginVertical: 10 }}></View>

                            <Text style={styles.titleContent}>Data Pipeline</Text>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={styles.textContent}>Aplikasi</Text>
                                <Text style={styles.textContent}>{pipeline?.mst_product.mst_application.application || "-"}</Text>
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={styles.textContent}>Produk</Text>
                                <Text style={styles.textContent}>{pipeline?.mst_product.product || "-"}</Text>
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={styles.textContent}>Level Pipeline</Text>
                                <Text style={styles.textContent}>{pipeline?.mst_prospect?.prospect || "-"}</Text>
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={styles.textContent}>Approval</Text>
                                <Text style={styles.textContent}>{pipeline?.sys_user_checker.nama || "-"}</Text>
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={styles.textContent}>Target</Text>
                                <Text style={styles.textContent}>
                                    Rp. {pipeline?.target.replace(/\B(?=(\d{3})+(?!\d))/g, ".") || "-"}
                                </Text>
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={styles.textContent}>Keterangan</Text>
                                <Text style={styles.textContent}>{pipeline?.keterangan || "-"}</Text>
                            </View>

                            <TouchableOpacity
                                style={styles.btnItem}
                                onPress={() => navigation.push(`/update/${pipeline?.id_funding}` as Href<"/update/[id]">)}
                            >
                                <Text style={styles.btnText}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.historyContainer}>
                        <Text style={styles.titleHistory}>History Prospect</Text>

                        {pipeline?.trx_activity?.length !== null ? (pipeline?.trx_activity.map((item, index) => (
                            <View style={styles.pipelineContainer} key={index}>
                                <View style={styles.pipelineContent}>
                                    <Image
                                        source={require("~/assets/icon/ic_koin_sq.png")}
                                        style={{ width: 45, height: 45 }}
                                    />
                                    <View style={{ width: "90%" }}>
                                        <Text style={styles.dateText}>
                                            {formatDate(item.tanggal)} {" "}
                                            {item.jam_mulai.split("T")[1].split(":")[0] + ":" + item.jam_mulai.split("T")[1].split(":")[1]} -{" "}
                                            {item.jam_selesai.split("T")[1].split(":")[0] + ":" + item.jam_selesai.split("T")[1].split(":")[1]} WIB
                                        </Text>
                                        <Text style={styles.titleText}>{item.deskripsi}</Text>
                                        <Text style={styles.textDesc}>Agenda: {item?.mst_kegiatan?.kegiatan || "-"}</Text>
                                        <Text style={styles.textDesc}>Hasil: {item?.mst_hasil?.hasil || "-"}</Text>
                                        <Text style={styles.textDesc}>Approval: {item?.mst_sts_approval?.sts_approval || "-"}</Text>
                                        <Text style={styles.textDesc}>Approve By: {item?.mst_funding?.sys_user_checker?.nama || "-"}</Text>
                                        <Text style={styles.textDesc}>Catatan Approval: {item.keterangan_approval || "-"}</Text>
                                    </View>
                                </View>
                            </View>
                        ))) : (
                            <Text style={{ textAlign: "center", marginTop: 20 }}>Data tidak ditemukan</Text>
                        )}

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