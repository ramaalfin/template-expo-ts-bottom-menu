import {
    StyleSheet,
    Text,
    View,
    Platform,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import React, { useState } from "react";

import { useForm, Controller } from "react-hook-form";

// components
import { useAuth } from "~/context/AuthContext";
import ModalInfo from "~/components/ModalInfo";
import InputBox from "~/components/InputBox";
import InputPassword from "~/components/InputPassword";

// types
interface Login {
    username: string;
    password: string;
}

const LoginScreen = () => {
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const { control, handleSubmit, formState: { errors }, getValues } = useForm<Login>();

    const onSubmit = async (data: Login) => {
        try {
            setLoading(true);

            await login(data.username, data.password);
        } catch (error) {
            setLoading(false);
            setModalMessage("Terjadi kesalahan, silahkan coba lagi");
            setModalVisible(true);
        }
    };

    return (
        <View style={Platform.OS === "web" ? styles.webContainer : styles.container}>
            <Text
                style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 18,
                    marginBottom: 20,
                }}
            >
                Islamic School
            </Text>

            <View style={styles.formContainer}>
                <View>
                    <Controller
                        control={control}
                        rules={{ required: "Username tidak boleh kosong" }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <InputBox
                                inputTitle="Username"
                                value={value}
                                setValue={onChange}
                                onBlur={onBlur}
                                style={{
                                    backgroundColor: "#f1f9fe",
                                    borderColor: "#f1f9fe",
                                }}
                            />
                        )}
                        name="username"
                    />

                    {errors.username && <Text style={{ color: "red" }}>{errors.username.message}</Text>}
                </View>

                <View>
                    <Controller
                        control={control}
                        rules={{ required: "Password tidak boleh kosong" }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <InputPassword
                                labelPassword="Password"
                                togglePasswordVisibility={() => setShowPassword(!showPassword)}
                                value={value}
                                setValue={onChange}
                                onBlur={onBlur}
                                style={{
                                    backgroundColor: "#f1f9fe",
                                    borderColor: "#f1f9fe",
                                }}
                                showPassword={showPassword}
                            />
                        )}
                        name="password"
                    />

                    {errors.password && <Text style={{ color: "red" }}>{errors.password.message}</Text>}
                </View>

                {/* submit */}
                <View style={{ marginTop: 50 }}>
                    <TouchableOpacity
                        style={Platform.OS === "web" ? styles.webBtnSubmit : styles.btnSubmit}
                        onPress={handleSubmit(onSubmit)}
                    >
                        <Text style={styles.btnTextSubmit}>
                            {
                                loading ?
                                    <ActivityIndicator size="small" color="#fff" />
                                    :
                                    "Masuk"
                            }
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ModalInfo
                message={modalMessage}
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                setLoading={setLoading}
            />
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    webContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: "#fff",
        width: "100%",
        maxWidth: 400,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    formContainer: {
        width: "100%",
        marginTop: 20,
        paddingHorizontal: 30,
        gap: 20,
    },

    webBtnSubmit: {
        backgroundColor: "#125694",
        padding: 10,
        height: 40,
        borderRadius: 30
    },
    btnSubmit: {
        backgroundColor: "#125694",
        padding: 15,
        borderRadius: 30
    },
    btnTextSubmit: {
        color: "#fff",
        textAlign: "center",
        fontFamily: "Inter_400Regular"
    }
});
