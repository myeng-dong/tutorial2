import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    FlatList,
    Image,
    ListRenderItemInfo,
    NativeScrollEvent,
    NativeScrollPoint,
    NativeSyntheticEvent,
    Platform,
    Pressable,
    Text,
    TouchableOpacity,
    View,
    ViewToken,
} from 'react-native';

import { getDay, getWeeksInMonth, setYear } from 'date-fns';
import ICONS from '../../common/variables/icons';
import { getWidthHeight, widthScale } from '../../common/util';
import { DateTime, PossibleDaysInMonth } from 'luxon';
interface DateProps {
    date: DateTime;
    isToday: boolean;
}

type onViewableItemsChangedInfo = {
    viewableItems: Array<ViewToken<CalendarData>>;
    changed: Array<ViewToken<CalendarData>>;
};

export type WeekData = DateProps[];
export type CalendarData = WeekData[];
export type MonthData = CalendarData[];

export const CustomNewCalMine = () => {
    // 월요일 시작이면 true 일요일 시작이면 false
    const STARTWEEKMONDAY = false;
    const RENDERCOUNT = 4;
    const TODAY: DateTime = DateTime.now();
    const [todayIndex, setTodayIndex] = useState<number>(0);
    const CUSTOMWIDTH = widthScale(375 / 7);
    const [weekTitle, setWeekTitle] = useState<string[]>(
        STARTWEEKMONDAY ? ['월', '화', '수', '목', '금', '토', '일'] : ['일', '월', '화', '수', '목', '금', '토'],
    );
    const [dateData, setDateData] = useState<MonthData | undefined>(undefined);
    const dateFlatList = useRef<FlatList>(null);
    const renderFlag = useRef<boolean>(false);

    const [currentObjectInfo, setCurrentObjectInfo] = useState<onViewableItemsChangedInfo | undefined>(undefined);
    const onViewableItemsChanged = useRef((info: onViewableItemsChangedInfo): void => {
        setCurrentObjectInfo(info);
    });

    function handleScroll(event: NativeSyntheticEvent<NativeScrollEvent>): void {
        const distanceFromStart = event.nativeEvent.contentOffset;
        if (distanceFromStart.x === 0) {
            if (renderFlag.current) return;
            prependData();
            renderFlag.current = true;
        } else {
            renderFlag.current = false;
        }
    }

    const generateCurrentWeek = useCallback(() => {
        return weekTitle.map((item, index) => {
            return (
                <View style={{ width: widthScale(375 / 7), alignItems: 'center' }}>
                    <Text>{item}</Text>
                </View>
            );
        });
    }, []);

    const prependMissingDay = (data: WeekData, currentYear: number, currentMonth: number): WeekData => {
        if (data.length === 7) return data;
        const numberOfMissingDay: number = 7 - data.length;
        let m = currentMonth - 1;
        let y = currentYear;
        if (currentMonth === 1) {
            m = 12;
            y = currentYear - 1;
        }
        const numberOfDayInThePreviousMonth = DateTime.local(y, m).daysInMonth;
        if (numberOfDayInThePreviousMonth !== undefined) {
            for (let i: number = 0; i < numberOfMissingDay; i++) {
                data = [
                    {
                        date: DateTime.local(y, m, numberOfDayInThePreviousMonth - i),
                        isToday: false,
                    },
                    ...data,
                ];
            }
        }
        return data;
    };

    const appendMissingDay = (data: WeekData, currentYear: number, currentMonth: number): WeekData => {
        if (data.length === 7) return data;
        const numberOfMissingDay: number = 7 - data.length;
        let m = currentMonth + 1;
        let y = currentYear;
        if (currentMonth === 12) {
            m = 1;
            y = currentYear + 1;
        }
        for (let i: number = 0; i < numberOfMissingDay; i++) {
            data = [
                ...data,
                {
                    date: DateTime.local(y, m, 1 + i),
                    isToday: false,
                },
            ];
        }
        return data;
    };

    const getDaysInMonth = (month: number, year: number): DateTime[] => {
        const date: DateTime = DateTime.local(year, month);
        const daysInMonth: PossibleDaysInMonth | undefined = date.daysInMonth;
        return Array.from(Array(daysInMonth), (_, x: number) => {
            return DateTime.local(year, month, x + 1);
        });
    };

    const getDaysInMonthSplitByWeek = (month: number, year: number, complete: boolean = true): CalendarData => {
        const dayInMonth: DateTime[] = getDaysInMonth(month, year);
        const result: CalendarData = [];
        let tempArray: WeekData = [];
        dayInMonth.reduce((previousValue: DateTime, currentValue: DateTime, currentIndex: number) => {
            const isToday: boolean =
                currentValue.toLocaleString(DateTime.DATE_SHORT) ===
                DateTime.local().toLocaleString(DateTime.DATE_SHORT);
            tempArray.push({ date: currentValue, isToday });
            if (currentValue.weekday === (STARTWEEKMONDAY ? 7 : 6) || currentIndex === dayInMonth.length - 1) {
                result.push(tempArray);
                tempArray = [];
            }
            return currentValue;
        }, dayInMonth[0]);
        if (complete) {
            result[0] = prependMissingDay(result[0], year, month);
            const lastElem = result.length - 1;
            result[lastElem] = appendMissingDay(result[lastElem], year, month);
        }
        return result;
    };
    // 현재 달
    const getCurrentMonth = (): MonthData => {
        const now: DateTime = DateTime.now();
        const prevMonth = now.month - 1 == 0 ? 12 : now.month - 1;
        const prevYaer = now.month - 1 == 0 ? now.year - 1 : now.year;
        const nextMonth = now.month + 1 == 13 ? 1 : now.month + 1;
        const nextYear = now.month + 1 == 13 ? 1 : now.year;
        return [
            getDaysInMonthSplitByWeek(prevMonth, prevYaer),
            getDaysInMonthSplitByWeek(now.month, now.year),
            getDaysInMonthSplitByWeek(nextMonth, nextYear),
        ];
    };

    // 지정달
    const getCustomMonth = (date: DateTime): MonthData => {
        const now: DateTime = date;
        const prevMonth = now.month - 1 == 0 ? 12 : now.month - 1;
        const prevYaer = now.month - 1 == 0 ? now.year - 1 : now.year;
        const nextMonth = now.month + 1 == 13 ? 1 : now.month + 1;
        const nextYear = now.month + 1 == 13 ? 1 : now.year;
        return [
            getDaysInMonthSplitByWeek(prevMonth, prevYaer),
            getDaysInMonthSplitByWeek(now.month, now.year),
            getDaysInMonthSplitByWeek(nextMonth, nextYear),
        ];
    };

    const renderDays = (week: CalendarData) => {
        return week.map((weeks, weekIdx) => {
            return (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {weeks.map((days, dayIdx) => {
                        return (
                            <Pressable
                                onPress={() => {
                                    console.log(days);
                                }}
                                style={{ width: CUSTOMWIDTH, alignItems: 'center', height: widthScale(50) }}>
                                <View>
                                    <Text>{days.date.day}</Text>
                                </View>
                            </Pressable>
                        );
                    })}
                </View>
            );
        });
    };
    function getAMonth(date: DateTime): MonthData {
        return [getDaysInMonthSplitByWeek(date.month, date.year)];
    }

    function appendData(): void {
        if (dateData === undefined) return;
        renderFlag.current == true;
        const weekLength = dateData[dateData?.length - 1].length;
        const lastDate: DateProps = dateData[dateData?.length - 1][weekLength - 1][6];
        const lastDateMonthSize: PossibleDaysInMonth | undefined = lastDate.date.daysInMonth;
        let nextDateData;
        if (lastDateMonthSize === lastDate.date.day) {
            let d: DateTime = DateTime.local(lastDate.date.year, lastDate.date.month, lastDate.date.day);
            d = d.plus({ month: 1 });
            if (d.month === 12 && d.day === 31) {
                d = d.plus({ year: 1 });
                d = d.set({ month: 1, day: 1 });
            }
            nextDateData = getAMonth(d);
        } else {
            nextDateData = getAMonth(lastDate.date);
        }
        let item = [...dateData, ...nextDateData];
        if (dateData.length == RENDERCOUNT) {
            dateFlatList.current?.scrollToIndex({ index: 2, animated: false });
            setDateData([...item.slice(1, item.length - 1)]);
        } else {
            setDateData([...item]);
        }
        renderFlag.current == false;
    }

    function prependData(): void {
        if (dateData === undefined) return;
        renderFlag.current == true;
        const firstDate: DateProps = dateData[0][0][0];
        let previousDateData;
        if (firstDate.date.day === 1) {
            let d: DateTime = DateTime.local(firstDate.date.year, firstDate.date.month, firstDate.date.day);
            d = d.minus({ month: 1 });
            if (d.month === 1 && d.day === 1) {
                d = d.minus({ year: 1 });
                d = d.set({ month: 12, day: 1 });
            }
            previousDateData = getAMonth(d);
        } else {
            previousDateData = getAMonth(firstDate.date);
        }
        const item = [...previousDateData, ...dateData];
        if (dateFlatList.current !== undefined) {
            if (dateData.length == RENDERCOUNT) {
                setDateData([...item.slice(0, item.length - 2)]);
                dateFlatList.current?.scrollToIndex({ index: 1, animated: false });
            } else {
                setDateData([...item]);
                dateFlatList.current?.scrollToIndex({ index: 1, animated: false });
            }
        }
        renderFlag.current == false;
    }

    useEffect(() => {
        setDateData(getCurrentMonth());
    }, []);

    return (
        <View style={{ paddingTop: widthScale(40) }}>
            {dateData !== undefined && (
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text>
                        {currentObjectInfo?.viewableItems[0]?.item[1][0]?.date.year ?? dateData![0][1][0].date.year}년{' '}
                    </Text>
                    <Text>
                        {currentObjectInfo?.viewableItems[0]?.item[1][0]?.date.month ??
                            dateData![0][1][0].date.plus({ month: 2 }).month}
                        월
                    </Text>
                </View>
            )}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                {generateCurrentWeek()}
            </View>
            {dateData !== undefined && (
                <FlatList
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    ref={dateFlatList}
                    data={dateData}
                    renderItem={(item: ListRenderItemInfo<CalendarData>) => <View>{renderDays(item.item)}</View>}
                    initialScrollIndex={1}
                    getItemLayout={(_, index: number): { length: number; offset: number; index: number } => ({
                        length: widthScale(375),
                        offset: widthScale(375) * index,
                        index,
                    })}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        appendData();
                    }}
                    onMomentumScrollBegin={() => renderFlag.current == true}
                    onScroll={(event: NativeSyntheticEvent<NativeScrollEvent>): void => {
                        handleScroll(event);
                    }}
                    scrollEventThrottle={16}
                    viewabilityConfig={{ itemVisiblePercentThreshold: 40 }}
                    onViewableItemsChanged={onViewableItemsChanged.current}
                />
            )}
            <Pressable
                onPress={() => {
                    setDateData(getCustomMonth(DateTime.now()));
                    dateFlatList.current?.scrollToIndex({ index: 1, animated: false });
                }}
                style={{ alignSelf: 'flex-end' }}>
                <Text>Today</Text>
            </Pressable>
        </View>
    );
};
