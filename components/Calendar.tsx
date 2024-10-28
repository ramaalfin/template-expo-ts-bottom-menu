import { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView, TouchableOpacity } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { isEqual, isSameMonth, isToday, parseISO, isSameDay } from 'date-fns';

// icons
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Href, useRouter } from 'expo-router';
import { formatDate } from '~/utils/formatDate';

export const CalendarComponent = ({ activities }: any) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const today = new Date().toISOString().split('T')[0];

    const onDayPress = useCallback((day: any) => {
        setSelectedDate(day.dateString);
    }, []);

    LocaleConfig.locales.id = {
        monthNames: [
            'Januari',
            'Februari',
            'Maret',
            'April',
            'Mei',
            'Juni',
            'Juli',
            'Agustus',
            'September',
            'Oktober',
            'November',
            'Desember',
        ],
        monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
        dayNames: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
        dayNamesShort: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
        today: 'Hari ini',
    };

    LocaleConfig.defaultLocale = 'id';

    const selectedDayActivities = selectedDate ?
        activities.filter((activity: any) =>
            isSameDay(parseISO(activity.date), parseISO(selectedDate)
            )) : [];

    useEffect(() => {
        setSelectedDate(today);
    }, []);

    const renderArrow = (direction: any) => {
        return direction === 'left' ? (
            <MaterialIcons name="keyboard-arrow-left" size={18} color="#000" />
        ) : (
            <MaterialIcons name="keyboard-arrow-right" size={18} color="#000" />
        );
    };

    return (
        <>
            <Calendar
                initialDate={today}
                minDate={new Date(new Date().setFullYear(new Date().getFullYear() - 5)).toISOString().split('T')[0]}
                maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 5)).toISOString().split('T')[0]}
                monthFormat={'yyyy MM'}
                renderArrow={renderArrow}
                firstDay={7}
                onPressArrowLeft={(subtractMonth: any) => {
                    subtractMonth();
                    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)));
                }}
                onPressArrowRight={(addMonth: any) => {
                    addMonth();
                    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)));
                }}
                renderHeader={(date: { toString: (arg0: string) => any }) => {
                    const header = date.toString('MMMM yyyy');
                    const [month, year] = header.split(' ');

                    return (
                        <View style={styles.header}>
                            <Text style={styles.headerText}>{month}</Text>
                            <Text style={styles.headerText}>{year}</Text>
                        </View>
                    );
                }}
                dayComponent={({ date }: any) => {
                    const isCurrentMonth = isSameMonth(parseISO(date.dateString), currentMonth);
                    const isSelected = isEqual(selectedDate, date.dateString);
                    const isCurrentDay = isToday(parseISO(date.dateString));

                    const isWeekend = new Date(date.dateString).getDay() === 0 || new Date(date.dateString).getDay() === 6;
                    const markedDate = activities.find(
                        (activity: any) => isSameDay(parseISO(activity.date), parseISO(date.dateString))
                    );

                    return (
                        <Pressable
                            onPress={() => onDayPress(date)}
                        >
                            <View
                                style={[
                                    styles.dayContainer,
                                    isSelected && styles.selectedContainer,
                                    !isSelected && isCurrentDay && styles.todayContainer,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.dayText,
                                        isSelected && isCurrentMonth && { color: '#fff' },
                                        !isSelected && isCurrentMonth && { color: '#000' },
                                        !isSelected && isCurrentMonth && isWeekend && styles.weekendText,
                                        !isSelected && !isCurrentMonth && { color: '#999' },
                                        !isSelected && isCurrentDay && styles.todayText,
                                    ]}
                                >
                                    {date.day}
                                </Text>

                                {markedDate && markedDate.occurrences > 0 && (
                                    <View style={styles.markedDateContainer}>
                                        <Text style={styles.markedDateText}>
                                            {markedDate.occurrences}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        </Pressable>
                    );
                }}
                style={{
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20
                }}
                theme={{
                    textSectionTitleColor: '#000',
                    dayTextColor: '#000',
                    todayTextColor: '#fff',
                    selectedDayBackgroundColor: '#F48120',
                    selectedDayTextColor: '#fff',
                    monthTextColor: '#000',
                    arrowColor: '#000',
                    textDayFontFamily: 'Inter_400Regular',
                    textMonthFontFamily: 'Inter_600SemiBold',
                    textDayHeaderFontFamily: 'Inter_400Regular',
                }}
            />

            <View style={{ paddingVertical: 10, paddingHorizontal: 15 }}>
                <Text style={{ fontFamily: "Inter_400Regular", fontSize: 15, color: '#000' }}>
                    Daftar Pengingat {formatDate(selectedDate)}
                </Text>

                <View style={{ height: hp("23%") }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {selectedDayActivities.length > 0 ? (
                            selectedDayActivities.map((activity: any, index: number) => (
                                <Activity key={index} activity={activity} />
                            ))
                        ) : (
                            <Text style={{ fontFamily: "Inter_400Regular", fontSize: 15, color: '#999' }}>
                                Tidak ada aktivitas
                            </Text>
                        )}
                    </ScrollView>
                </View>
            </View>
        </>
    )
}

export default CalendarComponent;

const Activity = ({ activity }: any) => {
    const navigation = useRouter();

    const jamMulai = activity.jam_mulai.split("T")[1].split(":")[0] + ":" + activity.jam_mulai.split("T")[1].split(":")[1];
    const jamSelesai = activity.jam_selesai.split("T")[1].split(":")[0] + ":" + activity.jam_selesai.split("T")[1].split(":")[1];

    return (
        <View style={styles.activityContainer}>
            <TouchableOpacity
                style={styles.activityContent}
                onPress={() => navigation.push(
                    `/update/${activity.id}` as Href<"/update/[id]">
                )}
            >
                <View style={{
                    backgroundColor: "#FBCE0D",
                    width: '3%',
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                }}
                ></View>
                <View style={{ padding: 10, width: "90%" }}>
                    <Text style={styles.titleText}>{activity.application}</Text>
                    <Text style={styles.textDesc}>Bpk/Ibu {activity.nama}</Text>
                    <Text style={styles.textDesc}>Jenis: {activity.jenis}</Text>
                    <Text style={styles.date}>
                        {`${formatDate(activity.date)} ${jamMulai} - ${jamSelesai}`}
                    </Text>
                    <Text style={styles.textDesc}>Status:{" "}
                        <Text style={{
                            color: activity.status === "Belum Dilakukan" ? "#D02827" : "#2E7D32",
                        }}>{activity.status}</Text>
                    </Text>
                    <Text style={styles.textDesc}>Approval: {activity.status_approval === null ? "-" : activity.status_approval}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
        gap: 10,
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    dayContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        position: 'relative',
    },
    todayContainer: {
        backgroundColor: "#666",
        borderRadius: 10,
        color: '#fff',
    },
    selectedContainer: {
        backgroundColor: '#F48120',
        borderRadius: 10,
    },
    dayText: {
        fontSize: 14,
        color: '#000',
        position: 'relative',
    },
    weekendText: {
        color: 'red',
    },
    todayText: {
        color: '#fff',
    },
    todayTextSelected: {
        color: '#fff',
    },
    markedDateContainer: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        backgroundColor: '#D02827',
        borderRadius: 5,
        paddingHorizontal: 3.5,
        paddingVertical: 2,
    },
    markedDateText: {
        fontSize: 10,
        color: '#fff',
        fontWeight: 'bold',
    },

    activityContainer: {
        backgroundColor: "#FAFAFA",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    activityContent: {
        marginTop: hp("2%"),
        borderRadius: 10,
        backgroundColor: "#fff",
        flexDirection: "row",
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        marginVertical: 3,
    },
    titleText: {
        fontFamily: "Inter_400Regular",
        fontSize: 15,
        color: '#000',
        marginBottom: 5,
    },
    textDesc: {
        fontFamily: "Inter_400Regular",
        fontSize: 13,
        color: '#000',
    },
    date: {
        fontSize: 12,
        color: '#999',
    },
});