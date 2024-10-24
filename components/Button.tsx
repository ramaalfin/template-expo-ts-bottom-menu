import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

type ButtonProps = {
    onPress: () => void;
    isLoading: boolean;
    children: string;
    style?: object;
};

export default function Button({
    onPress,
    children,
    isLoading,
    style,
    ...props
}: ButtonProps) {
    return (
        <TouchableOpacity
            disabled={isLoading}
            onPress={onPress}
            style={{
                backgroundColor: "#FFA451",
                padding: 10,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                opacity: isLoading ? 0.5 : 1,
                ...style,
            }}
            {...props}
        >
            {isLoading ? (
                <ActivityIndicator color="white" size={20} />
            ) : (
                <Text style={{ color: "white", fontFamily: "Inter_500Medium" }}>{children}</Text>
            )}
        </TouchableOpacity>
    )
}