import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useForm, Controller } from 'react-hook-form';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { useRouter } from "expo-router";

// icons
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// components
import Topbar from "~/components/TopBar";
import { Input } from "~/components/ui/input";
import { Dropdown } from "react-native-element-dropdown";
import StepIndicator from 'react-native-step-indicator';

type InputPipelineProps = {
    segment: string;
    nik: string;
    nama_lengkap: string;
    telepon: string;
    email: string;
    alamat_lengkap: string;
    jenis_produk: string;
    nama_produk: string;
    level_pipeline: string;
    approval: string;
    potensi_dana: string;
    keterangan: string;
    nextStep: () => void;
    prevStep: () => void;
};

const labels = ["Data Nasabah", "Detail Penempatan Dana"];
const customStyles = {
    stepIndicatorSize: 50,
    currentStepIndicatorSize: 50,
    separatorStrokeWidth: 1,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#1D4592',
    stepStrokeWidth: 2,
    stepStrokeFinishedColor: '#1D4592',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#1D4592',
    separatorUnFinishedColor: '#aaa',
    stepIndicatorFinishedColor: '#1D4592',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#1D4592',
    stepIndicatorLabelFontSize: 25,
    currentStepIndicatorLabelFontSize: 25,
    stepIndicatorLabelCurrentColor: '#fff',
    stepIndicatorLabelFinishedColor: '#fff',
    stepIndicatorLabelUnFinishedColor: '#aaa',
    labelColor: '#666',
    labelSize: 13,
    currentStepLabelColor: '#666',
    labelFontFamily: 'Inter_400Regular',
}

export default function InputPipeline() {
    const { control, handleSubmit, formState: { errors } } = useForm<InputPipelineProps>();
    const navigation = useRouter();

    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState<InputPipelineProps>();

    const dataSegment = [
        { label: "Retail-Oktober-Giro-Rp.100.000.000", value: 1 },
        { label: "Retail-November-Giro-Rp.100.000.000", value: 2 },
        { label: "Retail-Desember-Giro-Rp.100.000.000", value: 3 },
    ];
    const dataJenisProduk = [
        { label: "Retail", value: 1 },
        { label: "KPR", value: 2 },
        { label: "KKB", value: 3 },
    ];
    const dataNamaProduk = [
        { label: "Giro", value: 1 },
        { label: "Tabungan", value: 2 },
        { label: "Deposito", value: 3 },
    ];
    const dataLevelPipeline = [
        { label: "Hot Prospect", value: 1 },
        { label: "Warm", value: 2 },
        { label: "Cold", value: 3 },
    ];
    const dataApproval = [
        { label: "Mardianto", value: 1 },
        { label: "Bambang", value: 2 },
    ];

    const nextStep = (data: InputPipelineProps) => {
        if (activeStep === 0) {
            setFormData((prev: any) => ({ ...prev, ...data }));
            setActiveStep(1);
        }
    }

    const prevStep = () => {
        if (activeStep > 0) {
            setActiveStep(activeStep - 1);
        }
    }

    const finalSubmit = (data: InputPipelineProps) => {
        const allData = { ...formData, ...data };
        console.log(allData);
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#F48120" }}>
            {/* Header */}
            <Topbar titleBar="Input Penempatan Dana" />
            {/* header */}

            <View style={styles.container}>
                <StepIndicator
                    customStyles={customStyles}
                    currentPosition={activeStep}
                    labels={labels}
                    stepCount={2}
                />

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ marginTop: 20 }}>
                        {/* STEP 1 */}
                        {activeStep === 0 && (
                            <>
                                <View style={styles.formItem}>
                                    <Text style={styles.formLabel}>Segment</Text>
                                    <Controller
                                        control={control}
                                        name="segment"
                                        rules={{ required: "Segment wajib diisi" }}
                                        render={({ field: { onChange, value } }) => (
                                            <View style={{ position: "relative" }}>
                                                <MaterialIcons name="folder-special" size={20} color="#F48120" style={styles.iconInput} />
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
                                                    data={dataSegment}
                                                    onChange={onChange}
                                                    value={value}
                                                />
                                            </View>
                                        )}
                                    />
                                    {errors.segment && <Text style={styles.errorField}>{errors.segment.message}</Text>}
                                </View>

                                <View style={styles.formItem}>
                                    <Text style={styles.formLabel}>NIK</Text>
                                    <Controller
                                        control={control}
                                        name="nik"
                                        rules={{ required: "NIK wajib diisi" }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <View style={{ position: "relative" }}>
                                                <FontAwesome6 name="clipboard-user" size={18} color="#F48120" style={styles.iconInput} />
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
                                    {errors.nik && <Text style={styles.errorField}>{errors.nik.message}</Text>}
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
                                    <Text style={styles.formLabel}>No Telepon (awali dengan nol)</Text>
                                    <Controller
                                        control={control}
                                        name="telepon"
                                        rules={{ required: "Telepon wajib diisi" }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <View style={{ position: "relative" }}>
                                                <MaterialCommunityIcons name="phone" size={18} color="#F48120" style={styles.iconInput} />
                                                <Input
                                                    onBlur={onBlur}
                                                    onChangeText={onChange}
                                                    value={value}
                                                    style={styles.input}
                                                    inputMode="tel"
                                                />
                                            </View>
                                        )}
                                    />
                                    {errors.telepon && <Text style={styles.errorField}>{errors.telepon.message}</Text>}
                                </View>

                                <View style={styles.formItem}>
                                    <Text style={styles.formLabel}>Email</Text>
                                    <Controller
                                        control={control}
                                        name="email"
                                        rules={{ required: "Email wajib diisi" }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <View style={{ position: "relative" }}>
                                                <MaterialIcons name="alternate-email" size={18} color="#F48120" style={styles.iconInput} />
                                                <Input
                                                    onBlur={onBlur}
                                                    onChangeText={onChange}
                                                    value={value}
                                                    style={styles.input}
                                                    inputMode="email"
                                                />
                                            </View>
                                        )}
                                    />
                                    {errors.email && <Text style={styles.errorField}>{errors.email.message}</Text>}
                                </View>

                                <View style={styles.formItem}>
                                    <Text style={styles.formLabel}>Alamat Lengkap</Text>
                                    <Controller
                                        control={control}
                                        name="alamat_lengkap"
                                        rules={{ required: "Alamat Lengkap wajib diisi" }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <View style={{ position: "relative" }}>
                                                <FontAwesome6 name="location-dot" size={18} color="#F48120" style={styles.iconInput} />
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
                                    {errors.alamat_lengkap && <Text style={styles.errorField}>{errors.alamat_lengkap.message}</Text>}
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
                                        onPress={handleSubmit(nextStep)}
                                    >
                                        <Text style={[styles.btnText, { color: "#FFF" }]}>Selanjutnya</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}

                        {/* STEP BERIKUTNYA */}
                        {activeStep === 1 && (
                            <>
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
                                                    onChange={onChange}
                                                    value={value}
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
                                    <Text style={styles.formLabel}>Level Pipeline</Text>
                                    <Controller
                                        control={control}
                                        name="level_pipeline"
                                        rules={{ required: "Level Pipeline wajib diisi" }}
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
                                                    data={dataLevelPipeline}
                                                    value={value}
                                                    onChange={onChange}
                                                />
                                            </View>
                                        )}
                                    />
                                    {errors.level_pipeline && <Text style={styles.errorField}>{errors.level_pipeline.message}</Text>}
                                </View>

                                <View style={styles.formItem}>
                                    <Text style={styles.formLabel}>Approval</Text>
                                    <Controller
                                        control={control}
                                        name="approval"
                                        rules={{ required: "Approval wajib diisi" }}
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
                                                    placeholder={"Pilih"}
                                                    data={dataApproval}
                                                    value={value}
                                                    onChange={onChange}
                                                />
                                            </View>
                                        )}
                                    />
                                    {errors.approval && <Text style={styles.errorField}>{errors.approval.message}</Text>}
                                </View>

                                <View style={styles.formItem}>
                                    <Text style={styles.formLabel}>Potensi Dana</Text>
                                    <Controller
                                        control={control}
                                        name="potensi_dana"
                                        rules={{ required: "Potensi Dana wajib diisi" }}
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
                                    {errors.potensi_dana && <Text style={styles.errorField}>{errors.potensi_dana.message}</Text>}
                                </View>

                                <View style={styles.formItem}>
                                    <Text style={styles.formLabel}>Keterangan</Text>
                                    <Controller
                                        control={control}
                                        name="keterangan"
                                        rules={{ required: "Keterangan wajib diisi" }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <View style={{ position: "relative" }}>
                                                <FontAwesome6 name="circle-info" size={20} color="#F48120" style={styles.iconInput} />
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
                                    {errors.keterangan && <Text style={styles.errorField}>{errors.keterangan.message}</Text>}
                                </View>

                                <View style={styles.btnContainer}>
                                    <TouchableOpacity
                                        onPress={prevStep}
                                        style={[styles.btnItem, { borderColor: "#FFF" }]}
                                    >
                                        <Text style={[styles.btnText, { color: "#F48120" }]}>Sebelumnya</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[styles.btnItem, { backgroundColor: "#F48120", borderColor: "#F48120" }]}
                                        onPress={handleSubmit(finalSubmit)}
                                    >
                                        <Text style={[styles.btnText, { color: "#FFF" }]}>Kirim</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
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
});