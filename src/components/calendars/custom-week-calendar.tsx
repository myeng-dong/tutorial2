import React, { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';

import { getWidthHeight, widthScale } from '../../common/util';
import { WeekCalendarComponent } from './custom-week-component';

export const CustomWeekCalendar = () => {
    let today = new Date();
    const month_today = today.getMonth();
    const [getMonth, setGetMonth] = useState(month_today);
    const [page, setPage] = useState(0);
    const [dateString, setDateString] = useState<string>('');

    const goToday = () => {
        console.log('today');
    };
    const getNowDateString = (text: string) => {
        setDateString(text);
    };
    return (
        <View style={{ flex: 1, width: widthScale(375) }}>
            <WeekCalendarComponent />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Pressable
                    onPress={() => {
                        goToday();
                    }}
                    style={getWidthHeight(100, 100, {
                        backgroundColor: '#FAFAFA',
                        alignItems: 'center',
                        justifyContent: 'center',
                    })}>
                    <Text style={{ fontWeight: 600 }}>오늘로 이동!</Text>
                </Pressable>
                <Pressable
                    onPress={() => {}}
                    style={getWidthHeight(100, 100, {
                        backgroundColor: '#FAFAFA',
                        alignItems: 'center',
                        justifyContent: 'center',
                    })}>
                    <Text style={{ fontWeight: 600 }}>선택 날짜 출력</Text>
                </Pressable>
            </View>
        </View>
    );
};
