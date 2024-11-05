import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// context
import { useAuth } from "~/context/AuthContext";

// services
import { nofitication } from "~/services/trx/activity";

// components
import Topbar from "~/components/TopBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import NotifApprove from "~/components/NotifApprove";
import NotifReject from "~/components/NotifReject";
import NotifWaiting from "~/components/NotifWaiting";

interface NotificationProps {
    id_activity: number,
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

export default function NotificationScreen() {
    const { user, tokens } = useAuth();
    const [notifications, setNotifications] = useState<NotificationProps[]>([]);
    const [value, setValue] = useState('semua');

    useEffect(() => {
        const fetchData = async () => {
            const response = await nofitication({ token: tokens.access.token, idUser: user.id_user });

            if (response.data.code === 200) {
                // sort by date
                setNotifications(response.data.data.sort((a: NotificationProps, b: NotificationProps) => {
                    return new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime();
                }));
            } else {
                setNotifications([]);
            }
        }

        fetchData();
    }, [tokens.access.token, user.id_user]);

    return (
        <View style={{ flex: 1, backgroundColor: "#F48120" }}>
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
                            value='waiting'
                            style={{
                                flex: 1,
                                shadowColor: "transparent",
                                borderBottomWidth: value === 'waiting' ? 3 : 0,
                                borderBottomColor: value === 'waiting' ? "orange" : "transparent",
                            }}
                        >
                            <Text style={styles.tabHeaderText}>Waiting</Text>
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
                                {notifications.length > 0 ? notifications.map((item: NotificationProps) => (
                                    item.mst_sts_approval.sts_approval === 'Approved' ? (
                                        <NotifApprove key={`approve-${item.id_activity}`} data={item} />
                                    ) : item.mst_sts_approval.sts_approval === 'Reject' ? (
                                        <NotifReject key={`reject-${item.id_activity}`} data={item} />
                                    ) : (
                                        <NotifWaiting key={`waiting-${item.id_activity}`} data={item} />
                                    )
                                )) : <Text style={{ textAlign: "center", marginTop: 20 }}>Tidak ada notifikasi</Text>}
                            </ScrollView>
                        </View>
                    </TabsContent>
                    <TabsContent value='approve' style={styles.tabContent}>
                        <View style={styles.contentContainer}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {notifications.length > 0 ? notifications.map((item) => (
                                    <NotifApprove key={item.id_activity} data={item} />
                                )) : <Text style={{ textAlign: "center", marginTop: 20 }}>Tidak ada notifikasi</Text>}
                            </ScrollView>
                        </View>
                    </TabsContent>
                    <TabsContent value='reject' style={styles.tabContent}>
                        <View style={styles.contentContainer}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {notifications.length > 0 ? notifications.map((item) => (
                                    <NotifReject key={item.id_activity} data={item} />
                                )) : <Text style={{ textAlign: "center", marginTop: 20 }}>Tidak ada notifikasi</Text>}
                            </ScrollView>
                        </View>
                    </TabsContent>
                    <TabsContent value='waiting' style={styles.tabContent}>
                        <View style={styles.contentContainer}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {notifications.length > 0 ? notifications.map((item) => (
                                    <NotifWaiting key={item.id_activity} data={item} />
                                )) : <Text style={{ textAlign: "center", marginTop: 20 }}>Tidak ada notifikasi</Text>}
                            </ScrollView>
                        </View>
                    </TabsContent>
                </Tabs>
            </View>
        </View>
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
