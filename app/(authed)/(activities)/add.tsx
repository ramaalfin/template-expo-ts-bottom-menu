import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useForm, Controller } from 'react-hook-form';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import moment from "moment";
import 'moment-timezone';
import { useRouter } from "expo-router";

// context
import { useAuth } from "~/context/AuthContext";

// hooks
import { useLocation } from "~/hooks/useLocation";

// services
import { fetchFundingByIdUser } from "~/services/mst/fundings";
import { fetchKegiatan } from "~/services/mst/kegiatan";
import { fetchStatusPipeline } from "~/services/mst/sts-pipeline";
import { createActivity } from "~/services/trx/activity";

// icons
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// components
import Topbar from "~/components/TopBar";
import { formatDate } from "~/utils/formatDate";
import { Input } from "~/components/ui/input";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface AddActivityProps {
    id_funding: string;
    id_kegiatan: string;
    id_sts_pipeline: string;
    tanggal: string;
    jam_mulai: string;
    jam_selesai: string;
    deskripsi: string;
    longitude: string;
    latitude: string;
};

export default function AddActivity() {
    const { control, handleSubmit, formState: { errors }, getValues } = useForm<AddActivityProps>();
    const { isLoading, logout, user } = useAuth();
    const { longitude, latitude } = useLocation();
    const navigation = useRouter();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const [clients, setClients] = useState<any[]>([]);
    const [jenisProduk, setJenisProduk] = useState("");
    const [namaProduk, setNamaProduk] = useState("");
    const [kegiatan, setKegiatan] = useState<any[]>([]);
    const [statusPipeline, setStatusPipeline] = useState<any[]>([]);

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isJamMulaiPickerVisible, setJamMulaiPickerVisibility] = useState(false);
    const [isJamSelesaiPickerVisible, setJamSelesaiPickerVisibility] = useState(false);

    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchFundingByIdUser(user.id_user);

            if (response.data.code === 200) {
                setClients(response.data.data);
            } else {
                logout();
            }
        }

        fetchData();
    }, [user.id_user]);

    const handleClientChange = (value: any) => {
        const client = clients.find((item) => item.id_funding === value.value);

        if (client) {
            setJenisProduk(client.mst_product.product);
            setNamaProduk(client.mst_product.mst_application.application);
        } else {
            setJenisProduk("");
            setNamaProduk("");
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchKegiatan();

            if (response.data.code === 200) {
                setKegiatan(response.data.data.data);
            } else {
                logout();
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchStatusPipeline();

            if (response.data.code === 200) {
                setStatusPipeline(response.data.data.data);
            } else {
                logout();
            }
        }

        fetchData();
    }, []);

    const dataPilihClient = clients.map((item) => ({
        label: `${item.nama} - ${item.alamat}`,
        value: item.id_funding
    }));
    const dataKegiatan = kegiatan.map((item) => ({ label: item.kegiatan, value: item.id_kegiatan }));
    const dataStatusPipeline = statusPipeline.map((item) => ({ label: item.sts_pipeline, value: item.id_sts_pipeline }));

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirmDate = (date: string, onChange: any) => {
        onChange(date);
        hideDatePicker();
    };

    const showJamMulaiPicker = () => {
        setJamMulaiPickerVisibility(true);
    }

    const hideJamMulaiPicker = () => {
        setJamMulaiPickerVisibility(false);
    }

    const handleConfirmJamMulai = (time: Date, onChange: any) => {
        onChange(moment(time).format("HH:mm"));
        hideJamMulaiPicker();
    }

    const showJamSelesaiPicker = () => {
        setJamSelesaiPickerVisibility(true);
    }

    const hideJamSelesaiPicker = () => {
        setJamSelesaiPickerVisibility(false);
    }

    const handleConfirmJamSelesai = (time: Date, onChange: any) => {
        onChange(moment(time).format("HH:mm"));
        hideJamSelesaiPicker();
    }

    const submit = async (data: AddActivityProps) => {
        const formData = {
            id_funding: Number(data.id_funding),
            id_kegiatan: Number(data.id_kegiatan),
            id_sts_pipeline: Number(data.id_sts_pipeline),
            tanggal: data.tanggal,
            jam_mulai: moment(`${data.tanggal} ${data.jam_mulai}`, "YYYY-MM-DD HH:mm").add(7, "hours").toISOString(),
            jam_selesai: moment(`${data.tanggal} ${data.jam_selesai}`, "YYYY-MM-DD HH:mm").add(7, "hours").toISOString(),
            deskripsi: data.deskripsi,
            latitude: latitude ? latitude.toString() : "",
            longtitude: longitude ? longitude.toString() : "",
        }

        try {
            const response = await createActivity(formData);

            if (response.data.code === 200) {
                setModalMessage("Input Data Berhasil");
                setModalVisible(true);
                setIsSuccess(true);
            } else {
                setModalMessage("Input Data Gagal");
                setModalVisible(true);
                setIsSuccess(false);
            }
        } catch (error) {
            setModalMessage("Input Data Gagal");
            setModalVisible(true);
            setIsSuccess(false);
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#F48120" }}>
            {/* Header */}
            <Topbar titleBar="Tambah Aktivitas" />
            {/* header */}

            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Pilih Client</Text>
                            <Controller
                                control={control}
                                name="id_funding"
                                rules={{ required: "Pilih Client wajib diisi" }}
                                render={({ field: { onChange, value } }) => (
                                    <View style={{ position: "relative" }}>
                                        <FontAwesome6 name="user-large" size={16} color="#F48120" style={styles.iconInput} />

                                        <Dropdown
                                            style={[styles.dropdown, { borderColor: "#999" }]}
                                            placeholderStyle={styles.placeholderStyle}
                                            selectedTextStyle={styles.selectedTextStyle}
                                            iconStyle={styles.iconStyle}
                                            itemTextStyle={styles.itemTextStyle}
                                            maxHeight={300}
                                            labelField="label"
                                            valueField="value"
                                            placeholder="Pilih"
                                            data={dataPilihClient}
                                            value={value}
                                            onChange={(item) => {
                                                handleClientChange(item);
                                                onChange(item.value);
                                            }}
                                        />
                                    </View>
                                )}
                            />
                            {errors.id_funding && <Text style={styles.errorField}>{errors.id_funding.message}</Text>}
                        </View>

                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Jenis Produk</Text>
                            <View style={{ position: "relative" }}>
                                <FontAwesome name="file" size={18} color="#F48120" style={styles.iconInput} />
                                <Input
                                    value={jenisProduk}
                                    style={[styles.input, styles.inputDisabled]}
                                    editable={false}
                                />
                            </View>
                        </View>

                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Nama Produk</Text>
                            <View style={{ position: "relative" }}>
                                <MaterialIcons name="folder-special" size={20} color="#F48120" style={styles.iconInput} />
                                <Input
                                    value={namaProduk}
                                    style={[styles.input, styles.inputDisabled]}
                                    editable={false}
                                />
                            </View>
                        </View>

                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Kegiatan</Text>
                            <Controller
                                control={control}
                                name="id_kegiatan"
                                rules={{ required: "Kegiatan wajib diisi" }}
                                render={({ field: { onChange, value } }) => (
                                    <View style={{ position: "relative" }}>
                                        <MaterialCommunityIcons name="briefcase" size={20} color="#F48120" style={styles.iconInput} />
                                        <Dropdown
                                            style={[styles.dropdown, { borderColor: "#999" }]}
                                            placeholderStyle={styles.placeholderStyle}
                                            selectedTextStyle={styles.selectedTextStyle}
                                            iconStyle={styles.iconStyle}
                                            itemTextStyle={styles.itemTextStyle}
                                            maxHeight={300}
                                            labelField="label"
                                            valueField="value"
                                            placeholder="Pilih"
                                            data={dataKegiatan}
                                            value={value}
                                            onChange={(item) => {
                                                onChange(item.value);
                                            }}
                                        />
                                    </View>
                                )}
                            />
                            {errors.id_kegiatan && <Text style={styles.errorField}>{errors.id_kegiatan.message}</Text>}
                        </View>

                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Status Pipeline</Text>
                            <Controller
                                control={control}
                                name="id_sts_pipeline"
                                rules={{ required: "Kegiatan wajib diisi" }}
                                render={({ field: { onChange, value } }) => (
                                    <View style={{ position: "relative" }}>
                                        <MaterialIcons name="local-fire-department" size={20} color="#F48120" style={styles.iconInput} />
                                        <Dropdown
                                            style={[styles.dropdown, { borderColor: "#999" }]}
                                            placeholderStyle={styles.placeholderStyle}
                                            selectedTextStyle={styles.selectedTextStyle}
                                            iconStyle={styles.iconStyle}
                                            itemTextStyle={styles.itemTextStyle}
                                            maxHeight={300}
                                            labelField="label"
                                            valueField="value"
                                            placeholder="Pilih"
                                            data={dataStatusPipeline}
                                            value={value}
                                            onChange={(item) => onChange(item.value)}
                                        />
                                    </View>
                                )}
                            />
                            {errors.id_sts_pipeline && <Text style={styles.errorField}>{errors.id_sts_pipeline.message}</Text>}
                        </View>

                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Tanggal Aktivitas</Text>
                            <Controller
                                control={control}
                                name="tanggal"
                                rules={{ required: "Tanggal wajib diisi" }}
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <View style={{ position: "relative" }}>
                                            <Pressable onPress={showDatePicker} style={styles.dateInput}>
                                                <FontAwesome6 name="calendar" size={20} color="#F48120" style={[styles.iconInput, { marginTop: -7 }]} />
                                                <Text style={styles.dateText}>
                                                    {value ? formatDate(new Date(value)) : "Pilih"}
                                                </Text>
                                            </Pressable>
                                        </View>

                                        <DateTimePickerModal
                                            isVisible={isDatePickerVisible}
                                            mode="date"
                                            onConfirm={(date) => handleConfirmDate(moment(date).format("YYYY-MM-DD"), onChange)}
                                            onCancel={hideDatePicker}
                                            date={value ? moment(value).toDate() : new Date()}
                                            locale="id-ID"
                                        />
                                    </>
                                )}
                            />
                            {errors.tanggal && <Text style={styles.errorField}>{errors.tanggal.message}</Text>}
                        </View>

                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Jam Mulai</Text>

                            <Controller
                                control={control}
                                name="jam_mulai"
                                rules={{ required: "Jam Mulai wajib diisi" }}
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <View style={{ position: "relative" }}>
                                            <Pressable onPress={showJamMulaiPicker} style={styles.dateInput}>
                                                <FontAwesome6
                                                    name="clock"
                                                    size={19}
                                                    color="#F48120"
                                                    style={[styles.iconInput, { marginTop: -7 }]}
                                                />
                                                <Text style={styles.dateText}>
                                                    {value ? moment(value, "HH:mm").format("HH:mm") : ""}
                                                </Text>
                                            </Pressable>
                                        </View>

                                        <DateTimePickerModal
                                            mode="time"
                                            isVisible={isJamMulaiPickerVisible}
                                            onConfirm={(time) => handleConfirmJamMulai(time, onChange)}
                                            onCancel={hideJamMulaiPicker}
                                            onChange={onChange}
                                            date={value ? moment(value, "HH:mm").toDate() : new Date()}
                                            locale="id-ID"
                                        />
                                    </>
                                )}
                            />
                            {errors.jam_mulai && <Text style={styles.errorField}>{errors.jam_mulai.message}</Text>}
                        </View>

                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Jam Selesai</Text>

                            <Controller
                                control={control}
                                name="jam_selesai"
                                rules={{
                                    required: "Jam Selesai wajib diisi",
                                    validate: (value) => {
                                        const jamMulai = moment(getValues("jam_mulai"), "HH:mm");
                                        const jamSelesai = moment(value, "HH:mm");

                                        if (jamSelesai.add(1, "day").isBefore(jamMulai)) {
                                            return "Jam Selesai tidak boleh lebih kecil dari Jam Mulai";
                                        } else if (jamSelesai.isSame(jamMulai)) {
                                            return "Jam Selesai tidak boleh sama dengan Jam Mulai";
                                        } else {
                                            return true;
                                        }
                                    }
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <View style={{ position: "relative" }}>
                                            <Pressable onPress={showJamSelesaiPicker} style={styles.dateInput}>
                                                <MaterialCommunityIcons
                                                    name="clock-remove-outline"
                                                    size={20}
                                                    color="#F48120"
                                                    style={[styles.iconInput, { marginTop: -7 }]}
                                                />
                                                <Text style={styles.dateText}>
                                                    {value ? moment(value, "HH:mm").format("HH:mm") : ""}
                                                </Text>
                                            </Pressable>
                                        </View>

                                        <DateTimePickerModal
                                            mode="time"
                                            isVisible={isJamSelesaiPickerVisible}
                                            onConfirm={(time) => handleConfirmJamSelesai(time, onChange)}
                                            onCancel={hideJamSelesaiPicker}
                                            onChange={onChange}
                                            date={value ? moment(value, "HH:mm").toDate() : new Date()}
                                            locale="id-ID"
                                        />
                                    </>
                                )}
                            />
                            {errors.jam_selesai && <Text style={styles.errorField}>{errors.jam_selesai.message}</Text>}
                        </View>

                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Deskripsi</Text>
                            <Controller
                                control={control}
                                name="deskripsi"
                                rules={{ required: "Deskripsi wajib diisi" }}
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
                            {errors.deskripsi && <Text style={styles.errorField}>{errors.deskripsi.message}</Text>}
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 10 }}>
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
                                {isLoading ? (
                                    <ActivityIndicator size="small" color="#FFF" />
                                ) : (
                                    <Text style={[styles.btnText, { color: "#FFF" }]}>Simpan</Text>
                                )}
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
    shareItem: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        width: wp("43%"),
        paddingVertical: 2,
    },
    shareText: {
        fontSize: 14,
        fontFamily: "Inter_400Regular",
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
        fontFamily: "Inter_400Regular",
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
    inputDisabled: {
        backgroundColor: "#FFF",
        color: "#000",
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