import React, { useCallback, useEffect, useState } from 'react';
import { Platform, Pressable, ScrollView, StatusBar, Text, TextInput, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {
    getNavigation,
    getPaddingStyles,
    getRoute,
    getTextStyles,
    getWidthHeight,
    transMoneyFormat,
    widthScale,
} from '../../common/util';
import ICONS from '../../common/variables/icons';

interface CustomProps {
    nickname: string;
    carbonMileageTotal: number;
}

const MarkerCoordinateScreen = () => {
    const MAXMILEGE = 1500;
    const GAP = MAXMILEGE * 0.1;
    const RADIUS = 68.5;
    const route = getRoute<'MarkerCoordinateScreen'>();
    const navigation = getNavigation();
    const insets = useSafeAreaInsets();
    const [farmMoney, setFarmMoney] = useState('');
    const [farmModal, setFarmModal] = useState(false);
    const [farmErrModal, setFarmErrModal] = useState(false);
    const [carbonRank, setCarbonRank] = useState<CustomProps[]>([
        { nickname: '홍길동', carbonMileageTotal: 1500 },
        { nickname: '네이버', carbonMileageTotal: 800 },
        { nickname: '엄준식', carbonMileageTotal: 650 },
    ]);
    const [maxMileage, setMaxMileage] = useState(0);
    const ANDROID = Platform.OS == 'android';
    const numberRgx = /^[0-9]*$/;

    // dummy
    const [money, setMoney] = useState(0);
    const [money2, setMoney2] = useState(0);

    /** 점차 느려지는 count up 함수 */
    const useCountUp = (num: number, duration: number) => {
        // 곡선 형태의 카운팅 함수 ex) 처음엔 빠르게 후반엔 느리게
        const easeOutExpo = (t: number) => {
            return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        };
        const [count, setCount] = useState(0);
        const frameRate = 1000 / 60;
        const totalFrame = Math.round(duration / frameRate);

        useEffect(() => {
            let currentNumber = 0;
            const counter = setInterval(() => {
                const progressRate = easeOutExpo(++currentNumber / totalFrame);
                setCount(Math.round(num * progressRate));

                // 진행 완료시 interval 해제
                if (progressRate === 1) {
                    clearInterval(counter);
                }
            }, frameRate);
        }, [num]);

        return count;
    };
    // !! 예외 !!
    // 마일리지가 동일할 경우 => 닉네임 최대 글자수는 10자인데 얼만큼 밀어야하는가?
    // 접점에 약간의 오차가 있지만 동일마일리지 예외를 처리해야하므로 문제없음? 동일한 공간엔 두개의 마커가 존재할수없음
    const locationPlaceBottom = useCallback(
        (mileage: number) => {
            mileage = mileage > maxMileage ? maxMileage : mileage;
            const scale = maxMileage * 0.2;
            if (mileage < scale) {
                return 26;
            }
            if (mileage <= maxMileage * 0.4 && mileage > scale) {
                const num = 3.2 / scale; // 마일리지 1당의 각도
                const result = 4.8 - num * (mileage - scale);
                return Math.sin(result) * RADIUS + (26 + RADIUS);
            }
            if (mileage < maxMileage * 0.6 && mileage >= scale * 2) {
                return 163;
            }
            if (mileage < maxMileage * 0.8 && mileage >= scale * 3) {
                const num = 3.2 / scale; // 마일리지 1당의 각도
                const result = -1.6 - num * (mileage - scale * 3);
                return Math.sin(result) * RADIUS + (163 + RADIUS);
            }
            if (mileage >= maxMileage * 0.8) {
                return 300;
            }
            return 26;
        },
        [maxMileage],
    );

    const locationPlaceLeft = useCallback(
        (mileage: number) => {
            mileage = mileage > maxMileage ? maxMileage : mileage;
            const scale = maxMileage * 0.2;
            if (mileage <= 0) {
                return 279;
            }
            if (mileage < (maxMileage * 2) / 10) {
                const num = 186 / scale; // 마일리지 1당의 길이
                return 279 - num * mileage < 99 ? 99 : 279 - num * mileage;
            }
            if (mileage < maxMileage * 0.4 && mileage >= scale) {
                const num = 3.2 / scale; // 마일리지 1당의 각도
                const result = 4.8 - num * (mileage - scale);
                return Math.cos(result) * RADIUS + (24.5 + RADIUS);
            }
            if (mileage < maxMileage * 0.6 && mileage >= scale * 2) {
                const num = 146.5 / scale; // 마일리지 1당의 길이
                return 92 + num * (mileage - scale * 2);
            }
            if (mileage < maxMileage * 0.8 && mileage >= scale * 3) {
                const num = 3.2 / scale; // 마일리지 1당의 각도
                const result = -1.6 + num * (mileage - scale * 3);
                return Math.cos(result) * RADIUS + 238.5;
            }
            if (mileage >= maxMileage * 0.8) {
                const num = 212.5 / scale; // 마일리지 1당의 길이
                if (mileage > maxMileage) {
                    return 27;
                }
                return 239.5 - num * (mileage - scale * 4);
            }
            return 279;
        },
        [maxMileage],
    );
    const renderRank = useCallback(
        (rank: CustomProps, index: number) => {
            return (
                <View
                    style={{
                        position: 'absolute',
                        bottom: widthScale(
                            locationPlaceBottom(
                                index == 0
                                    ? maxMileage
                                    : index == carbonRank.length - 1
                                    ? 0
                                    : maxMileage - maxMileage * (index / (carbonRank.length - 1)),
                            ),
                        ),
                        left: widthScale(
                            locationPlaceLeft(
                                index == 0
                                    ? maxMileage
                                    : index == carbonRank.length - 1
                                    ? 0
                                    : maxMileage - maxMileage * (index / (carbonRank.length - 1)),
                            ) - 57,
                        ),
                        alignItems: 'center',
                        width: widthScale(140),
                    }}>
                    <View
                        style={{
                            backgroundColor: '#fff',
                            opacity: 0.8,
                            alignItems: 'center',
                            borderRadius: widthScale(19),
                            paddingHorizontal: widthScale(6),
                            paddingVertical: widthScale(4),
                        }}>
                        <Text style={getTextStyles('SB', '#000', 12, 16, {})}>{rank.nickname}</Text>
                        <Text style={getTextStyles('SB', '#424242', 10, 12)}>{rank.carbonMileageTotal}g</Text>
                    </View>
                    <FastImage source={ICONS.LOCATION_MARKER} style={getWidthHeight(24, 24, {})} />
                </View>
            );
        },
        [maxMileage],
    );
    return (
        <>
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <View
                    style={[
                        { flex: 1, backgroundColor: 'fff' },
                        {
                            paddingTop: insets.top,
                            backgroundColor: '#fff',
                            marginBottom: insets.bottom,
                        },
                    ]}>
                    {Platform.OS == 'ios' && <StatusBar barStyle={'dark-content'} />}
                    <View style={{ flex: 1 }}>
                        <View style={{ backgroundColor: '#F5F5F5', flex: 1 }}>
                            <View>
                                <FastImage source={ICONS.MARKER_BACK_ICON} style={getWidthHeight(375, 404)} />
                                {carbonRank.map(renderRank)}
                            </View>
                            <View style={getPaddingStyles(20, 16)}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        paddingBottom: widthScale(6),
                                    }}></View>
                                <Text style={getTextStyles('RG', '#757575', 12, 18)}>
                                    {`시티팜 유저들의 노력을 통해 1톤 트럭${'\n'} 60,000km 운행 중단 효과를 발생시키고 있습니다`}
                                </Text>
                            </View>
                        </View>
                        <View>
                            <Text>123</Text>
                        </View>
                    </View>
                </View>
            </View>
        </>
    );
};

export default MarkerCoordinateScreen;
