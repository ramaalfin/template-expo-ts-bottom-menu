import { useEffect, useState } from "react";
import * as Location from 'expo-location';

export const useLocation = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [longitude, setLongitude] = useState<number | null>(null);
    const [latitude, setLatitude] = useState<number | null>(null);

    const getUserLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            setErrorMessage('Permission to access location was denied');
            return;
        }

        let { coords } = await Location.getCurrentPositionAsync({});

        if (coords) {
            const { longitude, latitude } = coords;
            setLongitude(longitude);
            setLatitude(latitude);

            await Location.reverseGeocodeAsync({ latitude, longitude });
        }
    }

    useEffect(() => {
        getUserLocation();
    }, []);

    return { errorMessage, longitude, latitude };
}

