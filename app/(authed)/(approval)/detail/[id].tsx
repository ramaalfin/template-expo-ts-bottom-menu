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
import { activityApprove, activityReject, fetchActivityById } from "~/services/trx/activity";

// // icons
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// components
import Topbar from "~/components/TopBar";
import { formatDate } from "~/utils/formatDate";
import { Input } from "~/components/ui/input";

interface ApprovalProps {
    id_activity: number;
    mst_funding: {
        nama: string;
        no_telp: string;
        mst_product: {
            product: string;
            mst_application: {
                application: string;
            };
        };
    };
    mst_kegiatan: {
        kegiatan: string;
    };
    mst_sts_pipeline: {
        sts_pipeline: string;
    };
    alamat: string;
    kegiatan: string;
    tanggal: string;
    jam_mulai: string;
    jam_selesai: string;
    deskripsi: string;

    mst_hasil: {
        hasil: string;
    };
    mst_tindakan: {
        tindakan: string;
    };
    realisasi: string;
    keterangan_hasil: string;
    no_rekening: string;
}

interface UpdateApprovalProps {
    keterangan_approval: string;
};

export default function UpdateApproval() {
    const { id } = useLocalSearchParams();
    const { control, handleSubmit, formState: { errors } } = useForm<UpdateApprovalProps>();
    const { tokens, logout } = useAuth();

    const navigation = useRouter();
    const [activity, setActivity] = useState<ApprovalProps | null>(null);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchActivityById(Number(id));

            if (response.data.data) {
                setActivity(response.data.data);
            } else {
                logout();
            }
        }

        fetchData();
    }, [id]);

    const submitReject = async (data: UpdateApprovalProps) => {
        const formData = {
            keterangan_approval: data.keterangan_approval,
        }

        try {
            const response = await activityReject({
                id: Number(id),
                data: formData,
            });

            if (response.data.code) {
                setModalMessage("Reject Approval Berhasil");
                setModalVisible(true);
                setIsSuccess(true);
            } else {
                setModalMessage("Reject Approval Gagal");
                setModalVisible(true);
                setIsSuccess(false);
            }
        } catch (error) {
            setModalMessage("Update Data Gagal");
            setModalVisible(true);
            setIsSuccess(false);
        }
    }

    const submitApprove = async (data: UpdateApprovalProps) => {
        const formData = {
            keterangan_approval: data.keterangan_approval,
        }

        try {
            const response = await activityApprove({
                id: Number(id),
                data: formData,
            });

            if (response.data.code) {
                setModalMessage("Approve Approval Berhasil");
                setModalVisible(true);
                setIsSuccess(true);
            } else {
                setModalMessage("Approve Approval Gagal");
                setModalVisible(true);
                setIsSuccess(false);
            }
        } catch (error) {
            setModalMessage("Approve Approval Gagal");
            setModalVisible(true);
            setIsSuccess(false);
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#F48120" }}>
            {/* Header */}
            <Topbar titleBar="Detail Approval" />
            {/* header */}

            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.formContainer}>
                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Client</Text>
                            <View style={{ position: "relative" }}>
                                <FontAwesome6
                                    name="user-large"
                                    size={16}
                                    color="#F48120"
                                    style={styles.iconInput}
                                />
                                <Input
                                    style={[styles.input, styles.inputDisabled]}
                                    value={activity?.mst_funding.nama || "-"}
                                    editable={false}
                                />
                            </View>
                        </View>

                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Kegiatan</Text>
                            <View style={{ position: "relative" }}>
                                <MaterialCommunityIcons
                                    name="briefcase"
                                    size={20}
                                    color="#F48120"
                                    style={styles.iconInput}
                                />
                                <Input
                                    style={[styles.input, styles.inputDisabled]}
                                    value={activity?.mst_kegiatan?.kegiatan || "-"}
                                    editable={false}
                                />
                            </View>
                        </View>

                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Status Prospect</Text>
                            <View style={{ position: "relative" }}>
                                <MaterialIcons
                                    name="local-fire-department"
                                    size={20}
                                    color="#F48120"
                                    style={styles.iconInput}
                                />
                                <Input
                                    style={[styles.input, styles.inputDisabled]}
                                    value={activity?.mst_sts_pipeline?.sts_pipeline || "-"}
                                    editable={false}
                                />
                            </View>
                        </View>

                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Tanggal</Text>
                            <View style={{ position: "relative" }}>
                                <FontAwesome6 name="calendar" size={20} color="#F48120" style={styles.iconInput} />
                                <Input
                                    style={[styles.input, styles.inputDisabled]}
                                    value={formatDate(activity?.tanggal) || "-"}
                                    editable={false}
                                />
                            </View>
                        </View>

                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Jam Mulai</Text>
                            <View style={{ position: "relative" }}>
                                <FontAwesome6 name="clock" size={19} color="#F48120" style={styles.iconInput} />
                                <Input
                                    style={[styles.input, styles.inputDisabled]}
                                    value={moment(activity?.jam_mulai, "HH:mm").format("HH:mm") || "-"}
                                    editable={false}
                                />
                            </View>
                        </View>

                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Jam Selesai</Text>
                            <View style={{ position: "relative" }}>
                                <MaterialCommunityIcons
                                    name="clock-remove-outline"
                                    size={20}
                                    color="#F48120"
                                    style={styles.iconInput}
                                />
                                <Input
                                    style={[styles.input, styles.inputDisabled]}
                                    value={moment(activity?.jam_selesai, "HH:mm").format("HH:mm") || "-"}
                                    editable={false}
                                />
                            </View>
                        </View>

                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Deskripsi</Text>
                            <View style={{ position: "relative" }}>
                                <MaterialIcons name="menu" size={20} color="#F48120" style={styles.iconInput} />
                                <Input
                                    value={activity?.deskripsi || "-"}
                                    style={[styles.textArea, styles.inputDisabled]}
                                    multiline={true}
                                    numberOfLines={10}
                                    editable={false}
                                />
                            </View>
                        </View>

                        <Text style={styles.separatorText}>Hasil Yang Diperoleh</Text>

                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Status Hasil</Text>
                            <View style={{ position: "relative" }}>
                                <MaterialIcons name="local-fire-department" size={20} color="#F48120" style={styles.iconInput} />
                                <Input
                                    value={activity?.mst_hasil?.hasil || "-"}
                                    style={[styles.input, styles.inputDisabled]}
                                    multiline={true}
                                    numberOfLines={10}
                                    editable={false}
                                />
                            </View>
                        </View>

                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Tindakan Hasil</Text>
                            <View style={{ position: "relative" }}>
                                <MaterialIcons name="local-fire-department" size={20} color="#F48120" style={styles.iconInput} />
                                <Input
                                    value={activity?.mst_tindakan?.tindakan || "-"}
                                    style={[styles.input, styles.inputDisabled]}
                                    multiline={true}
                                    numberOfLines={10}
                                    editable={false}
                                />
                            </View>
                        </View>

                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Update Nominal</Text>
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
                                    value={activity?.realisasi?.replace(/\B(?=(\d{3})+(?!\d))/g, ".") || "0"}
                                    style={[styles.input, styles.inputDisabled, { paddingLeft: 55 }]}
                                    inputMode="numeric"
                                    editable={false}
                                />
                            </View>
                        </View>

                        {activity?.no_rekening ? (
                            <View style={styles.formItem}>
                                <Text style={styles.formLabel}>No Rekening</Text>

                                <View style={{ position: "relative" }}>
                                    <MaterialIcons name="payment" size={18} color="#F48120" style={styles.iconInput} />
                                    <Input
                                        value={activity?.no_rekening || "-"}
                                        style={[styles.input, styles.inputDisabled]}
                                        inputMode="numeric"
                                        editable={false}
                                    />
                                </View>
                            </View>
                        ) : (
                            <View style={styles.formItem}>
                                <Text style={styles.formLabel}>Deskripsi Hasil</Text>
                                <View style={{ position: "relative" }}>
                                    <MaterialIcons name="menu" size={20} color="#F48120" style={styles.iconInput} />
                                    <Input
                                        value={activity?.keterangan_hasil || "-"}
                                        style={[styles.textArea, styles.inputDisabled]}
                                        multiline={true}
                                        numberOfLines={10}
                                        editable={false}
                                    />
                                </View>
                            </View>
                        )}

                        <Text style={styles.separatorText}>Hasil Approval</Text>

                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Catatan Approval</Text>
                            <Controller
                                control={control}
                                name="keterangan_approval"
                                rules={{ required: "Catatan Approval wajib diisi" }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <View style={{ position: "relative" }}>
                                        <MaterialIcons name="menu" size={20} color="#F48120" style={styles.iconInput} />
                                        <Input
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            style={styles.textArea}
                                            multiline={true}
                                            numberOfLines={10}
                                        />
                                    </View>
                                )}
                            />
                            {errors.keterangan_approval && <Text style={styles.errorField}>{errors.keterangan_approval.message}</Text>}
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20, marginBottom: 5 }}>
                            <TouchableOpacity
                                style={[styles.btnItem, { borderColor: "#FFF" }]}
                                onPress={handleSubmit(submitReject)}
                            >
                                <Text style={[styles.btnText, { color: "#F48120" }]}>Reject</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.btnItem, { backgroundColor: "#F48120", borderColor: "#F48120" }]}
                                onPress={handleSubmit(submitApprove)}
                            >
                                <Text style={[styles.btnText, { color: "#FFF" }]}>Approve</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View >

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Image
                            source={isSuccess ? require("~/assets/icon/ic_success.png") : require("~/assets/icon/ic_failed.png")}
                            style={{ width: 90, height: 90, marginBottom: 20 }}
                        />
                        <Text style={{ fontFamily: "Inter_500Medium", fontSize: 15, textAlign: "center" }}>
                            {modalMessage}
                        </Text>
                        <View style={{ marginVertical: 15, borderWidth: .5, borderColor: "#F48120", width: "100%" }}></View>
                        <Pressable
                            style={{
                                paddingHorizontal: 10,
                                borderRadius: 5,
                            }}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                                navigation.back()
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: "Inter_600SemiBold",
                                    fontSize: 14,
                                    textAlign: "center",
                                    color: "#F48120",
                                    justifyContent: "center",
                                }}
                            >
                                Tutup
                            </Text>

                        </Pressable>
                    </View>
                </View>
            </Modal>
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