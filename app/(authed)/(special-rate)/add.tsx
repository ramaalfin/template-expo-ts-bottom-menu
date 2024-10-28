import { useContext, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useForm, Controller } from 'react-hook-form';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { useRouter } from "expo-router";

// context
import { useAuth } from "~/context/AuthContext";

// icons
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// components
import Topbar from "~/components/TopBar";
import { Input } from "~/components/ui/input";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePickerModal from "react-native-modal-datetime-picker";

// services
import { createSpecialRate } from "~/services/trx/special-rate";
import { fetchTerms } from "~/services/mst/terms";

// utils
import moment from "moment";
import { formatDate } from "~/utils/formatDate";
import { useScrollToTop } from "@react-navigation/native";
import { fetchStatusRekening } from "~/services/mst/sts-rekening";

interface InputSpecialRateProps {
    no_rekening: string;
    nama_lengkap: string;
    id_term: string;
    tgl_buka: string;
    tgl_jatuh_tempo: string;
    nominal: string;
    nominal_dpk: string;
    rate_sebelum: string;
    rate_dimohon: string;
    id_sts_rekening: string;
};

export default function InputSpecialRate() {
    const { control, handleSubmit, formState: { errors }, getValues, setValue } = useForm<InputSpecialRateProps>();
    const navigation = useRouter();
    const { accessToken, isLoading } = useAuth();

    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [isOpeningDatePickerVisible, setOpeningDatePickerVisibility] = useState(false);

    const [jangkawaktu, setJangkaWaktu] = useState<any[]>([]);
    const [statusRekening, setstatusRekening] = useState<any[]>([]);
    const [tglJatuhTempo, setTglJatuhTempo] = useState("");

    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchTerms(accessToken.token);

            if (response.data.code === 200) {
                setJangkaWaktu(response.data.data.data);
            } else {
                console.log("Gagal mengambil data jangka waktu");
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchStatusRekening(accessToken.token);

            if (response.data.code === 200) {
                setstatusRekening(response.data.data.data);
            } else {
                console.log("Gagal mengambil data status rekening");
            }
        }
        fetchData();
    }, []);

    const dataJangkaWaktu = jangkawaktu.map((item) => ({ label: item.term, value: item.id_term }));
    const dataStatusRekening = statusRekening.map((item) => ({ label: item.sts_rekening, value: item.id_sts_rekening }));

    const showOpeningDatePicker = () => {
        setOpeningDatePickerVisibility(true);
    };

    const hideOpeningDatePicker = () => {
        setOpeningDatePickerVisibility(false);
    };

    const handleConfirmOpeningDate = (date: any, onChange: any) => {
        onChange(date);
        hideOpeningDatePicker();
    };

    const handleJangkaWaktu = (item: any) => {
        const openingDate = getValues("tgl_buka");
        const closingDate = moment(openingDate).add(item.value, "months").format("YYYY-MM-DD");
        setValue("tgl_jatuh_tempo", closingDate);
        setTglJatuhTempo(closingDate);
    }

    const ref = useRef<ScrollView>(null);
    useScrollToTop(
        useRef({
            scrollToTop: () => ref.current?.scrollTo({ y: 100 }),
        })
    );

    const submit = async (data: InputSpecialRateProps) => {
        const formData = {
            no_rekening: data.no_rekening,
            nama: data.nama_lengkap,
            id_term: Number(data.id_term),
            tgl_buka: data.tgl_buka,
            tgl_jatuh_tempo: tglJatuhTempo,
            nominal: Number(data.nominal.replace(/\D/g, "")),
            nominal_dpk: Number(data.nominal_dpk.replace(/\D/g, "")),
            rate_sebelum: Number(data.rate_sebelum.replace(",", ".")),
            rate_dimohon: Number(data.rate_dimohon.replace(",", ".")),
            id_sts_rekening: Number(data.id_sts_rekening),
        };

        try {
            const response = await createSpecialRate({ token: accessToken.token, data: formData });

            if (response.data.code === 200) {
                setModalVisible(true);
                setModalMessage("Input Data Berhasil");
                setIsSuccess(true);
            } else {
                setModalVisible(true);
                setModalMessage("Input Data Gagal");
                setIsSuccess(false);
            }
        } catch (error) {
            setModalVisible(true);
            setModalMessage("Input Data Gagal");
            setIsSuccess(false);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#F48120" }}>
            {/* Header */}
            <Topbar titleBar="Input Special Rate" />
            {/* header */}

            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} ref={ref}>
                    <View>
                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>No Rekening</Text>
                            <Controller
                                control={control}
                                name="no_rekening"
                                rules={{
                                    required: "No Rekening wajib diisi",
                                    validate: (value) => {
                                        if (value.length <= 14) {
                                            return "No Rekening harus 14 karakter";
                                        }
                                    }
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <View style={{ position: "relative" }}>
                                        <MaterialIcons name="payment" size={18} color="#F48120" style={styles.iconInput} />
                                        <Input
                                            onBlur={onBlur}
                                            onChangeText={(val) => onChange(val.replace(/\D/g, "").trim().slice(0, 15))}
                                            value={value?.toString()}
                                            style={styles.input}
                                            inputMode="numeric"
                                        />
                                        <Text style={styles.textWarning}><Text style={{ color: "red" }}>*</Text> No Rekening harus 14 karakter</Text>
                                    </View>
                                )}
                            />
                            {errors.no_rekening && <Text style={styles.errorField}>{errors.no_rekening.message}</Text>}
                        </View>

                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Nama Lengkap</Text>
                            <Controller
                                control={control}
                                name="nama_lengkap"
                                rules={{ required: "Nama Lengkap wajib diisi" }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <View style={{ position: "relative" }}>
                                        <FontAwesome6 name="user-large" size={16} color="#F48120" style={styles.iconInput} />
                                        <Input
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            style={styles.input}
                                        />
                                    </View>
                                )}
                            />
                            {errors.nama_lengkap && <Text style={styles.errorField}>{errors.nama_lengkap.message}</Text>}
                        </View>

                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Tanggal Pembukaan/Perpanjangan</Text>
                            <Controller
                                control={control}
                                name="tgl_buka"
                                rules={{ required: "Tanggal Pembukaan/Perpanjangan wajib diisi" }}
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <View style={{ position: "relative" }}>
                                            <Pressable onPress={showOpeningDatePicker} style={styles.dateInput}>
                                                <FontAwesome6 name="calendar" size={20} color="#F48120" style={[styles.iconInput, { marginTop: -7 }]} />
                                                <Text style={styles.dateText}>
                                                    {value ? formatDate(new Date(value)) : "Pilih"}
                                                </Text>
                                            </Pressable>
                                        </View>

                                        <DateTimePickerModal
                                            isVisible={isOpeningDatePickerVisible}
                                            mode="date"
                                            onConfirm={(date) => handleConfirmOpeningDate(moment(date).format("YYYY-MM-DD"), onChange)}
                                            onCancel={hideOpeningDatePicker}
                                            date={value ? moment(value).toDate() : new Date()}
                                            locale="id-ID"
                                        />
                                    </>
                                )}
                            />
                            {errors.tgl_buka && <Text style={styles.errorField}>{errors.tgl_buka.message}</Text>}
                        </View>

                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Jangka Waktu</Text>
                            <Controller
                                control={control}
                                name="id_term"
                                rules={{ required: "Jangka Waktu wajib diisi" }}
                                render={({ field: { onChange, value } }) => (
                                    <View style={{ position: "relative" }}>
                                        <MaterialCommunityIcons name="timelapse" size={20} color="#F48120" style={styles.iconInput} />
                                        <Dropdown
                                            style={[styles.dropdown, { borderColor: '#999' }]}
                                            placeholderStyle={styles.placeholderStyle}
                                            selectedTextStyle={styles.selectedTextStyle}
                                            iconStyle={styles.iconStyle}
                                            itemTextStyle={styles.itemTextStyle}
                                            maxHeight={300}
                                            labelField="label"
                                            valueField="value"
                                            placeholder="Pilih"
                                            data={dataJangkaWaktu}
                                            onChange={(item) => {
                                                onChange(item.value)
                                                handleJangkaWaktu(item)
                                            }}
                                            value={value}
                                        />
                                    </View>
                                )}
                            />
                            {errors.id_term && <Text style={styles.errorField}>{errors.id_term.message}</Text>}
                        </View>

                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Tanggal Jatuh Tempo</Text>
                            <Controller
                                disabled
                                control={control}
                                name="tgl_jatuh_tempo"
                                rules={{ required: "Tanggal Jatuh Tempo wajib diisi" }}
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <View style={{ position: "relative" }}>
                                            <View style={styles.dateInput}>
                                                <FontAwesome6 name="calendar" size={20} color="#F48120" style={[styles.iconInput, { marginTop: -7 }]} />
                                                <Text style={styles.dateText}>
                                                    {value ? formatDate(new Date(value)) : "-"}
                                                </Text>
                                            </View>
                                        </View>

                                        <DateTimePickerModal
                                            mode="date"
                                            date={value ? moment(value).toDate() : new Date()}
                                            locale="id-ID"
                                            isVisible={false}
                                            onConfirm={() => onChange(value)}
                                            onCancel={() => { }}
                                        />
                                    </>
                                )}
                            />
                            {errors.tgl_jatuh_tempo && <Text style={styles.errorField}>{errors.tgl_jatuh_tempo.message}</Text>}
                        </View>

                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Nominal</Text>
                            <Controller
                                control={control}
                                name="nominal"
                                rules={{ required: "Nominal wajib diisi" }}
                                render={({ field: { onChange, onBlur, value } }) => (
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
                                            onBlur={onBlur}
                                            onChangeText={(value) => onChange(value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, "."))}
                                            value={value}
                                            style={[styles.input, { paddingLeft: 55 }]}
                                            inputMode="numeric"
                                        />
                                    </View>
                                )}
                            />
                            {errors.nominal && <Text style={styles.errorField}>{errors.nominal.message}</Text>}
                        </View>

                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Total DPK Nasabah</Text>
                            <Controller
                                control={control}
                                name="nominal_dpk"
                                rules={{ required: "Total DPK Nasabah wajib diisi" }}
                                render={({ field: { onChange, onBlur, value } }) => (
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
                                            onBlur={onBlur}
                                            onChangeText={(value) => onChange(value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, "."))}
                                            value={value}
                                            style={[styles.input, { paddingLeft: 55 }]}
                                            inputMode="numeric"
                                        />
                                    </View>
                                )}
                            />
                            {errors.nominal_dpk && <Text style={styles.errorField}>{errors.nominal_dpk.message}</Text>}
                        </View>

                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Rate Sebelum (%)</Text>
                            <Controller
                                control={control}
                                name="rate_sebelum"
                                rules={{ required: "Rate Sebelum wajib diisi" }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <View style={{ position: "relative" }}>
                                        <MaterialIcons name="percent" size={20} color="#F48120" style={styles.iconInput} />
                                        <Input
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            style={[styles.input, { paddingLeft: 35 }]}
                                            inputMode="numeric"
                                        />
                                        <Text style={styles.textWarning}><Text style={{ color: "red" }}>*</Text> Gunakan koma(,) untuk angka desimal</Text>
                                    </View>
                                )}
                            />
                            {errors.rate_sebelum && <Text style={styles.errorField}>{errors.rate_sebelum.message}</Text>}
                        </View>

                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Rate yang Dimohon (%)</Text>
                            <Controller
                                control={control}
                                name="rate_dimohon"
                                rules={{ required: "Rate yang Dimohon wajib diisi" }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <View style={{ position: "relative" }}>
                                        <MaterialIcons name="percent" size={20} color="#F48120" style={styles.iconInput} />
                                        <Input
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            style={[styles.input, { paddingLeft: 35 }]}
                                            inputMode="numeric"
                                        />
                                        <Text style={styles.textWarning}><Text style={{ color: "red" }}>*</Text> Gunakan koma(,) untuk angka desimal</Text>
                                    </View>
                                )}
                            />
                            {errors.rate_dimohon && <Text style={styles.errorField}>{errors.rate_dimohon.message}</Text>}
                        </View>

                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Status</Text>
                            <Controller
                                control={control}
                                name="id_sts_rekening"
                                rules={{ required: "Status wajib diisi" }}
                                render={({ field: { onChange, value } }) => (
                                    <View style={{ position: "relative" }}>
                                        <MaterialCommunityIcons name="badge-account-outline" size={20} color="#F48120" style={styles.iconInput} />
                                        <Dropdown
                                            style={[styles.dropdown, { borderColor: '#999' }]}
                                            placeholderStyle={styles.placeholderStyle}
                                            selectedTextStyle={styles.selectedTextStyle}
                                            iconStyle={styles.iconStyle}
                                            itemTextStyle={styles.itemTextStyle}
                                            maxHeight={300}
                                            labelField="label"
                                            valueField="value"
                                            placeholder="Pilih"
                                            data={dataStatusRekening}
                                            onChange={(item) => onChange(item.value)}
                                            value={value}
                                        />
                                    </View>
                                )}
                            />
                            {errors.id_sts_rekening && <Text style={styles.errorField}>{errors.id_sts_rekening.message}</Text>}
                        </View>

                        <View style={styles.btnContainer}>
                            <TouchableOpacity
                                onPress={() => { navigation.back() }}
                                style={[styles.btnItem, { borderColor: "#FFF" }]}
                            >
                                <Text style={[styles.btnText, { color: "#F48120" }]}>Batal</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.btnItem, { backgroundColor: "#F48120", borderColor: "#F48120" }]}
                                onPress={handleSubmit(submit)}
                            >
                                {isLoading ?
                                    <ActivityIndicator size="small" color="#FFF" />
                                    :
                                    <Text style={[styles.btnText, { color: "#FFF" }]}>Kirim</Text>
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>

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
                            onPress={() => { setModalVisible(!modalVisible); navigation.back() }}
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
    errorField: {
        color: "red",
        fontSize: 13,
        fontFamily: "Inter_400Regular",
        marginTop: 5,
    },
    dropdown: {
        borderColor: "#979797",
        borderWidth: 1,
        height: 42,
        paddingHorizontal: 8,
        borderRadius: 5,
        marginTop: 5,
        paddingLeft: 35,
    },
    textWarning: {
        fontSize: 11,
        fontFamily: "Inter_400Regular",
        marginTop: 5,
    },
    placeholderStyle: {
        fontSize: 13,
        fontFamily: "Inter_400Regular",
    },
    selectedTextStyle: {
        fontSize: 13,
        fontFamily: "Inter_400Regular",
    },
    itemTextStyle: {
        fontSize: 13,
        fontFamily: "Inter_400Regular",
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    iconInput: {
        position: "absolute",
        top: 16,
        left: 10
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
    btnContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 5
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
    rupiahText: {
        position: "absolute",
        top: 16,
        left: 35,
        fontSize: 13,
        fontFamily: "Inter_400Regular"
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