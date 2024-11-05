import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { widthScale } from '../../common/util';
import { ImageSlider } from '../../common/variables/dummys';
import SliderItem from './sliderItem';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

const AnimTabBarScreen = () => {
    const insets = useSafeAreaInsets();
    const scrollX = useSharedValue(0);
    const onScrollHandler = useAnimatedScrollHandler({
        onScroll: (e) => {
            scrollX.value = e.contentOffset.x;
        },
    });
    return (
        <View style={{ flex: 1 }}>
            <Animated.FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                style={{}}
                data={ImageSlider}
                renderItem={({ item, index }) => {
                    return <SliderItem item={item} index={index} scrollX={scrollX} />;
                }}
                onScroll={onScrollHandler}
                removeClippedSubviews={false}
            />
        </View>
    );
};

export default AnimTabBarScreen;
