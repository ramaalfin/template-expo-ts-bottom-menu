import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { Href, useRouter } from "expo-router";

// storage
import AsyncStorage from "@react-native-async-storage/async-storage";

// services
import { loginUser, refreshTokenUser } from "~/services/auth";

interface AuthContextType {
    isLoggedIn: boolean;
    isLoading: boolean;
    user: {
        fid: string;
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
    login: (username: string, password: string) => Promise<void>;
    logout: VoidFunction;
    // refreshAccessToken: VoidFunction;
    errorMessage: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    return useContext(AuthContext) as AuthContextType;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({ fid: '' });
    const [tokens, setTokens] = useState({
        access: { token: '', expires: '' },
        refresh: { token: '', expires: '' },
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const loadAuthData = async () => {
            const user = await AsyncStorage.getItem('user');
            // const tokens = await SecureStore.getItem('tokens');

            if (user) {
                setUser(JSON.parse(user));
                // setTokens(JSON.parse(tokens));
                setIsLoggedIn(true);
                router.replace('/(homes)' as Href);
            } else if (isLoggedIn === false) {
                router.replace('/login' as Href);
            }
        };

        loadAuthData();
    }, []);

    const login = async (username: string, password: string) => {
        try {
            setIsLoading(true);
            const response = await loginUser(username, password);

            if (response.status === "00") {
                const user = response.data;
                // const token = response.tokens;

                await AsyncStorage.setItem('user', JSON.stringify(user));

                setUser(user);
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

    // const refreshAccessToken = async () => {
    //     try {
    //         const response = await refreshTokenUser({ refreshToken: tokens.refresh.token });

    //         if (response.code === 200) {
    //             await AsyncStorage.setItem('tokens', JSON.stringify(response.data));
    //             setTokens(response.data);
    //             setIsLoggedIn(true);
    //         } else {
    //             logout();
    //         }
    //     } catch (error) {
    //         logout();
    //     }
    // };

    const logout = async () => {
        try {
            setIsLoading(true);

            await AsyncStorage.removeItem('user');
            // await AsyncStorage.removeItem('tokens');

            setUser({ fid: '' });
            // setTokens({
            //     access: { token: '', expires: '' },
            //     refresh: { token: '', expires: '' },
            // });

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
            // refreshAccessToken,
            isLoading,
            errorMessage,
        }}>
            {children}
        </AuthContext.Provider>
    );
};