import React, { useCallback, useState } from 'react';
import { Animated, NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getTextStyles, getWidthHeight, widthScale } from '../../common/util';
import { useSharedValue } from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const BannerScrollViewScreen = () => {
    const insets = useSafeAreaInsets();

    const scrollOffsetValue = useSharedValue<number>(0);
    const [onTop, setOnTop] = useState(true);

    // scrolling: 현재 스크롤의 위치입니다. 초기값은 0입니다.
    const scrolling = React.useRef(new Animated.Value(0)).current;
    // height: 스크롤의 위치에 따른 Header 컴포넌트의 높이값입니다. 스크롤 위치가 0부터 200으로 변함에 따라 높이값은 200부터 50으로 비율에 맞춰 변합니다.
    const height = scrolling.interpolate({
        inputRange: [0, 0],
        outputRange: [375, 0],
        extrapolate: 'clamp',
    });

    const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        // position: 스크롤의 y축(세로) 위치입니다.
        const position = e.nativeEvent.contentOffset.y;

        scrolling.setValue(position);
    };

    return (
        <View style={{ flex: 1, marginTop: insets.top }}>
            <View style={getWidthHeight(375, 100, { backgroundColor: 'green' })} />
            <View
                style={getWidthHeight(375, 375, {
                    backgroundColor: 'red',
                    position: 'absolute',
                    top: widthScale(100),
                })}></View>
            <ScrollView>
                <Pressable
                    style={{}}
                    onPress={() => {
                        console.log('good');
                    }}>
                    <Text>123</Text>
                </Pressable>
                <View style={getWidthHeight(375, 1000, { backgroundColor: 'blue', marginTop: widthScale(375) })}>
                    <Text>123</Text>
                </View>
            </ScrollView>
        </View>
    );
};

export default BannerScrollViewScreen;
