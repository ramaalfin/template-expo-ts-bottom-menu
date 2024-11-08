import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback } from "react";
import { Href, useRouter } from "expo-router";

// storage
import * as SecureStore from 'expo-secure-store';

// services
import { loginUser, refreshTokenUser } from "~/services/auth";

interface AuthContextType {
    isLoggedIn: boolean;
    isLoading: boolean;
    user: {
        id_user: number;
        id_jabatan: number;
        email: string;
        nama: string;
        photo: string;
    };
    tokens: {
        access: {
            token: string;
            expires: string;
        };
        refresh: {
            token: string;
            expires: string;
        };
    }
    login: (email: string, password: string) => Promise<void>;
    logout: VoidFunction;
    refreshAccessToken: VoidFunction;
    errorMessage: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    return useContext(AuthContext) as AuthContextType;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({ id_user: 0, id_jabatan: 0, email: '', nama: '', photo: '' });
    const [tokens, setTokens] = useState({
        access: { token: '', expires: '' },
        refresh: { token: '', expires: '' },
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const loadAuthData = async () => {
            const user = await SecureStore.getItemAsync('user');
            const tokens = await SecureStore.getItemAsync('tokens');

            if (user && tokens) {
                setUser(JSON.parse(user));
                setTokens(JSON.parse(tokens));
                setIsLoggedIn(true);
                router.replace('/(homes)' as Href);
            } else if (isLoggedIn === false) {
                router.replace('/login' as Href);
            }
        };

        loadAuthData();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            setIsLoading(true);

            const response = await loginUser({ email, password });

            if (response.code === 200) {
                const user = response.data.user;
                const token = response.data.tokens;

                await SecureStore.setItemAsync('user', JSON.stringify(user));
                await SecureStore.setItemAsync('tokens', JSON.stringify(token));

                setUser(user);
                setTokens(token);
                setIsLoggedIn(true);
                setErrorMessage(null);

                router.replace('/(homes)' as Href);
            } else {
                setErrorMessage(response.message);
            }
        } catch (error) {
            setErrorMessage("Login failed");
            setIsLoggedIn(false);
        } finally {
            setIsLoading(false);
        }
    };

    const refreshAccessToken = async () => {
        try {
            const response = await refreshTokenUser({ refreshToken: tokens.refresh.token });

            if (response.code === 200) {
                await SecureStore.setItemAsync('tokens', JSON.stringify(response.data));
                setTokens(response.data);
                setIsLoggedIn(true);
            } else {
                logout();
            }
        } catch (error) {
            logout();
        }
    };

    const logout = async () => {
        try {
            setIsLoading(true);

            await SecureStore.deleteItemAsync('user');
            await SecureStore.deleteItemAsync('tokens');

            setUser({ id_user: 0, id_jabatan: 0, email: '', nama: '', photo: '' });
            setTokens({
                access: { token: '', expires: '' },
                refresh: { token: '', expires: '' },
            });

            setIsLoggedIn(false);
        } catch (error) {
            setErrorMessage("Logout failed");
            setIsLoggedIn(false);
        } finally {
            setIsLoading(false);
            router.replace('/login');
        }
    };

    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            user,
            tokens,
            login,
            logout,
            refreshAccessToken,
            isLoading,
            errorMessage,
        }}>
            {children}
        </AuthContext.Provider>
    );
};