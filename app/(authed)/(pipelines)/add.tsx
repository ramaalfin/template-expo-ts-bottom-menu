import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useScrollToTop } from "@react-navigation/native";
import { useForm, Controller } from 'react-hook-form';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { useRouter } from "expo-router";

// context
import { useAuth } from "~/context/AuthContext";

// services
import { fetchUserById } from "~/services/sys/user";
import { fetchProspects } from "~/services/mst/prospects";
import { fetchApplications } from "~/services/mst/applications";
import { fetchSectors } from "~/services/mst/sectors";
import { fetchProductByIdApplication } from "~/services/mst/products";
import { fetchSubSectorByIdSector } from "~/services/mst/sub-sector";
import { fetchStatusSegment } from "~/services/mst/sts-segment";
import { fetchAssignmentByIdUser } from "~/services/mst/assignments";
import { storeFunding } from "~/services/mst/fundings";

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

interface InputPipelineProps {
    segment: string;
    status_segment: string;
    nik: string;
    nama_lengkap: string;
    telepon: string;
    email: string;
    alamat_lengkap: string;
    jenis_produk: string;
    nama_produk: string;
    sector: string;
    sub_sector: string;
    level_pipeline: string;
    approval: string;
    potensi_dana: string;
    keterangan: string;
    nextStep: () => void;
    prevStep: () => void;
};

interface SegmentProps {
    id_assignment: number;
    mst_goalsetting: {
        bulan: number;
        mst_segment: {
            segment: string;
        };
        mst_application: {
            application: string;
        };
        target: string;
    };
}

interface StatusSegmentProps {
    id_sts_segment: number;
    sts_segment: string;
}

interface ApplicationProps {
    id_application: string;
    application: string;
}

interface ProductProps {
    id_product: number;
    product: string;
}

interface SectorProps {
    id_sektor: number;
    sektor: string;
}

interface SubSectorProps {
    id_sub_sektor: number;
    sub_sektor: string;
}

interface PipelineProps {
    id_prospect: number;
    prospect: string;
}

interface ApprovalProps {
    id_user: number;
    nama: string;
}

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

const nama_bulan = [
    { id: 1, nama: "Januari" },
    { id: 2, nama: "Februari" },
    { id: 3, nama: "Maret" },
    { id: 4, nama: "April" },
    { id: 5, nama: "Mei" },
    { id: 6, nama: "Juni" },
    { id: 7, nama: "Juli" },
    { id: 8, nama: "Agustus" },
    { id: 9, nama: "September" },
    { id: 10, nama: "Oktober" },
    { id: 11, nama: "November" },
    { id: 12, nama: "Desember" },
]

export default function InputPipeline() {
    const { control, handleSubmit, formState: { errors } } = useForm<InputPipelineProps>();
    const { isLoading, logout, user } = useAuth();
    const navigation = useRouter();

    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState<InputPipelineProps>();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const [segments, setSegments] = useState<SegmentProps[]>([]);
    const [statusSegments, setStatusSegments] = useState<StatusSegmentProps[]>([]);
    const [applications, setApplications] = useState<ApplicationProps[]>([]);
    const [products, setProducts] = useState<ProductProps[]>([]);
    const [sectors, setSectors] = useState<SectorProps[]>([]);
    const [subSectors, setSubSectors] = useState<SubSectorProps[]>([]);
    const [pipelines, setPipelines] = useState<PipelineProps[]>([]);
    const [approvals, setApprovals] = useState<ApprovalProps[]>([]);

    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchAssignmentByIdUser(user?.id_user);

            if (response.data.code === 200) {
                setSegments(response.data.data);
            } else {
                logout();
            }
        }
        fetchData();
    }, [user?.id_user]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchStatusSegment();

            if (response.data.code === 200) {
                setStatusSegments(response.data.data.data);
            } else {
                logout();
            }
        }
        fetchData();
    }, []);

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

    const handleProductChange = async (item: any) => {
        const id_application = applications.find((app) => app.application === item.label)?.id_application;
        if (id_application) {
            const response = await fetchProductByIdApplication(Number(id_application));
            if (response.data.code === 200) {
                setProducts(response.data.data);
            } else {
                logout();
            }
        } else {
            console.log("id_application is undefined");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchSectors();

            if (response.data.code === 200) {
                setSectors(response.data.data.data);
            } else {
                logout();
            }
        }
        fetchData();
    }, []);

    const handleSectorChange = async (item: any) => {
        const id_sector = sectors.find((sector) => sector.sektor === item.label)?.id_sektor;
        const response = await fetchSubSectorByIdSector(Number(id_sector));

        if (response.data.code === 200) {
            setSubSectors(response.data.data);
        } else {
            logout();
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchProspects();

            if (response.data.code === 200) {
                setPipelines(response.data.data.data);
            } else {
                logout();
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchUserById(user?.id_user);

            if (response.data.code === 200) {
                setApprovals(response.data.data.pemutus);
            } else {
                logout();
            }
        }
        fetchData();
    }, [user?.id_user]);

    const dataSegment = segments ? segments.map((item) => ({
        label: `${item.mst_goalsetting.mst_segment.segment} - ${nama_bulan[item.mst_goalsetting.bulan - 1].nama} - ${item.mst_goalsetting.mst_application.application} - ${item.mst_goalsetting.target}`,
        value: item.id_assignment
    })) : [];
    const dataStatusSegment = statusSegments ? statusSegments.map((item) => ({
        label: item.sts_segment, value: item.id_sts_segment
    })) : [];
    const dataJenisProduk = applications ? applications.map((item) => ({
        label: item.application, value: item.id_application
    })) : [];
    const dataNamaProduk = products ? products.map((item) => ({
        label: item.product, value: item.id_product
    })) : [];
    const dataSector = sectors ? sectors.map((item) => ({
        label: item.sektor, value: item.id_sektor
    })) : [];
    const dataSubSector = subSectors ? subSectors.map((item) => ({
        label: item.sub_sektor, value: item.id_sub_sektor
    })) : [];
    const dataLevelPipeline = pipelines ? pipelines.map((item) => ({
        label: item.prospect, value: item.id_prospect
    })) : [];
    const dataApproval = approvals ? approvals.map((item) => ({
        label: item.nama, value: item.id_user
    })) : [];

    const scrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 0, animated: true });
        }
    }, []);

    const nextStep = (data: InputPipelineProps) => {
        if (activeStep === 0) {
            setFormData((prev: any) => ({ ...prev, ...data }));
            setActiveStep(1);

            if (scrollViewRef.current) {
                scrollViewRef.current.scrollTo({ y: 0, animated: true });
            }
        }
    }

    const prevStep = () => {
        if (activeStep > 0) {
            setActiveStep(activeStep - 1);
        }
    }

    const finalSubmit = async (data: InputPipelineProps) => {
        const allData = { ...formData, ...data };

        const dataFunding = {
            id_assignment: Number(allData.segment),
            id_product: Number(allData.nama_produk),
            id_sts_segment: Number(allData.status_segment),
            id_sub_sektor: Number(allData.sub_sector),
            id_prospect: Number(allData.level_pipeline),
            nik: allData.nik,
            nama: allData.nama_lengkap,
            alamat: allData.alamat_lengkap,
            no_telp: allData.telepon,
            email: allData.email,
            target: Number(allData.potensi_dana.replace(/\./g, '')),
            keterangan: allData.keterangan,
            id_checker: allData.approval,
        }

        try {
            const response = await storeFunding(dataFunding);

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
            <Topbar titleBar="Input Penempatan Dana" />
            {/* header */}

            <View style={styles.container}>
                <StepIndicator
                    customStyles={customStyles}
                    currentPosition={activeStep}
                    labels={labels}
                    stepCount={2}
                />

                <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef}>
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
                                                    data={dataSegment || []}
                                                    onChange={(item) => onChange(item.value)}
                                                    value={value}
                                                />
                                            </View>
                                        )}
                                    />
                                    {errors.segment && <Text style={styles.errorField}>{errors.segment.message}</Text>}
                                </View>

                                <View style={styles.formItem}>
                                    <Text style={styles.formLabel}>Status Segment</Text>
                                    <Controller
                                        control={control}
                                        name="status_segment"
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
                                                    data={dataStatusSegment || []}
                                                    onChange={(item) => onChange(item.value)}
                                                    value={value}
                                                />
                                            </View>
                                        )}
                                    />
                                    {errors.status_segment && <Text style={styles.errorField}>{errors.status_segment.message}</Text>}
                                </View>

                                <View style={styles.formItem}>
                                    <Text style={styles.formLabel}>NIK</Text>
                                    <Controller
                                        control={control}
                                        name="nik"
                                        rules={{
                                            required: "NIK wajib diisi",
                                            pattern: {
                                                value: /^[0-9]{16}$/,
                                                message: "NIK tidak valid"
                                            }
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <View style={{ position: "relative" }}>
                                                <FontAwesome6 name="clipboard-user" size={18} color="#F48120" style={styles.iconInput} />
                                                <Input
                                                    onBlur={onBlur}
                                                    onChangeText={(val) => onChange(val.replace(/\D/g, "").slice(0, 16))}
                                                    value={value}
                                                    style={styles.input}
                                                    inputMode="numeric"
                                                />
                                                <Text style={styles.textWarning}>
                                                    <Text style={{ color: "red" }}>*</Text> NIK harus 16 karakter
                                                </Text>
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
                                        rules={{
                                            required: "Telepon wajib diisi",
                                            pattern: {
                                                value: /^(0)(\d{10,15})$/,
                                                message: "No Telepon tidak valid"
                                            }

                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <View style={{ position: "relative" }}>
                                                <MaterialCommunityIcons name="phone" size={18} color="#F48120" style={styles.iconInput} />
                                                <Input
                                                    onBlur={onBlur}
                                                    onChangeText={(val) => onChange(val.replace(/\D/g, "").slice(0, 15))}
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
                                        rules={{
                                            required: "Email wajib diisi",
                                            validate: (value) => value.includes("@") || "Email tidak valid"
                                        }}
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
                                                    data={dataJenisProduk || []}
                                                    onChange={(item) => {
                                                        handleProductChange(item);
                                                        onChange(item.value);
                                                    }}
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
                                                    data={dataNamaProduk || []}
                                                    onChange={(item) => onChange(item.value)}
                                                    value={value}
                                                />
                                            </View>
                                        )}
                                    />
                                    {errors.nama_produk && <Text style={styles.errorField}>{errors.nama_produk.message}</Text>}
                                </View>

                                <View style={styles.formItem}>
                                    <Text style={styles.formLabel}>Sektor</Text>
                                    <Controller
                                        control={control}
                                        name="sector"
                                        rules={{ required: "Sektor wajib diisi" }}
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
                                                    data={dataSector || []}
                                                    onChange={(item) => {
                                                        handleSectorChange(item);
                                                        onChange(item.value);
                                                    }}
                                                    value={value}
                                                />
                                            </View>
                                        )}
                                    />
                                    {errors.sector && <Text style={styles.errorField}>{errors.sector.message}</Text>}
                                </View>

                                <View style={styles.formItem}>
                                    <Text style={styles.formLabel}>Sub Sektor</Text>
                                    <Controller
                                        control={control}
                                        name="sub_sector"
                                        rules={{ required: "Sub Sektor wajib diisi" }}
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
                                                    data={dataSubSector || []}
                                                    onChange={(item) => onChange(item.value)}
                                                    value={value}
                                                />
                                            </View>
                                        )}
                                    />
                                    {errors.sub_sector && <Text style={styles.errorField}>{errors.sub_sector.message}</Text>}
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
                                                    data={dataLevelPipeline || []}
                                                    value={value}
                                                    onChange={(item) => onChange(item.value)}
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
                                                    data={dataApproval || []}
                                                    value={value}
                                                    onChange={(item) => onChange(item.value)}
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
                                                <Text style={styles.rupiahText}>Rp</Text>
                                                <Input
                                                    onBlur={onBlur}
                                                    onChangeText={(value) =>
                                                        onChange(value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, "."))
                                                    }
                                                    value={value}
                                                    style={[styles.input, { paddingLeft: 55 }]}
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
                                        {isLoading ? (
                                            <ActivityIndicator size="small" color="#FFF" />
                                        ) : (
                                            <Text style={[styles.btnText, { color: "#FFF" }]}>Kirim</Text>
                                        )}
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
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
        </View>
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
    textWarning: {
        fontSize: 11,
        fontFamily: "Inter_400Regular",
        marginTop: 5,
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