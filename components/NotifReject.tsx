import { StyleSheet, Text, View } from "react-native"

// utils
import { formatDate } from "~/utils/formatDate";

// icons
import AntDesign from '@expo/vector-icons/AntDesign';

interface NotifRejectProps {
    data: {
        id_sts_approval: number,
        tanggal: string,
        mst_funding: {
            alamat: string,
            nama: string,
        },
        mst_sts_approval: {
            sts_approval: string,
        }
    }
}

export default function NotifReject({ data }: NotifRejectProps) {
    if (data.id_sts_approval !== 3) return null;

    return (
        <View style={styles.contentItem}>
            <View style={{
                backgroundColor: "#D02827",
                width: '3%',
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
            }}
            ></View>
            <AntDesign name="exclamationcircle" size={28} color="#D02827" style={{ alignSelf: "center", paddingHorizontal: 10 }} />
            <View style={{ width: "90%", paddingVertical: 10 }}>
                <Text style={styles.date}>{formatDate(data.tanggal)}</Text>
                <Text style={styles.titleText}>{data.mst_funding.nama}</Text>
                <Text style={styles.textDesc}>Alamat: {data.mst_funding.alamat}</Text>
                <Text style={styles.textDesc}>
                    Approval: <Text style={{ color: "#D02827" }}>{data.mst_sts_approval.sts_approval}</Text>
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    contentItem: {
        marginVertical: 5,
        borderRadius: 10,
        backgroundColor: "#fff",
        flexDirection: "row",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    },
    titleText: {
        fontFamily: "Inter_600SemiBold",
        fontSize: 16,
        paddingTop: 2
    },
    textDesc: {
        fontFamily: "Inter_400Regular",
        fontSize: 13,
        paddingVertical: 2,
        color: "#707070"
    },
    date: {
        fontFamily: "Inter_400Regular",
        fontSize: 11,
        color: "#707070",
    },
})