import React, { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';

import { getWidthHeight, widthScale } from '../../common/util';
import WeekCalendarComponent from './custom-week-component';

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
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: widthScale(16),
                    paddingVertical: widthScale(24),
                }}>
                <Pressable onPress={() => {}}>
                    <Image source={require('../../assets/icons/arrow-left-icon.png')} style={getWidthHeight(24, 24)} />
                </Pressable>
                <Text style={{ textAlign: 'center' }}>{dateString}</Text>
                <Pressable onPress={() => {}}>
                    <Image
                        source={require('../../assets/icons/arrow-left-icon.png')}
                        style={getWidthHeight(24, 24, { transform: [{ rotate: '180deg' }] })}
                    />
                </Pressable>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                {['일', '월', '화', '수', '목', '금', '토'].map((y, date) => {
                    return (
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: widthScale(13), color: [0, 6].includes(date) ? '#4448' : '#444' }}>
                                {y}
                            </Text>
                        </View>
                    );
                })}
            </View>
            <WeekCalendarComponent month={getMonth} getNowDateString={getNowDateString} />
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
                {/* <Text>{`${selYear}년 ${selMonth}월 ${selDay}일`}</Text> */}
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
