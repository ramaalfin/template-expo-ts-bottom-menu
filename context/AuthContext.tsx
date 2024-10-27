import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";

// storage
import * as SecureStore from 'expo-secure-store';

import { useRouter } from "expo-router";

// services
import { loginUser } from "~/services/auth";
import { Href } from "expo-router";

interface AuthContextType {
    isAuthenticated: boolean;
    user: {
        id_user: number;
        email: string;
        nama: string;
        photo: string;
    }
    accessToken: {
        token: string;
        expires: string;
    }
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    isLoading: boolean;
    errorMessage: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState({
        id_user: 0,
        email: '',
        nama: '',
        photo: '',
    });
    const [accessToken, setAccessToken] = useState({
        token: '',
        expires: '',
    });
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const loadAuthData = async () => {
            const storedUser = await SecureStore.getItemAsync('user');
            const storedToken = await SecureStore.getItemAsync('accessToken');

            if (storedUser && storedToken) {
                setUser(JSON.parse(storedUser));
                setAccessToken(JSON.parse(storedToken));
                setIsAuthenticated(true);
                router.replace('/(homes)' as Href);
            } else {
                router.replace('/login' as Href);
            }
        };

        loadAuthData();
    }, []);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            // Ganti `loginUser` dengan fungsi autentikasi API Anda
            const response = await loginUser({ email, password });

            if (response.code === 200) {
                const user = response.data.user;
                const token = response.data.tokens.access;

                // Simpan data user dan token ke Secure Store
                await SecureStore.setItemAsync('user', JSON.stringify(user));
                await SecureStore.setItemAsync('accessToken', JSON.stringify(token));

                // Update state
                setUser(user);
                setAccessToken(token);
                setIsAuthenticated(true);
                setErrorMessage(null);

                // Redirect ke halaman utama
                router.replace('/(homes)' as Href);
            } else {
                setErrorMessage(response.message);
            }
        } catch (error) {
            setErrorMessage("Login failed");
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            await SecureStore.deleteItemAsync('user');
            await SecureStore.deleteItemAsync('accessToken');

            // Reset state
            setUser({
                id_user: 0,
                email: '',
                nama: '',
                photo: '',
            });
            setAccessToken({
                token: '',
                expires: '',
            });
            setIsAuthenticated(false);

            // Redirect ke halaman login
            router.replace('/login');
        } catch (error) {
            setErrorMessage("Logout failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, accessToken, login, logout, isLoading, errorMessage }}>
            {children}
        </AuthContext.Provider>
    );
};