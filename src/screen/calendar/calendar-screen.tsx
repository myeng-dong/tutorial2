import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomCalendarScrollView } from '../../components/calendars/custom-calendar-scrollview';
import { CustomWeekCalendar } from '../../components/calendars/custom-week-calendar';
import { getWidthHeight, widthScale } from '../../common/util';
import { CustomNewCalMine } from '../../components/calendars/custom-new-calendar';

const MyCalendarScreen = () => {
    const insets = useSafeAreaInsets();
    const [state, setState] = useState(-1);
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#fff',
                marginTop: insets.top,
                padding: widthScale(state == -1 ? 20 : 0),
            }}>
            {state !== -1 && (
                <Pressable
                    onPress={() => {
                        setState(-1);
                    }}>
                    <Text style={{ fontSize: widthScale(20) }}>목록으로 돌아가기</Text>
                </Pressable>
            )}
            {state == -1 && (
                <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Pressable
                        style={getWidthHeight(164, 175, {
                            padding: widthScale(20),
                            marginVertical: widthScale(10),
                            backgroundColor: 'rgba(235, 238, 250, 0.96)',
                            borderRadius: widthScale(10),
                            justifyContent: 'center',
                        })}
                        onPress={() => {
                            setState(0);
                        }}>
                        <Text
                            style={{
                                fontSize: widthScale(18),
                                fontWeight: 700,
                                textAlign: 'center',
                            }}>
                            {`WeekCalendar`}
                        </Text>
                    </Pressable>
                    <Pressable
                        style={getWidthHeight(164, 175, {
                            padding: widthScale(20),
                            marginVertical: widthScale(20),
                            backgroundColor: 'rgba(235, 238, 250, 0.96)',
                            borderRadius: widthScale(10),
                            justifyContent: 'center',
                        })}
                        onPress={() => {
                            setState(1);
                        }}>
                        <Text
                            style={{
                                fontSize: widthScale(18),
                                fontWeight: 700,
                                textAlign: 'center',
                            }}>
                            {`CustomCalendarScrollView`}
                        </Text>
                    </Pressable>
                </View>
            )}
            {state == 0 && <CustomWeekCalendar />}
            {state == 1 && <CustomNewCalMine />}
            {/* <CustomCalMine /> */}
        </View>
    );
};

export default MyCalendarScreen;
