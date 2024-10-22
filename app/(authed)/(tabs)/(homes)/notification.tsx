import { useState } from "react";

import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// icons
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

// components
import Topbar from "~/components/TopBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';

export default function NotificationScreen() {
    const [value, setValue] = useState('semua');

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F48120" }}>
            {/* Header */}
            <Topbar titleBar="Notifikasi" />
            {/* header */}

            <View style={styles.container}>
                <Tabs
                    value={value}
                    onValueChange={setValue}
                    style={styles.tabs}
                >
                    <TabsList
                        style={styles.tabHeader}
                    >
                        <TabsTrigger
                            value='semua'
                            style={{
                                flex: 1,
                                shadowColor: "transparent",
                                borderBottomWidth: value === 'semua' ? 3 : 0,
                                borderBottomColor: value === 'semua' ? "#FBCE0D" : "transparent",
                            }}
                        >
                            <Text style={styles.tabHeaderText}>Semua</Text>
                        </TabsTrigger>
                        <TabsTrigger
                            value='approve'
                            style={{
                                flex: 1,
                                shadowColor: "transparent",
                                borderBottomWidth: value === 'approve' ? 3 : 0,
                                borderBottomColor: value === 'approve' ? "#316A8F" : "transparent",
                            }}
                        >
                            <Text style={styles.tabHeaderText}>Approve</Text>
                        </TabsTrigger>
                        <TabsTrigger
                            value='reject'
                            style={{
                                flex: 1,
                                shadowColor: "transparent",
                                borderBottomWidth: value === 'reject' ? 3 : 0,
                                borderBottomColor: value === 'reject' ? "#D02827" : "transparent",
                            }}
                        >
                            <Text style={styles.tabHeaderText}>Reject</Text>
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value='semua' style={styles.tabContent}>
                        <View style={styles.contentContainer}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View style={styles.contentItem}>
                                    <View style={{
                                        backgroundColor: "#316A8F",
                                        width: '3%',
                                        borderTopLeftRadius: 10,
                                        borderBottomLeftRadius: 10,
                                    }}
                                    ></View>
                                    <AntDesign name="checkcircle" size={28} color="#316A8F" style={{ alignSelf: "center", paddingHorizontal: 10 }} />
                                    <View style={{ width: "90%", paddingVertical: 10 }}>
                                        <Text style={styles.date}>31 Januari 2024 WIB</Text>
                                        <Text style={styles.titleText}>Pengajuan Pembiayaan</Text>
                                        <Text style={styles.textDesc}>Alamat: Bogor</Text>
                                        <Text style={styles.textDesc}>Approval: <Text style={{ color: "green" }}>approve</Text></Text>
                                    </View>
                                </View>
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
                                        <Text style={styles.date}>31 Januari 2024 WIB</Text>
                                        <Text style={styles.titleText}>Pengajuan Pembiayaan</Text>
                                        <Text style={styles.textDesc}>Alamat: Bogor</Text>
                                        <Text style={styles.textDesc}>Approval: <Text style={{ color: "green" }}>approve</Text></Text>
                                    </View>
                                </View>
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
                                        <Text style={styles.date}>31 Januari 2024 WIB</Text>
                                        <Text style={styles.titleText}>Pengajuan Pembiayaan</Text>
                                        <Text style={styles.textDesc}>Alamat: Bogor</Text>
                                        <Text style={styles.textDesc}>Approval: <Text style={{ color: "green" }}>approve</Text></Text>
                                    </View>
                                </View>
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
                                        <Text style={styles.date}>31 Januari 2024 WIB</Text>
                                        <Text style={styles.titleText}>Pengajuan Pembiayaan</Text>
                                        <Text style={styles.textDesc}>Alamat: Bogor</Text>
                                        <Text style={styles.textDesc}>Approval: <Text style={{ color: "green" }}>approve</Text></Text>
                                    </View>
                                </View>
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
                                        <Text style={styles.date}>31 Januari 2024 WIB</Text>
                                        <Text style={styles.titleText}>Pengajuan Pembiayaan</Text>
                                        <Text style={styles.textDesc}>Alamat: Bogor</Text>
                                        <Text style={styles.textDesc}>Approval: <Text style={{ color: "green" }}>approve</Text></Text>
                                    </View>
                                </View>
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
                                        <Text style={styles.date}>31 Januari 2024 WIB</Text>
                                        <Text style={styles.titleText}>Pengajuan Pembiayaan</Text>
                                        <Text style={styles.textDesc}>Alamat: Bogor</Text>
                                        <Text style={styles.textDesc}>Approval: <Text style={{ color: "green" }}>approve</Text></Text>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    </TabsContent>
                    <TabsContent value='approve' style={styles.tabContent}>
                        <View style={styles.contentContainer}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View style={styles.contentItem}>
                                    <View style={{
                                        backgroundColor: "#316A8F",
                                        width: '3%',
                                        borderTopLeftRadius: 10,
                                        borderBottomLeftRadius: 10,
                                    }}
                                    ></View>
                                    <AntDesign name="checkcircle" size={28} color="#316A8F" style={{ alignSelf: "center", paddingHorizontal: 10 }} />
                                    <View style={{ width: "90%", paddingVertical: 10 }}>
                                        <Text style={styles.date}>31 Januari 2024 WIB</Text>
                                        <Text style={styles.titleText}>Pengajuan Pembiayaan</Text>
                                        <Text style={styles.textDesc}>Alamat: Bogor</Text>
                                        <Text style={styles.textDesc}>Approval: <Text style={{ color: "green" }}>approve</Text></Text>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    </TabsContent>
                    <TabsContent value='reject' style={styles.tabContent}>
                        <View style={styles.contentContainer}>
                            <ScrollView showsVerticalScrollIndicator={false}>
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
                                        <Text style={styles.date}>31 Januari 2024 WIB</Text>
                                        <Text style={styles.titleText}>Pengajuan Pembiayaan</Text>
                                        <Text style={styles.textDesc}>Alamat: Bogor</Text>
                                        <Text style={styles.textDesc}>Approval: <Text style={{ color: "green" }}>approve</Text></Text>
                                    </View>
                                </View>
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
                                        <Text style={styles.date}>31 Januari 2024 WIB</Text>
                                        <Text style={styles.titleText}>Pengajuan Pembiayaan</Text>
                                        <Text style={styles.textDesc}>Alamat: Bogor</Text>
                                        <Text style={styles.textDesc}>Approval: <Text style={{ color: "green" }}>approve</Text></Text>
                                    </View>
                                </View>
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
                                        <Text style={styles.date}>31 Januari 2024 WIB</Text>
                                        <Text style={styles.titleText}>Pengajuan Pembiayaan</Text>
                                        <Text style={styles.textDesc}>Alamat: Bogor</Text>
                                        <Text style={styles.textDesc}>Approval: <Text style={{ color: "green" }}>approve</Text></Text>
                                    </View>
                                </View>
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
                                        <Text style={styles.date}>31 Januari 2024 WIB</Text>
                                        <Text style={styles.titleText}>Pengajuan Pembiayaan</Text>
                                        <Text style={styles.textDesc}>Alamat: Bogor</Text>
                                        <Text style={styles.textDesc}>Approval: <Text style={{ color: "green" }}>approve</Text></Text>
                                    </View>
                                </View>
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
                                        <Text style={styles.date}>31 Januari 2024 WIB</Text>
                                        <Text style={styles.titleText}>Pengajuan Pembiayaan</Text>
                                        <Text style={styles.textDesc}>Alamat: Bogor</Text>
                                        <Text style={styles.textDesc}>Approval: <Text style={{ color: "green" }}>approve</Text></Text>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    </TabsContent>
                </Tabs>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAFAFA",
        marginTop: hp("1%"),
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    tabs: {
        width: '100%',
        maxWidth: 400,
        marginHorizontal: 'auto',
        flexDirection: 'column',
        gap: 1.5,
    },
    tabHeader: {
        flexDirection: 'row',
        backgroundColor: "#fff",
        borderBottomColor: "#707070",
        borderBottomWidth: .3,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        height: 60,
    },
    tabHeaderText: {
        fontFamily: "Inter_400Regular",
        fontSize: 14,
        color: "#707070",
        marginTop: 10,
        marginBottom: 10,
    },
    tabContent: {
        paddingHorizontal: 10,
    },
    contentContainer: {
        height: hp("74%"),
    },
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
});
