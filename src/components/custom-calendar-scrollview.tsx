import React, { useCallback, useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { getDay, getDaysInMonth, getWeeksInMonth, setYear } from 'date-fns';
import ICONS from '../common/variables/icons';
import { getWidthHeight, widthScale } from '../common/util';

export const CustomCalendarScrollView = () => {
    // const { ARROW_LEFT_ICON } = ICONS;
    let today = new Date();
    const year_today = today.getFullYear();
    const month_today = today.getMonth();
    const date_today = today.getDate();
    const [getMonth, setGetMonth] = useState(month_today);
    const [getYear, setGetYear] = useState(year_today);
    const [selDay, setSelDay] = useState(date_today);
    const [selMonth, setSelMonth] = useState(month_today + 1);
    const [selYear, setSelYear] = useState(year_today);

    const [page, setPage] = useState(0);

    const renderCalendar = useCallback(
        (month: number) => {
            // 지난달 마지막날과 이번달 마지막날
            const prevLast = new Date(getYear, month, 0); // 2024 03 31 토
            const thisLast = new Date(getYear, month + 1, 0); // 2024 04 30

            const PLDate = prevLast.getDate(); // 지난달 마지막 날
            const PLDay = prevLast.getDay(); // 지난달 마지막 요일
            const TLDate = thisLast.getDate(); // 이번달 마지막 날
            const TLDay = thisLast.getDay(); // 이번달 마지막 요일

            const prevDates = [];
            const thisDates = [...Array(TLDate + 1).keys()].slice(1);
            const nextDates = [];
            // 달력 합치기 -----
            if (PLDay !== 6) {
                for (let i = 0; i < PLDay + 1; i++) {
                    prevDates.unshift(PLDate - i); // 지난달 날짜들 넣어줌
                }
            }
            for (let i = 1; i < 7 - TLDay; i++) {
                nextDates.push(i); // 다음달 날짜를 넣어줌
            }
            const dates = prevDates.concat(thisDates, nextDates); // 지난달 이번달 다음달 합쳐주기
            const firstDateIndex = dates.indexOf(1); // 이번달 1일의 인덱스 찾기
            return [0, 1, 2, 3, 4, 5, 6].map((week, y) => {
                return (
                    <View style={{ flexDirection: 'row' }}>
                        {dates.slice(y * 7, (y + 1) * 7).map((date, i) => {
                            // 오늘인지
                            let isToday = year_today == getYear && month_today == month && date == date_today;
                            // 비활성 날짜(첫일 말일 전달 후달 일자)
                            const noSelDate = (y == 0 && i < firstDateIndex) || (y > 2 && date < 7);
                            // 해당 달 활성날짜 중 이미 지난날짜
                            const disableNowMonthDate =
                                year_today == getYear && month_today == month && date < date_today;
                            const disableLaterMonth = year_today >= getYear && month_today > month;
                            // 고른날짜
                            let isSelect = selDay == date && !noSelDate && selMonth == month + 1 && selYear == getYear;
                            // 비활성 날짜 및 주말 적용
                            const condition =
                                noSelDate || disableNowMonthDate || disableLaterMonth
                                    ? '#9E9E9E'
                                    : i == 0 || i == 6
                                    ? 'red'
                                    : '#222';
                            return (
                                <Pressable
                                    onPress={() => {
                                        if (noSelDate && date < 7) {
                                            return nextMonth();
                                        }
                                        if (noSelDate && date > 20) {
                                            if (disableNowMonthDate) return;
                                            if (disableLaterMonth) return;
                                            return prevMonth();
                                        }
                                        if (disableNowMonthDate) return;
                                        if (disableLaterMonth) return;
                                        setSelDay(date);
                                        setSelMonth(month + 1);
                                        setSelYear(getYear);
                                    }}
                                    style={[
                                        {
                                            flex: 1,
                                            alignItems: 'center',
                                            height: widthScale(50),
                                            justifyContent: 'center',
                                        },
                                    ]}>
                                    <View
                                        style={{
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: widthScale(35),
                                            height: widthScale(35),
                                            borderRadius: widthScale(35),
                                            overflow: 'hidden',
                                            backgroundColor: isSelect
                                                ? '#006934'
                                                : isToday
                                                ? noSelDate
                                                    ? 'transparent'
                                                    : '#E6F0EB'
                                                : 'transparent',
                                        }}>
                                        <Text
                                            style={{
                                                fontWeight: 600,
                                                color: isSelect ? '#fff' : condition,
                                                fontSize: 14,
                                            }}>
                                            {date}
                                        </Text>
                                    </View>
                                </Pressable>
                            );
                        })}
                    </View>
                );
            });
        },
        [getYear, selDay],
    );
    const prevMonth = () => {
        // if (year_today >= getYear && month_today + 1 >= getMonth + 1) return;
        // if (getMonth == 0) {
        //     setGetYear(getYear - 1);
        //     setGetMonth(11);
        // } else {
        //     setGetMonth(getMonth - 1);
        // }
    };
    const nextMonth = () => {
        // if (getYear - 1 > year_today) return;
        // if (getMonth == 11) {
        //     setGetYear(getYear + 1);
        //     setGetMonth(0);
        // } else {
        //     setGetMonth(getMonth + 1);
        // }
    };
    const goToday = () => {
        setGetMonth(month_today);
        setGetYear(year_today);
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
                <Pressable
                    onPress={() => {
                        prevMonth();
                    }}>
                    <Image source={require('../assets/icons/arrow-left-icon.png')} style={getWidthHeight(24, 24)} />
                </Pressable>
                <Text style={{ textAlign: 'center' }}>{`${
                    month_today + Math.ceil(page) + 1 > 12 ? getYear + 1 : getYear
                }년 ${
                    month_today + Math.ceil(page) + 1 > 12.99
                        ? month_today + Math.ceil(page) + 1 - 12
                        : month_today + Math.ceil(page) + 1
                    // month_today + Math.ceil(page) + 1
                }월`}</Text>
                <Pressable
                    onPress={() => {
                        nextMonth();
                    }}>
                    <Image
                        source={require('../assets/icons/arrow-left-icon.png')}
                        style={getWidthHeight(24, 24, { transform: [{ rotate: '180deg' }] })}
                    />
                </Pressable>
            </View>
            <View style={{ flexDirection: 'row' }}>
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
            <ScrollView
                horizontal
                pagingEnabled
                style={{ width: widthScale(375) }}
                onScroll={(event) => {
                    setPage(Math.round(event.nativeEvent.contentOffset.x / widthScale(375)));
                }}>
                {/* <View style={{ width: widthScale(375) }}>{renderCalendar(getMonth)}</View> */}
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((_, index) => {
                    return <View style={{ width: widthScale(375) }}>{renderCalendar(month_today + index)}</View>;
                })}
            </ScrollView>

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
                <Text>{`${selYear}년 ${selMonth}월 ${selDay}일`}</Text>
                <Pressable
                    onPress={() => {
                        console.log(selYear, selMonth, selDay);
                    }}
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
