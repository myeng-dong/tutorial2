import React, { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { widthScale } from '../../common/util';
import { startOfDay, startOfWeek, weeksToDays } from 'date-fns';
interface CustomProps {
    month: number;
    getNowDateString: (text: string) => void;
}
const WeekCalendarComponent = (props: CustomProps) => {
    const { month, getNowDateString } = props;
    let today = new Date();
    const year_today = today.getFullYear();
    const month_today = today.getMonth();
    const date_today = today.getDate();
    const [getMonth, setGetMonth] = useState(month_today);
    const [getYear, setGetYear] = useState(year_today);
    const [selDay, setSelDay] = useState(date_today);
    const [selMonth, setSelMonth] = useState(month_today + 1);
    const [selYear, setSelYear] = useState(year_today);
    const [nowWeek, setNowWeek] = useState(startOfWeek(new Date()).getDate());
    const scrollRef = useRef<ScrollView>(null);
    useEffect(() => {}, []);

    const [page, setPage] = useState(0);
    const [monthPage, setMonthPage] = useState(0);
    const [dateText, setDateText] = useState('');
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
    const todayMonth = [0, 1, 2, 3, 4, 5, 6]
        .map((week, y) => dates.slice(y * 7, (y + 1) * 7))
        .filter((x) => x.length !== 0);

    const dateString = todayMonth.map((week, y) => {
        return `${getMonth + 1}월 ${y + 1}주`;
    });

    const firstDateIndex = dates.indexOf(1); // 이번달 1일의 인덱스 찾기

    useEffect(() => {
        getNowDateString(
            `${getYear}.${getMonth + 1}.${todayMonth[page][0]} ~ ${getYear}.${getMonth + 1}.${todayMonth[page][6]}`,
        );
    }, [page]);
    useEffect(() => {
        setPage(todayMonth.findIndex((x) => x.indexOf(nowWeek) != -1));
        scrollRef.current?.scrollTo({ y: widthScale(375) * 4 });
        todayMonth.pop();
    }, []);
    return (
        <ScrollView
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            style={{ width: widthScale(375), flex: 1 }}
            onScroll={(event) => {
                setPage(Math.round(event.nativeEvent.contentOffset.x / widthScale(375)));
            }}>
            {todayMonth.map((week, y) => {
                return (
                    <View style={{ flexDirection: 'row', width: widthScale(375) }}>
                        {week.map((date, i) => {
                            // // 오늘인지
                            // let isToday = year_today == getYear && month_today == month && date == date_today;
                            // // 비활성 날짜(첫일 말일 전달 후달 일자)
                            // const noSelDate = (y == 0 && i < firstDateIndex) || (y > 2 && date < 7);
                            // // 해당 달 활성날짜 중 이미 지난날짜
                            // const disableNowMonthDate =
                            //     year_today == getYear && month_today == month && date < date_today;
                            // const disableLaterMonth = year_today >= getYear && month_today > month;
                            // // 고른날짜
                            // let isSelect = selDay == date && !noSelDate && selMonth == month + 1 && selYear == getYear;
                            // // 비활성 날짜 및 주말 적용
                            // const condition =
                            //     noSelDate || disableNowMonthDate || disableLaterMonth
                            //         ? '#9E9E9E'
                            //         : i == 0 || i == 6
                            //         ? 'red'
                            //         : '#222';
                            return (
                                <Pressable
                                    onPress={() => {
                                        // if (noSelDate && date < 7) {
                                        //     return nextMonth();
                                        // }
                                        // if (noSelDate && date > 20) {
                                        //     if (disableNowMonthDate) return;
                                        //     if (disableLaterMonth) return;
                                        //     return prevMonth();
                                        // }
                                        // if (disableNowMonthDate) return;
                                        // if (disableLaterMonth) return;
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
                                            // backgroundColor: isSelect
                                            //     ? '#006934'
                                            //     : isToday
                                            //     ? noSelDate
                                            //         ? 'transparent'
                                            //         : '#E6F0EB'
                                            //     : 'transparent',
                                        }}>
                                        <Text
                                            style={{
                                                fontWeight: 600,
                                                // color: isSelect ? '#fff' : condition,
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
            })}
        </ScrollView>
    );
};

export default WeekCalendarComponent;
