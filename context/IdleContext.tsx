import React, { createContext, useState, ReactNode, useEffect, useRef } from "react";
import { Modal, Text, View, Button } from "react-native";
import UserInactivity from "react-native-user-inactivity";
import { useAuth } from "./AuthContext";

interface IdleContextProps {
    isModalVisible: boolean;
    setIsModalVisible: (visible: boolean) => void;
}

export const IdleContext = createContext<IdleContextProps>({
    isModalVisible: false,
    setIsModalVisible: () => { },
});

interface IdleProviderProps {
    children: ReactNode;
}

export const IdleProvider: React.FC<IdleProviderProps> = ({ children }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [userInactivityKey, setUserInactivityKey] = useState(0);
    const { isLoggedIn, logout, refreshAccessToken } = useAuth();
    const modalInactivityTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!isLoggedIn) {
            setIsModalVisible(false);
            setUserInactivityKey(prevKey => prevKey + 1);
        }
    }, [isLoggedIn]);

    const handleInactive = () => {
        if (isLoggedIn) {
            setIsModalVisible(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setUserInactivityKey(prevKey => prevKey + 1);
        clearModalInactivityTimeout();
    };

    const clearModalInactivityTimeout = () => {
        if (modalInactivityTimeoutRef.current) {
            clearTimeout(modalInactivityTimeoutRef.current);
            modalInactivityTimeoutRef.current = null;
        }
    };

    useEffect(() => {
        if (isModalVisible) {
            modalInactivityTimeoutRef.current = setTimeout(() => {
                logout();
                setIsModalVisible(false);
            }, 10000);

        } else {
            clearModalInactivityTimeout();
        }
    }, [isModalVisible]);

    return (
        <IdleContext.Provider value={{ isModalVisible, setIsModalVisible }}>
            {isLoggedIn &&
                <Modal
                    visible={isModalVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={handleCloseModal}
                >
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                        <View style={{ width: 300, padding: 20, backgroundColor: "white", borderRadius: 10 }}>
                            <Text>Anda telah tidak aktif selama 30 detik!</Text>

                            <View>
                                <Button
                                    title="Lanjut"
                                    onPress={() => {
                                        handleCloseModal();
                                        refreshAccessToken();
                                    }}
                                />
                                <Button
                                    title="Tutup"
                                    onPress={() => {
                                        handleCloseModal();
                                        logout();
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            }

            <UserInactivity
                key={userInactivityKey}
                timeForInactivity={30000}
                onAction={handleInactive}
                style={{ flex: 1 }}
            >
                {children}
            </UserInactivity>
        </IdleContext.Provider>
    );
};
