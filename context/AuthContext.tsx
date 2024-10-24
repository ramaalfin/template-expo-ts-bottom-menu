import React, { createContext, useState, useEffect, useContext } from "react";

// storage
import * as SecureStore from 'expo-secure-store';
import { Href, useRouter } from "expo-router";
import { loginUser, logoutUser } from "~/services/auth";

type AuthContextType = {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    token: string | null;
    isLoading: boolean;
    errorMessage: string | null;
};

// context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkAuthStatus = async () => {
            const token = await SecureStore.getItemAsync("accessToken");
            if (token) {
                setIsAuthenticated(true);
                router.replace('/(homes)' as Href);
            } else {
                router.replace('/login' as Href);
            }
        };
        checkAuthStatus();
    }, []);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const response = await loginUser({ email, password });

            if (response.data.tokens.access) {
                const accessToken = JSON.stringify(response.data.tokens.access);
                await SecureStore.setItemAsync("accessToken", accessToken);
                setIsAuthenticated(true);
                setErrorMessage(null);
                router.replace('/(homes)' as Href);
            } else {
                setErrorMessage(response?.data.message);
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
            const accessToken = await SecureStore.getItemAsync("accessToken");

            if (accessToken) {
                await logoutUser(accessToken);
                await SecureStore.deleteItemAsync("accessToken");
                setIsAuthenticated(false);
                setErrorMessage(null);
                router.replace('/login' as Href);
            }
        } catch (error) {
            setErrorMessage("Logout failed");
        } finally {
            setIsLoading(false);
        }
    };

    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const fetchToken = async () => {
            const storedToken = await SecureStore.getItemAsync("accessToken");
            setToken(storedToken);
        };
        fetchToken();
    }, []);

    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage(null);
                setIsLoading(false);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [errorMessage]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, token, errorMessage, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
