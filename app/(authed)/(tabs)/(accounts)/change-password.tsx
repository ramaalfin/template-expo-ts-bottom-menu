import React, { useState } from "react";
import { ActivityIndicator, Image, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { useForm, Controller } from 'react-hook-form';

// icons
import { Feather } from "@expo/vector-icons";

// components
import Topbar from "~/components/TopBar";
import { Input } from "~/components/ui/input";
import { changePassword } from "~/services/auth";
import { useAuth } from "~/context/AuthContext";

type ChangePasswordProps = {
    email: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
};

export default function ChangePasswordScreen() {
    const { isLoading, tokens } = useAuth();
    const { control, handleSubmit, formState: { errors }, getValues } = useForm<ChangePasswordProps>();

    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [isSuccess, setIsSuccess] = useState(false);

    const submit = async (data: ChangePasswordProps) => {
        try {
            const response = await changePassword({
                token: tokens.access.token,
                password: data.currentPassword,
                newPassword: data.newPassword,
            });

            console.log(response);


            if (response.code === 200) {
                setModalMessage("Ubah Password Berhasil");
                setModalVisible(true);
                setIsSuccess(true);

                control._reset();
                setShowPassword(false);
                setShowNewPassword(false);
                setShowConfirmPassword(false);
            } else {
                setModalMessage(response.message);
                setModalVisible(true);
                setIsSuccess(false);
            }
        } catch (error) {
            setModalMessage("Ubah Password Gagal");
            setModalVisible(true);
            setIsSuccess(false);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#F48120" }}>
            {/* Header */}
            <Topbar titleBar="Ganti Password" />
            {/* header */}

            <View style={styles.container}>
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
                            <Input
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                style={styles.input}
                                inputMode="email"
                            />
                        )}
                    />
                    {errors.email && <Text style={styles.errorField}>{errors.email.message}</Text>}
                </View>

                <View style={styles.formItem}>
                    <Text style={styles.formLabel}>Password Saat Ini</Text>
                    <Controller
                        control={control}
                        name="currentPassword"
                        rules={{ required: "Password Saat Ini wajib diisi" }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View style={{ position: "relative" }}>
                                <View style={styles.password}>
                                    <Input
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        style={styles.input}
                                        secureTextEntry={!showPassword}
                                    />

                                    <View style={{ position: "absolute", right: 10, top: 15 }}>
                                        {showPassword ? (
                                            <Feather
                                                name="eye"
                                                size={20}
                                                color="#707070"
                                                onPress={() => setShowPassword(!showPassword)}
                                            />
                                        ) : (
                                            <Feather
                                                name="eye-off"
                                                size={20}
                                                color="#707070"
                                                onPress={() => setShowPassword(!showPassword)}
                                            />
                                        )}
                                    </View>
                                </View>
                            </View>
                        )}
                    />
                    {errors.currentPassword && <Text style={styles.errorField}>{errors.currentPassword.message}</Text>}
                </View>

                <View style={styles.formItem}>
                    <Text style={styles.formLabel}>Password Baru</Text>
                    <Controller
                        control={control}
                        name="newPassword"
                        rules={{ required: "Password Baru wajib diisi" }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View style={{ position: "relative" }}>
                                <View style={styles.password}>
                                    <Input
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        style={styles.input}
                                        secureTextEntry={!showNewPassword}
                                    />

                                    <View style={{ position: "absolute", right: 10, top: 15 }}>
                                        {showNewPassword ? (
                                            <Feather
                                                name="eye"
                                                size={20}
                                                color="#707070"
                                                onPress={() => setShowNewPassword(!showNewPassword)}
                                            />
                                        ) : (
                                            <Feather
                                                name="eye-off"
                                                size={20}
                                                color="#707070"
                                                onPress={() => setShowNewPassword(!showNewPassword)}
                                            />
                                        )}
                                    </View>
                                </View>
                            </View>
                        )}
                    />
                    {errors.newPassword && <Text style={styles.errorField}>{errors.newPassword.message}</Text>}
                </View>

                <View style={styles.formItem}>
                    <Text style={styles.formLabel}>Konfirmasi Password Baru</Text>
                    <Controller
                        control={control}
                        name="confirmPassword"
                        rules={{
                            required: "Konfirmasi Password Baru wajib diisi",
                            validate: (value) => value === getValues("newPassword") || "Password tidak sama"
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View style={{ position: "relative" }}>
                                <View style={styles.password}>
                                    <Input
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        style={styles.input}
                                        secureTextEntry={!showConfirmPassword}
                                    />

                                    <View style={{ position: "absolute", right: 10, top: 15 }}>
                                        {showConfirmPassword ? (
                                            <Feather
                                                name="eye"
                                                size={20}
                                                color="#707070"
                                                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                            />
                                        ) : (
                                            <Feather
                                                name="eye-off"
                                                size={20}
                                                color="#707070"
                                                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                            />
                                        )}
                                    </View>
                                </View>
                            </View>
                        )}
                    />
                    {errors.confirmPassword && <Text style={styles.errorField}>{errors.confirmPassword.message}</Text>}
                </View>

                <TouchableOpacity
                    onPress={handleSubmit(submit)}
                    style={styles.btnItem}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="white" size={20} />
                    ) : (
                        <Text style={styles.btnText}>Simpan</Text>
                    )}
                </TouchableOpacity>
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAFAFA",
        padding: 25,
        marginTop: hp("1%"),
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
        marginTop: 5,
        height: 42,
        width: "100%",
        borderColor: "#979797",
        fontSize: 13,
        fontFamily: "Inter_400Regular"
    },
    errorField: {
        color: "red",
        fontSize: 13,
        fontFamily: "Inter_400Regular",
        marginTop: 5,
    },

    btnItem: {
        backgroundColor: "#F48120",
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 5,
        width: "100%",
        marginTop: 20,
    },
    btnText: {
        fontFamily: "Inter_600SemiBold",
        fontSize: 14,
        textAlign: "center",
        color: "#fff",
    },
    password: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
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
