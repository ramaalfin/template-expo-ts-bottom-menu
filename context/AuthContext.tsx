import React, { createContext, useState, useEffect, useContext } from "react";

// storage
import * as SecureStore from 'expo-secure-store';
import { Href, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextType = {
    isAuthenticated: boolean;
    state: {
        user: any
        accessToken: any
    };
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
    const [state, setState] = useState<{
        user: string | null;
        accessToken: string | null;
    }>({
        user: null,
        accessToken: null,
    });
    const router = useRouter();

    useEffect(() => {
        const checkAuthStatus = async () => {
            const user = await SecureStore.getItemAsync("user");
            const token = await SecureStore.getItemAsync("accessToken");

            if (token) {
                setState({
                    user: user ? JSON.parse(user) : null,
                    accessToken: token ? JSON.parse(token) : null,
                });
                setIsAuthenticated(true);
                router.replace('/(homes)' as Href);
            } else {
                router.replace('/login' as Href);
            }
        };
        checkAuthStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, state }}>
            {children}
        </AuthContext.Provider>
    );
};
