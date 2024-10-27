import { useEffect, useState } from "react";
import * as Location from 'expo-location';

export const useLocation = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [latitude, setLatitude] = useState<number | null>(null);

    const getUserLocation = async () => {
        try {
            // Meminta izin lokasi
            let { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                setErrorMessage('Permission to access location was denied');
                return;
            }

            // Mendapatkan posisi pengguna dengan pengaturan akurasi
            let location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High, // Gunakan akurasi tinggi
            });

            if (location && location.coords) {
                const { longitude, latitude } = location.coords;
                setLongitude(longitude);
                setLatitude(latitude);
            } else {
                setErrorMessage('Unable to retrieve location coordinates');
            }
        } catch (error) {
            setErrorMessage('Failed to get location');
        }
    };

    useEffect(() => {
        getUserLocation();
    }, []);

    return { errorMessage, longitude, latitude };
};
