import { StyleSheet } from "react-native";
import { Input } from "./ui/input";
import { useState } from "react";

interface SearchBarProps {
    onSearch: (keyword: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [keyword, setKeyword] = useState<string>("");

    const handleSearch = (keyboard: string) => {
        setKeyword(keyboard);
        onSearch(keyboard);
    }

    return (
        <Input
            placeholder="Cari Nama Nasabah"
            style={styles.input}
            value={keyword}
            onChangeText={handleSearch}
            clearButtonMode="always"
        />
    )
}

const styles = StyleSheet.create({
    input: {
        marginTop: 5,
        marginBottom: 15,
        marginHorizontal: 15,
        borderColor: "#979797",
        fontSize: 13,
        fontFamily: "Inter_400Regular"
    },
});