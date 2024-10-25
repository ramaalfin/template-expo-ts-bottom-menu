import React, { useEffect, useState } from "react";
import { useForm, Controller } from 'react-hook-form';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import * as SecureStore from 'expo-secure-store';

// icons
import { Feather } from "@expo/vector-icons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// components
import { Input } from "~/components/ui/input";
import {
    Image,
    StyleSheet,
    Text,
    View,
    Pressable,
    KeyboardAvoidingView,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { loginUser } from "~/services/auth";
import { Href, useRouter } from "expo-router";


type LoginProps = {
    email: string;
    password: string;
};

export default function Login() {
    const { control, handleSubmit, formState: { errors } } = useForm<LoginProps>();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const navigation = useRouter();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const submit = async ({ email, password }: LoginProps) => {
        setLoading(true);
        try {
            const response = await loginUser({ email, password });

            if (response.code === 200) {
                const user = JSON.stringify(response.data.user);
                const accessToken = JSON.stringify(response.data.tokens.access);

                await SecureStore.setItemAsync("accessToken", accessToken);
                await SecureStore.setItemAsync("user", user);

                navigation.replace("/(homes)" as Href);
                setErrorMessage(null);
            } else {
                setErrorMessage(response?.message);
            }
        } catch (error) {
            setErrorMessage("Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Image
                resizeMode="contain"
                source={require("~/assets/images/Vector_right_top.png")}
                style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: wp("60%"),
                    height: hp("20%"),
                }}
            />

            <Image
                resizeMode="contain"
                source={require("~/assets/images/Vector_left_top.png")}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: wp("52%"),
                    height: hp("29.2%"),
                }}
            />

            <KeyboardAvoidingView
                style={styles.formContainer}
                behavior="height"
            >
                <View>
                    <Image
                        style={styles.logo}
                        resizeMode="contain"
                        source={require("~/assets/icon/icon_login.png")}
                    />
                    <Text style={styles.logoText}>Funding App of Super Team</Text>
                </View>

                <View
                    style={{
                        padding: 20,
                        borderRadius: 15,
                    }}
                >
                    <View style={{ marginBottom: 15 }}>
                        <Controller
                            control={control}
                            name="email"
                            rules={{
                                required: "Email wajib diisi",
                                validate: (value) => value.includes("@") || "Email tidak valid"
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <View style={{ position: "relative" }}>
                                    <MaterialIcons name="email" size={20} color="#F48120" style={styles.iconInput} />
                                    <Input
                                        placeholder="Email"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        style={styles.input}
                                        inputMode="email"
                                    />
                                </View>
                            )}
                        />
                        {errors.email && (
                            <Text style={{ color: "red", fontSize: 12 }}>
                                {errors.email.message}
                            </Text>
                        )}
                    </View>

                    <View>
                        <Controller
                            control={control}
                            name="password"
                            rules={{ required: "Password wajib diisi" }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <View style={{ position: "relative" }}>
                                    <MaterialIcons name="lock-outline" size={20} color="#F48120" style={styles.iconInput} />
                                    <View style={styles.password}>
                                        <Input
                                            placeholder="Password"
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            style={styles.input}
                                            secureTextEntry={!showPassword}
                                        />

                                        <View style={{ position: "absolute", right: 10, top: 10 }}>
                                            {showPassword ? (
                                                <Feather
                                                    name="eye"
                                                    size={20}
                                                    color="#707070"
                                                    onPress={togglePasswordVisibility}
                                                />
                                            ) : (
                                                <Feather
                                                    name="eye-off"
                                                    size={20}
                                                    color="#707070"
                                                    onPress={togglePasswordVisibility}
                                                />
                                            )}
                                        </View>
                                    </View>
                                </View>
                            )}
                        />
                        {errors.password && (
                            <Text style={{ color: "red", fontSize: 12 }}>
                                {errors.password.message}
                            </Text>
                        )}
                    </View>

                    {errorMessage && (
                        <Text style={{ color: 'red', marginTop: 10 }}>
                            {errorMessage}
                        </Text>
                    )}

                    <TouchableOpacity
                        onPress={handleSubmit(submit)}
                        style={styles.btnLogin}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="white" size={20} />
                        ) : (
                            <Text style={{ color: "white", fontFamily: "Inter_500Medium" }}>Masuk</Text>
                        )}
                    </TouchableOpacity>

                    <Pressable
                        // onPress={() => navigation.navigate("LupaPasswordScreen")}
                        style={{
                            flex: 1,
                            alignItems: "center",
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: "Inter_400Regular",
                                color: "#707070",
                                fontSize: 13,
                            }}
                        >
                            Lupa Password?
                        </Text>
                    </Pressable>
                </View>

                <Image
                    resizeMode="cover"
                    source={require("~/assets/images/Vector.png")}
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: wp("100%"),
                        height: hp("5%"),
                    }}
                />
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        width: 112,
        height: 112,
        alignSelf: "center",
        marginBottom: 20,
    },
    logoText: {
        fontFamily: "Inter_600SemiBold",
        fontSize: 14,
        textAlign: "center",
        color: "#195883",
    },
    formContainer: {
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 20,
        marginTop: hp("18%"),
    },
    input: {
        height: 42,
        width: wp("80%"),
        paddingLeft: 40,
        borderColor: "#979797",
        fontSize: 13,
        fontFamily: "Inter_400Regular",
    },
    password: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    iconInput: {
        position: "absolute",
        top: 10,
        left: 10
    },
    btnLogin: {
        backgroundColor: "#FFA451",
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 20,
    }
});