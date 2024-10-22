import { useState, useCallback, useMemo, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView, TouchableOpacity } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { format, isEqual, isSameMonth, isToday, startOfDay, parseISO, isSameDay } from 'date-fns';

// icons
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Href, Link, useRouter } from 'expo-router';
import { formatDate } from '~/utils/formatDate';

export const CalendarComponent = ({ activities }: any) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const today = new Date().toISOString().split('T')[0]; // Mendapatkan tanggal hari ini (yyyy-mm-dd)

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

    // useEffect untuk mengatur background color pada hari ini
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

    return (
        <View style={styles.activityContainer}>
            <TouchableOpacity
                style={styles.activityContent}
                onPress={() => navigation.push(
                    `/update/${activity.id}` as Href<"/update/1">
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
                    <Text style={styles.titleText}>jumpa di rumah</Text>
                    <Text style={styles.textDesc}>Bpk/Ibu Syahril Gunawan</Text>
                    <Text style={styles.textDesc}>Jenis: Visit</Text>
                    <Text style={styles.date}>31 Januari 2024 10:00 - 12:00</Text>
                    <Text style={styles.textDesc}>Status: <Text style={{ color: "green" }}>Sudah dilakukan</Text></Text>
                    <Text style={styles.textDesc}>Approval: <Text style={{ color: "green" }}>approve</Text></Text>
                    <Text style={styles.textDesc}>Approve By: M. Yasir</Text>
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
        color: '#000',
    },
});