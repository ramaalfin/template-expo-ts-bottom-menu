import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from "expo-router";

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import moment from "moment";

// context
import { useAuth } from "~/context/AuthContext";

// services

// // icons
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// components
import Topbar from "~/components/TopBar";
import { formatDate } from "~/utils/formatDate";
import { Input } from "~/components/ui/input";
import { fetchSpecialRateById } from "~/services/trx/special-rate";

interface DetailSpecialRateProps {
    no_rekening: string;
    nama: string;
    tgl_buka: string;
    mst_term: {
        term: string;
    };
    tgl_jatuh_tempo: string;
    nominal: string;
    nominal_dpk: string;
    rate_dimohon: string;
    rate_sebelum: string;
    mst_sts_special_rate: {
        sts_special_rate: string;
    }
}

export default function DetailSpecialRate() {
    const { id } = useLocalSearchParams();
    const { accessToken } = useAuth();

    const [specialRate, setSpecialRate] = useState<DetailSpecialRateProps | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchSpecialRateById({
                token: accessToken.token,
                id: Number(id),
            });

            if (response.data.data) {
                setSpecialRate(response.data.data);
            } else {
                console.log("Tidak ada data");
            }
        }

        fetchData();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: "#F48120" }}>
            {/* Header */}
            <Topbar titleBar="Detail Special Rate" />
            {/* header */}

            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>No Rekening</Text>
                            <View style={{ position: "relative" }}>
                                <MaterialIcons name="payment" size={18} color="#F48120" style={styles.iconInput} />
                                <Input
                                    value={specialRate?.no_rekening || "-"}
                                    style={[styles.input, styles.inputDisabled]}
                                    editable={false}
                                />
                            </View>
                        </View>

                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Nama Lengkap</Text>
                            <View style={{ position: "relative" }}>
                                <FontAwesome6 name="user-large" size={16} color="#F48120" style={styles.iconInput} />
                                <Input
                                    value={specialRate?.nama || "-"}
                                    style={[styles.input, styles.inputDisabled]}
                                    editable={false}
                                />
                            </View>
                        </View>

                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Tanggal Pembukaan/Perpanjangan</Text>
                            <View style={{ position: "relative" }}>
                                <FontAwesome6 name="calendar" size={20} color="#F48120" style={[styles.iconInput]} />
                                <Input
                                    value={formatDate(specialRate?.tgl_buka) || "-"}
                                    style={[styles.input, styles.inputDisabled]}
                                    editable={false}
                                />
                            </View>

                        </View>

                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Jangka Waktu</Text>
                            <View style={{ position: "relative" }}>
                                <MaterialCommunityIcons name="timelapse" size={20} color="#F48120" style={styles.iconInput} />
                                <Input
                                    value={specialRate?.mst_term.term || "-"}
                                    style={[styles.input, styles.inputDisabled]}
                                    editable={false}
                                />
                            </View>
                        </View>

                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Tanggal Jatuh Tempo</Text>
                            <View style={{ position: "relative" }}>
                                <FontAwesome6 name="calendar" size={20} color="#F48120" style={[styles.iconInput]} />
                                <Input
                                    value={formatDate(specialRate?.tgl_jatuh_tempo) || "-"}
                                    style={[styles.input, styles.inputDisabled]}
                                    editable={false}
                                />
                            </View>
                        </View>

                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Nominal</Text>
                            <View style={{ position: "relative" }}>
                                <FontAwesome
                                    name="dollar"
                                    size={12}
                                    color="#FFF"
                                    style={
                                        [styles.iconInput,
                                        {
                                            backgroundColor: "#F48120",
                                            borderRadius: 50,
                                            padding: 4,
                                            width: 20,
                                            textAlign: "center"
                                        }]
                                    }
                                />
                                <Text style={styles.rupiahText}>Rp</Text>
                                <Input
                                    value={specialRate?.nominal.replace(/\B(?=(\d{3})+(?!\d))/g, ".") || "-"}
                                    style={[styles.input, styles.inputDisabled, { paddingLeft: 55 }]}
                                    editable={false}
                                />
                            </View>
                        </View>

                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Total DPK Nasabah</Text>
                            <View style={{ position: "relative" }}>
                                <FontAwesome
                                    name="dollar"
                                    size={12}
                                    color="#FFF"
                                    style={
                                        [styles.iconInput,
                                        {
                                            backgroundColor: "#F48120",
                                            borderRadius: 50,
                                            padding: 4,
                                            width: 20,
                                            textAlign: "center"
                                        }]
                                    }
                                />
                                <Text style={styles.rupiahText}>Rp</Text>
                                <Input
                                    value={specialRate?.nominal_dpk.replace(/\B(?=(\d{3})+(?!\d))/g, ".") || "-"}
                                    style={[styles.input, styles.inputDisabled, { paddingLeft: 55 }]}
                                    editable={false}
                                />
                            </View>
                        </View>

                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Rate Sebelum (%)</Text>
                            <View style={{ position: "relative" }}>
                                <MaterialIcons name="percent" size={20} color="#F48120" style={styles.iconInput} />
                                <Input
                                    value={specialRate?.rate_sebelum.replace(".", ",") || "-"}
                                    style={[styles.input, styles.inputDisabled, { paddingLeft: 35 }]}
                                    editable={false}
                                />
                            </View>
                        </View>

                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Rate yang Dimohon (%)</Text>
                            <View style={{ position: "relative" }}>
                                <MaterialIcons name="percent" size={20} color="#F48120" style={styles.iconInput} />
                                <Input
                                    value={specialRate?.rate_dimohon.replace(".", ",") || "-"}
                                    style={[styles.input, styles.inputDisabled, { paddingLeft: 35 }]}
                                    editable={false}
                                />
                            </View>
                        </View>

                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Status</Text>
                            <View style={{ position: "relative" }}>
                                <MaterialCommunityIcons name="badge-account-outline" size={20} color="#F48120" style={styles.iconInput} />
                                <Input
                                    value={specialRate?.mst_sts_special_rate.sts_special_rate || "-"}
                                    style={[styles.input, styles.inputDisabled]}
                                    editable={false}
                                />
                            </View>
                        </View>

                    </View>
                </ScrollView>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAFAFA",
        marginTop: hp("1%"),
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    formContainer: {
        marginVertical: 20,
    },
    formItem: {
        marginBottom: 10,
    },
    formLabel: {
        fontSize: 13,
        fontFamily: "Inter_400Regular",
        color: "#000",
    },
    input: {
        paddingLeft: 35,
        marginTop: 5,
        borderColor: "#979797",
        fontSize: 13,
        fontFamily: "Inter_400Regular"
    },
    inputDisabled: {
        backgroundColor: "#FFF",
        color: "#000",
    },
    rupiahText: {
        position: "absolute",
        top: 16,
        left: 35,
        fontSize: 13,
        fontFamily: "Inter_400Regular"
    },
    errorField: {
        color: "red",
        fontSize: 13,
        fontFamily: "Inter_400Regular",
        marginTop: 5,
    },
    textArea: {
        paddingTop: 12,
        paddingLeft: 35,
        marginTop: 5,
        borderColor: "#979797",
        fontSize: 13,
        fontFamily: "Inter_400Regular",
        height: 100,
        textAlignVertical: "top",
        padding: 10,
    },
    iconInput: {
        position: "absolute",
        top: 16,
        left: 10
    },
    btnItem: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: wp("43%"),
        paddingVertical: 4,
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
        fontSize: 14,
        fontFamily: "Inter_400Regular",
    },
    dateInput: {
        backgroundColor: "white",
        borderColor: "#979797",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        justifyContent: "center",
        height: 42,
        marginTop: 5,
        paddingLeft: 35,
    },
    dateText: {
        fontFamily: "Inter_400Regular",
    },
    separatorText: {
        paddingVertical: 20,
        textAlign: "center",
        fontFamily: "Inter_600SemiBold",
        fontSize: 15,
        color: "#1D4592"
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        width: '60%',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});