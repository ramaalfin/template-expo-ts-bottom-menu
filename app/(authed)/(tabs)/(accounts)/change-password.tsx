import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { useForm, Controller } from 'react-hook-form';

// components
import Topbar from "~/components/TopBar";
import { Input } from "~/components/ui/input";

type ChangePasswordProps = {
    email: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
};

export default function ChangePasswordScreen() {
    const { control, handleSubmit, watch, formState: { errors } } = useForm<ChangePasswordProps>();
    const newPassword = watch('newPassword');

    const submit = (data: ChangePasswordProps) => {
        console.log(data);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F48120" }}>
            {/* Header */}
            <Topbar titleBar="Ganti Password" />
            {/* header */}

            <View style={styles.container}>
                <View style={styles.formItem}>
                    <Text style={styles.formLabel}>Email</Text>
                    <Controller
                        control={control}
                        name="email"
                        rules={{ required: 'Email wajib diisi' }}
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
                            <Input
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                style={styles.input}
                                secureTextEntry={true}
                            />
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
                            <Input
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                style={styles.input}
                                secureTextEntry={true}
                            />
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
                            validate: (value) => value === newPassword || "Konfirmasi Password tidak sama dengan Password Baru"
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                style={styles.input}
                                secureTextEntry={true}
                            />
                        )}
                    />
                    {errors.confirmPassword && <Text style={styles.errorField}>{errors.confirmPassword.message}</Text>}
                </View>

                <TouchableOpacity
                    style={styles.btnItem}
                    onPress={handleSubmit(submit)}
                >
                    <Text style={styles.btnText}>Simpan</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
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
});
