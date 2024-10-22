import { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Button, Modal, Pressable, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from 'react-hook-form';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

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
import moment from "moment";
import { useRouter } from "expo-router";

type UpdateActivityProps = {
    pilih_client: string;
    jenis_produk: string;
    nama_produk: string;
    kegiatan: string;
    status_prospect: string;
    tanggal: string;
    jam_mulai: string;
    jam_selesai: string;
    deskripsi: string;
    status_hasil: string;
    tindakan_hasil: string;
    update_nominal: string;
    deskripsi_hasil: string;
    kegiatan_next_appointment: string;
    tanggal_aktivitas_next_appointment: string;
    jam_mulai_next_appointment: string;
    jam_selesai_next_appointment: string;
    jenis_produk_next_appointment: string;
    nama_produk_next_appointment: string;
    deskripsi_next_appointment: string;
};

export default function UpdateActivity() {
    const { id } = useLocalSearchParams();
    const { control, handleSubmit, formState: { errors }, getValues } = useForm<UpdateActivityProps>();
    const navigation = useRouter();

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isActivityDatePickerVisible, setActivityDatePickerVisibility] = useState(false);
    const [isJamMulaiPickerVisible, setJamMulaiPickerVisibility] = useState(false);
    const [isJamSelesaiPickerVisible, setJamSelesaiPickerVisibility] = useState(false);
    const [isJamMulaiNextAppointmentPickerVisible, setJamMulaiNextAppointmentPickerVisibility] = useState(false);
    const [isJamSelesaiNextAppointmentPickerVisible, setJamSelesaiNextAppointmentPickerVisibility] = useState(false);

    const dataPilihClient = [
        { label: "Rama", value: 1 },
        { label: "John", value: 2 },
        { label: "Doe", value: 3 },
    ];
    const dataStatusHasil = [
        { label: "Visit", value: 1 },
        { label: "Present", value: 2 },
        { label: "Upsell", value: 3 },
        { label: "Topup", value: 4 },
        { label: "Closing", value: 5 },
        { label: "Belum Closing", value: 6 },
    ];
    const dataTindakanHasil = [
        { label: "Berhasil Ditemui", value: 1 },
        { label: "Berhasil Ditemui", value: 2 },
        { label: "Closing", value: 3 },
    ];
    const dataJenisProduk = [
        { label: "Giro", value: 1 },
        { label: "Tabungan", value: 2 },
        { label: "Deposito", value: 3 },
        { label: "Cemerlang", value: 4 },
    ];
    const dataNamaProduk = [
        { label: "Giro", value: 1 },
        { label: "Tabungan", value: 2 },
        { label: "Deposito", value: 3 },
        { label: "Cemerlang", value: 4 },
    ];
    const dataJenisProdukNextAppointment = [
        { label: "Giro", value: 1 },
        { label: "Tabungan", value: 2 },
        { label: "Deposito", value: 3 },
        { label: "Cemerlang", value: 4 },
    ];
    const dataNamaProdukNextAppointment = [
        { label: "Giro", value: 1 },
        { label: "Tabungan", value: 2 },
        { label: "Deposito", value: 3 },
        { label: "Cemerlang", value: 4 },
    ];
    const dataKegiatan = [
        { label: "Visit", value: 1 },
        { label: "Telepon", value: 2 },
        { label: "Chat/SMS", value: 3 },
        { label: "Email", value: 4 },
        { label: "Monitoring Evaluasi", value: 5 },
    ];
    const dataStatusProspect = [
        { label: "Visit", value: 1 },
        { label: "Present", value: 2 },
        { label: "Upsell", value: 3 },
        { label: "Topup", value: 4 },
        { label: "Closing", value: 5 },
        { label: "Belum Closing", value: 6 },
    ];

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirmDate = (date: any, onChange: any) => {
        onChange(date);
        hideDatePicker();
    };

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

    const showJamMulaiPicker = () => {
        setJamMulaiPickerVisibility(true);
    }

    const hideJamMulaiPicker = () => {
        setJamMulaiPickerVisibility(false);
    }

    const handleConfirmJamMulai = (time: any, onChange: any) => {
        onChange(moment(time).format("HH:mm"));
        hideJamMulaiPicker();
    }

    const showJamSelesaiPicker = () => {
        setJamSelesaiPickerVisibility(true);
    }

    const hideJamSelesaiPicker = () => {
        setJamSelesaiPickerVisibility(false);
    }

    const handleConfirmJamSelesai = (time: any, onChange: any) => {
        onChange(moment(time).format("HH:mm"));
        hideJamSelesaiPicker();
    }

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

    const submit = (data: any) => {
        console.log(data);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F48120" }}>
            {/* Header */}
            <Topbar titleBar="Update Aktivitas" />
            {/* header */}

            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}>
                        <TouchableOpacity style={[styles.shareItem, { borderColor: "#F48120" }]}>
                            <FontAwesome5 name="phone-alt" size={18} color="#F48120" />
                            <Text style={[styles.shareText, { color: "#F48120" }]}>Telepon</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.shareItem, { borderColor: "#25d366" }]}>
                            <FontAwesome5 name="whatsapp" size={24} color="#25d366" />
                            <Text style={[styles.shareText, { color: "#25d366" }]}>WhatsApp</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.formContainer}>
                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Client</Text>
                            <Controller
                                control={control}
                                name="pilih_client"
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
                                            onChange={onChange}
                                        />
                                    </View>
                                )}
                            />
                            {errors.pilih_client && <Text style={styles.errorField}>{errors.pilih_client.message}</Text>}
                        </View>

                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Kegiatan</Text>
                            <Controller
                                control={control}
                                name="kegiatan"
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
                                            onChange={onChange}
                                            value={value}
                                        />
                                    </View>
                                )}
                            />
                            {errors.kegiatan && <Text style={styles.errorField}>{errors.kegiatan.message}</Text>}
                        </View>

                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Status Pipeline</Text>
                            <Controller
                                control={control}
                                name="status_prospect"
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
                                            data={dataStatusProspect}
                                            onChange={onChange}
                                            value={value}
                                        />
                                    </View>
                                )}
                            />
                            {errors.status_prospect && <Text style={styles.errorField}>{errors.status_prospect.message}</Text>}
                        </View>

                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Tanggal</Text>
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
                                                <FontAwesome6 name="clock" size={19} color="#F48120" style={[styles.iconInput, { marginTop: -7 }]} />
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
                                        if (value < getValues("jam_mulai")) {
                                            return "Jam Selesai harus lebih besar dari Jam Mulai";
                                        }
                                    }
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <View style={{ position: "relative" }}>
                                            <Pressable onPress={showJamSelesaiPicker} style={styles.dateInput}>
                                                <MaterialCommunityIcons name="clock-remove-outline" size={20} color="#F48120" style={[styles.iconInput, { marginTop: -7 }]} />
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
                                name="status_hasil"
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
                                            data={dataStatusHasil}
                                            onChange={onChange}
                                            value={value}
                                        />
                                    </View>
                                )}
                            />
                            {errors.status_hasil && <Text style={styles.errorField}>{errors.status_hasil.message}</Text>}
                        </View>

                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Tindakan Hasil</Text>
                            <Controller
                                control={control}
                                name="tindakan_hasil"
                                rules={{ required: "Tindakan Hasil wajib diisi" }}
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
                                            data={dataTindakanHasil}
                                            onChange={onChange}
                                            value={value}
                                        />
                                    </View>
                                )}
                            />
                            {errors.tindakan_hasil && <Text style={styles.errorField}>{errors.tindakan_hasil.message}</Text>}
                        </View>

                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Jenis Produk</Text>
                            <Controller
                                control={control}
                                name="jenis_produk"
                                rules={{ required: "Jenis Produk wajib diisi" }}
                                render={({ field: { onChange, value } }) => (
                                    <View style={{ position: "relative" }}>
                                        <FontAwesome name="file" size={18} color="#F48120" style={styles.iconInput} />
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
                                            onChange={onChange}
                                        />
                                    </View>
                                )}
                            />
                            {errors.jenis_produk && <Text style={styles.errorField}>{errors.jenis_produk.message}</Text>}
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
                                            onChange={onChange}
                                            value={value}
                                        />
                                    </View>
                                )}
                            />
                            {errors.nama_produk && <Text style={styles.errorField}>{errors.nama_produk.message}</Text>}
                        </View>

                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Update Nominal</Text>
                            <Controller
                                control={control}
                                name="update_nominal"
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
                                        <Input
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            style={styles.input}
                                            inputMode="numeric"
                                        />
                                    </View>
                                )}
                            />
                            {errors.update_nominal && <Text style={styles.errorField}>{errors.update_nominal.message}</Text>}
                        </View>

                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Deskripsi Hasil</Text>
                            <Controller
                                control={control}
                                name="deskripsi_hasil"
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
                            {errors.deskripsi_hasil && <Text style={styles.errorField}>{errors.deskripsi_hasil.message}</Text>}
                        </View>

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
                                                    onChange={onChange}
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
                                                    onCancel={hideDatePicker}
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
                                                    onCancel={hideJamMulaiPicker}
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
                                                if (value < getValues("jam_mulai_next_appointment")) {
                                                    return "Jam Selesai harus lebih besar dari Jam Mulai";
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
                                                    onCancel={hideJamSelesaiPicker}
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
                                    <Text style={styles.formLabel}>Jenis Produk</Text>
                                    <Controller
                                        control={control}
                                        name="jenis_produk_next_appointment"
                                        rules={{ required: "Jenis Produk wajib diisi" }}
                                        render={({ field: { onChange, value } }) => (
                                            <View style={{ position: "relative" }}>
                                                <FontAwesome name="file" size={18} color="#F48120" style={styles.iconInput} />
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
                                                    data={dataJenisProdukNextAppointment}
                                                    value={value}
                                                    onChange={onChange}
                                                />
                                            </View>
                                        )}
                                    />
                                    {errors.jenis_produk_next_appointment
                                        && <Text style={styles.errorField}>{errors.jenis_produk_next_appointment.message}</Text>
                                    }
                                </View>

                                <View style={styles.formItem}>
                                    <Text style={styles.formLabel}>Nama Produk</Text>
                                    <Controller
                                        control={control}
                                        name="nama_produk_next_appointment"
                                        rules={{ required: "Nama Produk wajib diisi" }}
                                        render={({ field: { onChange, value } }) => (
                                            <View style={{ position: "relative" }}>
                                                <MaterialIcons name="folder-special" size={20} color="#F48120" style={styles.iconInput} />
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
                                                    data={dataNamaProdukNextAppointment}
                                                    onChange={onChange}
                                                    value={value}
                                                />
                                            </View>
                                        )}
                                    />
                                    {errors.nama_produk_next_appointment &&
                                        <Text style={styles.errorField}>{errors.nama_produk_next_appointment.message}</Text>
                                    }
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
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView >
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
        width: '90%',
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