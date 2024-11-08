import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Image, Linking, Modal, Platform, Pressable, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from "expo-router";

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import moment from "moment";

// context
import { useAuth } from "~/context/AuthContext";

// hooks
import { useLocation } from "~/hooks/useLocation";

// services
import { fetchActivityById, updateResultActivityById, updateResultActivityNextAppointmentById } from "~/services/trx/activity";
import { fetchHasil } from "~/services/mst/hasil";
import { fetchTindakan } from "~/services/mst/tindakan";
import { fetchApplications } from "~/services/mst/applications";
import { fetchProductByIdApplication } from "~/services/mst/products";

// // icons
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// components
import Topbar from "~/components/TopBar";
import { Dropdown } from "react-native-element-dropdown";
import { formatDate } from "~/utils/formatDate";
import { Input } from "~/components/ui/input";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { fetchKegiatan } from "~/services/mst/kegiatan";

interface ActivityProps {
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

interface UpdateActivityProps {
    id_product: string;
    id_hasil: string;
    id_tindakan: string;
    realisasi: string;
    keterangan_hasil: string;
    no_rekening: string;
    nama_produk: string;

    // next appointment
    kegiatan_next_appointment: string;
    tanggal_aktivitas_next_appointment: string;
    jam_mulai_next_appointment: string;
    jam_selesai_next_appointment: string;
    jenis_produk_next_appointment: string;
    nama_produk_next_appointment: string;
    deskripsi_next_appointment: string;
    longitude: string;
    latitude: string;
};

export default function UpdateActivity() {
    const { id } = useLocalSearchParams();
    const { control, handleSubmit, formState: { errors }, getValues } = useForm<UpdateActivityProps>();
    const { logout } = useAuth();
    const navigation = useRouter();
    const { longitude, latitude } = useLocation();

    const [activity, setActivity] = useState<ActivityProps | null>(null);
    const [statusHasil, setStatusHasil] = useState<any[]>([]);
    const [tindakanHasil, setTindakanHasil] = useState<any[]>([]);
    const [applications, setApplications] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [kegiatan, setKegiatan] = useState<any[]>([]);

    const [isActivityDatePickerVisible, setActivityDatePickerVisibility] = useState(false);
    const [isJamMulaiNextAppointmentPickerVisible, setJamMulaiNextAppointmentPickerVisibility] = useState(false);
    const [isJamSelesaiNextAppointmentPickerVisible, setJamSelesaiNextAppointmentPickerVisibility] = useState(false);

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

    // req: status hasil
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchHasil();

            if (response.data.data) {
                setStatusHasil(response.data.data.data);
            } else {
                logout();
            }
        }

        fetchData();
    }, []);

    // req: tindakan hasil
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchTindakan();

            if (response.data.data) {
                setTindakanHasil(response.data.data.data);
            } else {
                logout();
            }
        }

        fetchData();
    }, []);

    // req: jenis produk
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchApplications();

            if (response.data.code === 200) {
                setApplications(response.data.data.data);
            } else {
                logout();
            }
        }
        fetchData();
    }, []);

    // req: nama produk
    const handleProductChange = async (item: any) => {
        const id_application = applications.find((app) => app.application === item.label)?.id_application;
        const response = await fetchProductByIdApplication(id_application);

        if (response.data.code === 200) {
            setProducts(response.data.data);
        } else {
            logout();
        }
    };

    // req: kegiatan
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

    const dataStatusHasil = statusHasil?.map((item) => ({
        label: item.hasil,
        value: item.id_hasil,
        isClose: item.is_close,
    }));

    const dataTindakanHasil = tindakanHasil?.map((item) => ({
        label: item.tindakan,
        value: item.id_tindakan
    }));

    const dataJenisProduk = applications.map((item) => ({ label: item.application, value: item.id_application }));
    const dataNamaProduk = products.map((item) => ({ label: item.product, value: item.id_product }));
    const dataKegiatan = kegiatan.map((item) => ({ label: item.kegiatan, value: item.id_kegiatan }));

    const [isEnabled, setIsEnabled] = useState(false);
    const [isClose, setIsClose] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const makePhoneCall = () => {
        if (Platform.OS === "android") {
            Linking.openURL(`tel:${activity?.mst_funding.no_telp}`);
        } else {
            Linking.openURL(`telprompt:${activity?.mst_funding.no_telp}`);
        }
    };

    const makeWaCall = () => {
        const no_telp = activity?.mst_funding.no_telp.replace("0", "62");
        Linking.openURL(`https://wa.me/${no_telp}`);
    }

    const showActivityDatePicker = () => {
        setActivityDatePickerVisibility(true);
    };

    const hideActivityDatePicker = () => {
        setActivityDatePickerVisibility(false);
    };

    const handleConfirmActivityDate = (date: any, onChange: any) => {
        onChange(date);
        hideActivityDatePicker();
    };

    const showJamMulaiNextAppointmentPicker = () => {
        setJamMulaiNextAppointmentPickerVisibility(true);
    }

    const hideJamMulaiNextAppointmentPicker = () => {
        setJamMulaiNextAppointmentPickerVisibility(false);
    }

    const handleConfirmJamMulaiNextAppointment = (time: any, onChange: any) => {
        onChange(moment(time).format("HH:mm"));
        hideJamMulaiNextAppointmentPicker();
    }

    const showJamSelesaiNextAppointmentPicker = () => {
        setJamSelesaiNextAppointmentPickerVisibility(true);
    }

    const hideJamSelesaiNextAppointmentPicker = () => {
        setJamSelesaiNextAppointmentPickerVisibility(false);
    }

    const handleConfirmJamSelesaiNextAppointment = (time: any, onChange: any) => {
        onChange(moment(time).format("HH:mm"));
        hideJamSelesaiNextAppointmentPicker();
    }

    const submit = async (data: UpdateActivityProps) => {
        const formData = {
            id_hasil: Number(data.id_hasil),
            id_tindakan: Number(data.id_tindakan),
            id_product: Number(data.id_product),
            realisasi: Number(data.realisasi.replace(/\D/g, "")),
            keterangan_hasil: !isClose ? data.keterangan_hasil : "",
            no_rekening: isClose ? data.no_rekening : "",
        }

        const nextAppointment = {
            ...formData,
            id_kegiatan: Number(data.kegiatan_next_appointment),
            tanggal: data.tanggal_aktivitas_next_appointment,
            jam_mulai: moment(`${data.tanggal_aktivitas_next_appointment} ${data.jam_mulai_next_appointment}`, "YYYY-MM-DD HH:mm").add(7, "hours").toISOString(),
            jam_selesai: moment(`${data.tanggal_aktivitas_next_appointment} ${data.jam_selesai_next_appointment}`, "YYYY-MM-DD HH:mm").add(7, "hours").toISOString(),
            deskripsi: data.deskripsi_next_appointment,
            latitude: latitude ? latitude.toString() : "",
            longtitude: longitude ? longitude.toString() : "",
        }

        try {
            const response = !isEnabled ? await updateResultActivityById({
                id: Number(activity?.id_activity),
                data: formData,
            }) : await updateResultActivityNextAppointmentById({
                id: Number(activity?.id_activity),
                data: nextAppointment,
            });

            if (response.data.code === 200) {
                setModalMessage("Update Data Berhasil");
                setModalVisible(true);
                setIsSuccess(true);
            } else {
                setModalMessage("Update Data Gagal");
                setModalVisible(true);
                setIsSuccess(false);
            }
        } catch (error) {
            setModalMessage("Update Data Gagal");
            setModalVisible(true);
            setIsSuccess(false);
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#F48120" }}>
            {/* Header */}
            <Topbar titleBar="Update Aktivitas" />
            {/* header */}

            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}>
                        <TouchableOpacity
                            style={[styles.shareItem, { borderColor: "#F48120" }]}
                            onPress={makePhoneCall}
                        >
                            <FontAwesome5 name="phone-alt" size={18} color="#F48120" />
                            <Text style={[styles.shareText, { color: "#F48120" }]}>Telepon</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.shareItem, { borderColor: "#25d366" }]}
                            onPress={makeWaCall}
                        >
                            <FontAwesome5 name="whatsapp" size={24} color="#25d366" />
                            <Text style={[styles.shareText, { color: "#25d366" }]}>WhatsApp</Text>
                        </TouchableOpacity>
                    </View>

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
                                    value={activity?.mst_funding.nama}
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
                                    value={activity?.mst_kegiatan.kegiatan}
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
                                    value={activity?.mst_sts_pipeline.sts_pipeline}
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
                                    value={formatDate(activity?.tanggal)}
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
                                    value={moment(activity?.jam_mulai, "HH:mm").format("HH:mm")}
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
                                    value={moment(activity?.jam_selesai, "HH:mm").format("HH:mm")}
                                    editable={false}
                                />
                            </View>
                        </View>

                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Deskripsi</Text>
                            <View style={{ position: "relative" }}>
                                <MaterialIcons name="menu" size={20} color="#F48120" style={styles.iconInput} />
                                <Input
                                    value={activity?.deskripsi}
                                    style={[styles.textArea, styles.inputDisabled]}
                                    multiline={true}
                                    numberOfLines={10}
                                    editable={false}
                                />
                            </View>
                        </View>

                        <Text style={{
                            paddingVertical: 20,
                            textAlign: "center",
                            fontFamily: "Inter_600SemiBold",
                            fontSize: 15,
                            color: "#1D4592"
                        }}>
                            Hasil Yang Diperoleh
                        </Text>

                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Status Hasil</Text>
                            <Controller
                                control={control}
                                name="id_hasil"
                                rules={{ required: "Kegiatan wajib diisi" }}
                                render={({ field: { onChange, value } }) => (
                                    <View style={{ position: "relative" }}>
                                        <MaterialIcons name="local-fire-department" size={20} color="#F48120" style={styles.iconInput} />

                                        {activity?.mst_hasil === null ? (
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
                                                data={dataStatusHasil}
                                                value={value}
                                                onChange={(item) => {
                                                    onChange(item.value);
                                                    setIsClose(item.isClose);
                                                }}
                                            />
                                        ) : (
                                            <Input
                                                value={activity?.mst_hasil.hasil}
                                                style={[styles.input, styles.inputDisabled]}
                                                multiline={true}
                                                numberOfLines={10}
                                                editable={false}
                                            />
                                        )}
                                    </View>
                                )}
                            />
                            {errors.id_hasil && <Text style={styles.errorField}>{errors.id_hasil.message}</Text>}
                        </View>

                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Tindakan Hasil</Text>
                            <Controller
                                control={control}
                                name="id_tindakan"
                                rules={{ required: "Tindakan Hasil wajib diisi" }}
                                render={({ field: { onChange, value } }) => (
                                    <View style={{ position: "relative" }}>
                                        <MaterialIcons name="local-fire-department" size={20} color="#F48120" style={styles.iconInput} />

                                        {activity?.mst_hasil === null ? (
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
                                                data={dataTindakanHasil}
                                                onChange={(item) => onChange(item.value)}
                                                value={value}
                                            />
                                        ) : (
                                            <Input
                                                value={activity?.mst_tindakan.tindakan}
                                                style={[styles.input, styles.inputDisabled]}
                                                multiline={true}
                                                numberOfLines={10}
                                                editable={false}
                                            />
                                        )}
                                    </View>
                                )}
                            />
                            {errors.id_tindakan && <Text style={styles.errorField}>{errors.id_tindakan.message}</Text>}
                        </View>

                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Jenis Produk</Text>
                            <Controller
                                control={control}
                                name="id_product"
                                rules={{ required: "Jenis Produk wajib diisi" }}
                                render={({ field: { onChange, value } }) => (
                                    <View style={{ position: "relative" }}>
                                        <FontAwesome name="file" size={18} color="#F48120" style={styles.iconInput} />

                                        {activity?.mst_hasil === null ? (
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
                                                data={dataJenisProduk}
                                                value={value}
                                                onChange={(item) => {
                                                    onChange(item.value);
                                                    handleProductChange(item);
                                                }}
                                            />
                                        ) : (
                                            <Input
                                                value={activity?.mst_funding.mst_product.product}
                                                style={[styles.input, styles.inputDisabled]}
                                                multiline={true}
                                                numberOfLines={10}
                                                editable={false}
                                            />
                                        )}
                                    </View>
                                )}
                            />
                            {errors.id_product && <Text style={styles.errorField}>{errors.id_product.message}</Text>}
                        </View>

                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Nama Produk</Text>
                            <Controller
                                control={control}
                                name="nama_produk"
                                rules={{ required: "Nama Produk wajib diisi" }}
                                render={({ field: { onChange, value } }) => (
                                    <View style={{ position: "relative" }}>
                                        <MaterialIcons name="folder-special" size={20} color="#F48120" style={styles.iconInput} />

                                        {activity?.mst_hasil === null ? (
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
                                                data={dataNamaProduk}
                                                onChange={(item) => onChange(item.value)}
                                                value={value}
                                            />
                                        ) : (
                                            <Input
                                                value={activity?.mst_funding.mst_product.mst_application.application}
                                                style={[styles.input, styles.inputDisabled]}
                                                multiline={true}
                                                numberOfLines={10}
                                                editable={false}
                                            />
                                        )}
                                    </View>
                                )}
                            />
                            {errors.nama_produk && <Text style={styles.errorField}>{errors.nama_produk.message}</Text>}
                        </View>

                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Update Nominal</Text>

                            {activity?.mst_hasil === null ? (
                                <Controller
                                    control={control}
                                    name="realisasi"
                                    rules={{ required: "Update Nominal wajib diisi" }}
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
                                                onChangeText={(value) => {
                                                    onChange(value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, "."))
                                                }}
                                                value={value}
                                                style={[styles.input, { paddingLeft: 55 }]}
                                                inputMode="numeric"
                                            />
                                        </View>
                                    )}
                                />
                            ) : (
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
                                        value={activity?.realisasi.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                        style={[styles.input, styles.inputDisabled, { paddingLeft: 55 }]}
                                        inputMode="numeric"
                                        editable={false}
                                    />
                                </View>
                            )}
                            {errors.realisasi && <Text style={styles.errorField}>{errors.realisasi.message}</Text>}
                        </View>

                        {!isClose ? (
                            <>
                                {activity?.no_rekening ? (
                                    <View style={styles.formItem}>
                                        <Text style={styles.formLabel}>No Rekening</Text>

                                        <View style={{ position: "relative" }}>
                                            <MaterialIcons name="payment" size={18} color="#F48120" style={styles.iconInput} />
                                            <Input
                                                value={activity?.no_rekening}
                                                style={[styles.input, styles.inputDisabled]}
                                                inputMode="numeric"
                                                editable={false}
                                            />
                                        </View>
                                    </View>
                                ) : (
                                    <View style={styles.formItem}>
                                        <Text style={styles.formLabel}>Deskripsi Hasil</Text>

                                        {activity?.mst_hasil === null ? (
                                            <Controller
                                                control={control}
                                                name="keterangan_hasil"
                                                rules={{ required: "Deskripsi Hasil wajib diisi" }}
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
                                        ) : (
                                            <View style={{ position: "relative" }}>
                                                <MaterialIcons name="menu" size={20} color="#F48120" style={styles.iconInput} />

                                                <Input
                                                    value={activity?.keterangan_hasil}
                                                    style={[styles.textArea, styles.inputDisabled]}
                                                    multiline={true}
                                                    numberOfLines={10}
                                                    editable={false}
                                                />
                                            </View>
                                        )}
                                        {errors.keterangan_hasil && <Text style={styles.errorField}>{errors.keterangan_hasil.message}</Text>}
                                    </View>
                                )}
                            </>
                        ) : (
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

                                            {activity?.mst_hasil === null ? (
                                                <>
                                                    <Input
                                                        onBlur={onBlur}
                                                        onChangeText={(val) => onChange(val.replace(/\D/g, "").trim().slice(0, 15))}
                                                        value={value?.toString()}
                                                        style={styles.input}
                                                        inputMode="numeric"
                                                    />

                                                    <Text style={styles.textWarning}><Text style={{ color: "red" }}>*</Text> No Rekening harus 14 karakter</Text>
                                                </>
                                            ) : (
                                                <Input
                                                    value={activity?.no_rekening}
                                                    style={[styles.input, styles.inputDisabled]}
                                                    inputMode="numeric"
                                                    editable={false}
                                                />
                                            )}
                                        </View>
                                    )}
                                />
                                {errors.no_rekening && <Text style={styles.errorField}>{errors.no_rekening.message}</Text>}
                            </View>
                        )}

                        {!isClose && activity?.mst_hasil === null && (
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <Text style={styles.formLabel}>Next Appointment</Text>
                                <Switch
                                    trackColor={{ false: "#999", true: "#F48120" }}
                                    thumbColor={isEnabled ? "#fff" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={toggleSwitch}
                                    value={isEnabled}
                                />
                            </View>
                        )}

                        {isEnabled && (
                            <>
                                <View style={styles.formItem}>
                                    <Text style={styles.formLabel}>Kegiatan</Text>
                                    <Controller
                                        control={control}
                                        name="kegiatan_next_appointment"
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
                                                    onChange={(item) => onChange(item.value)}
                                                    value={value}
                                                />
                                            </View>
                                        )}
                                    />
                                    {errors.kegiatan_next_appointment &&
                                        <Text style={styles.errorField}>{errors.kegiatan_next_appointment.message}</Text>
                                    }
                                </View>

                                <View style={styles.formItem}>
                                    <Text style={styles.formLabel}>Tanggal Aktivitas</Text>
                                    <Controller
                                        control={control}
                                        name="tanggal_aktivitas_next_appointment"
                                        rules={{ required: "Tanggal wajib diisi" }}
                                        render={({ field: { onChange, value } }) => (
                                            <>
                                                <View style={{ position: "relative" }}>
                                                    <Pressable onPress={showActivityDatePicker} style={styles.dateInput}>
                                                        <FontAwesome6
                                                            name="calendar"
                                                            size={20}
                                                            color="#F48120"
                                                            style={[styles.iconInput, { marginTop: -7 }]}
                                                        />
                                                        <Text style={styles.dateText}>
                                                            {value ? formatDate(new Date(value)) : "Pilih"}
                                                        </Text>
                                                    </Pressable>
                                                </View>

                                                <DateTimePickerModal
                                                    isVisible={isActivityDatePickerVisible}
                                                    mode="date"
                                                    onConfirm={(date) => handleConfirmActivityDate(moment(date).format("YYYY-MM-DD"), onChange)}
                                                    onCancel={hideActivityDatePicker}
                                                    date={value ? moment(value).toDate() : new Date()}
                                                    locale="id-ID"
                                                />
                                            </>
                                        )}
                                    />
                                    {errors.tanggal_aktivitas_next_appointment
                                        && <Text style={styles.errorField}>{errors.tanggal_aktivitas_next_appointment.message}</Text>
                                    }
                                </View>

                                <View style={styles.formItem}>
                                    <Text style={styles.formLabel}>Jam Mulai</Text>

                                    <Controller
                                        control={control}
                                        name="jam_mulai_next_appointment"
                                        rules={{ required: "Jam Mulai wajib diisi" }}
                                        render={({ field: { onChange, value } }) => (
                                            <>
                                                <View style={{ position: "relative" }}>
                                                    <Pressable onPress={showJamMulaiNextAppointmentPicker} style={styles.dateInput}>
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
                                                    isVisible={isJamMulaiNextAppointmentPickerVisible}
                                                    onConfirm={(time) => handleConfirmJamMulaiNextAppointment(time, onChange)}
                                                    onCancel={hideJamMulaiNextAppointmentPicker}
                                                    onChange={onChange}
                                                    date={value ? moment(value, "HH:mm").toDate() : new Date()}
                                                    locale="id-ID"
                                                />
                                            </>
                                        )}
                                    />
                                    {errors.jam_mulai_next_appointment
                                        && <Text style={styles.errorField}>{errors.jam_mulai_next_appointment.message}</Text>
                                    }
                                </View>

                                <View style={styles.formItem}>
                                    <Text style={styles.formLabel}>Jam Selesai</Text>

                                    <Controller
                                        control={control}
                                        name="jam_selesai_next_appointment"
                                        rules={{
                                            required: "Jam Selesai wajib diisi",
                                            validate: (value) => {
                                                const jamMulai = moment(getValues("jam_mulai_next_appointment"), "HH:mm");
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
                                                    <Pressable onPress={showJamSelesaiNextAppointmentPicker} style={styles.dateInput}>
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
                                                    isVisible={isJamSelesaiNextAppointmentPickerVisible}
                                                    onConfirm={(time) => handleConfirmJamSelesaiNextAppointment(time, onChange)}
                                                    onCancel={hideJamSelesaiNextAppointmentPicker}
                                                    onChange={onChange}
                                                    date={value ? moment(value, "HH:mm").toDate() : new Date()}
                                                    locale="id-ID"
                                                />
                                            </>
                                        )}
                                    />
                                    {errors.jam_selesai_next_appointment && <Text style={styles.errorField}>{errors.jam_selesai_next_appointment.message}</Text>}
                                </View>

                                <View style={styles.formItem}>
                                    <Text style={styles.formLabel}>Deskripsi</Text>
                                    <Controller
                                        control={control}
                                        name="deskripsi_next_appointment"
                                        rules={{ required: "Deskripsi Hasil wajib diisi" }}
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
                                    {errors.deskripsi_next_appointment &&
                                        <Text style={styles.errorField}>{errors.deskripsi_next_appointment.message}</Text>
                                    }
                                </View>
                            </>
                        )}

                        {activity?.mst_hasil === null && (
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 20 }}>
                                <TouchableOpacity
                                    onPress={() => navigation.back()}
                                    style={[styles.btnItem, { borderColor: "#FFF" }]}
                                >
                                    <Text style={[styles.btnText, { color: "#F48120" }]}>Batal</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.btnItem, { backgroundColor: "#F48120", borderColor: "#F48120" }]}
                                    onPress={handleSubmit(submit)}
                                >
                                    <Text style={[styles.btnText, { color: "#FFF" }]}>Update</Text>
                                </TouchableOpacity>
                            </View>
                        )}
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
    textWarning: {
        fontSize: 11,
        fontFamily: "Inter_400Regular",
        marginTop: 5,
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