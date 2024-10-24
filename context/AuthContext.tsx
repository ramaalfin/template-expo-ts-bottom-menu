import React, { createContext, useState, useEffect, useContext } from "react";

// storage
import * as SecureStore from 'expo-secure-store';
import { Href, useRouter } from "expo-router";
import { loginUser, logoutUser } from "~/services/auth";

type AuthContextType = {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    user: object | null;
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

            if (response.code === 200) {
                const user = JSON.stringify(response.data.user);
                const accessToken = JSON.stringify(response.data.tokens.access);
                await SecureStore.setItemAsync("accessToken", accessToken);
                await SecureStore.setItemAsync("user", user);

                setIsAuthenticated(true);
                setErrorMessage(null);
                router.replace('/(homes)' as Href);
            } else {
                setErrorMessage(response?.message);
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
                await SecureStore.deleteItemAsync("user");
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
    const [user, setUser] = useState<object | null>(null);

    useEffect(() => {
        const fetchToken = async () => {
            const storedToken = await SecureStore.getItemAsync("accessToken");
            setToken(storedToken ? JSON.parse(storedToken) : null);
        };
        fetchToken();
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            const storedUser = await SecureStore.getItemAsync("user");
            setUser(storedUser ? JSON.parse(storedUser) : null);
        };
        fetchUser();
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
        <AuthContext.Provider value={{ isAuthenticated, login, logout, user, token, errorMessage, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
