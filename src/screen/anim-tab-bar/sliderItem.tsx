import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { getImageFromUri, getWidthHeight, widthScale } from '../../common/util';
import type { ImageSliderProps, ImageUrls } from '../../common/variables/dummys';
import Animated, { Extrapolation, interpolate, useAnimatedStyle, type SharedValue } from 'react-native-reanimated';
interface SliderItemProps {
    item: ImageUrls;
    index: number;
    scrollX: SharedValue<number>;
}
const SliderItem = (props: SliderItemProps) => {
    const { item, index, scrollX } = props;
    const deviceWidth = widthScale(375);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: interpolate(
                        scrollX.value,
                        [(index - 1) * deviceWidth, index * deviceWidth, (index + 1) * deviceWidth],
                        [-deviceWidth * 0.2, 0, deviceWidth * 0.2],
                        Extrapolation.CLAMP,
                    ),
                },
                {
                    scale: interpolate(
                        scrollX.value,
                        [(index - 1) * deviceWidth, index * deviceWidth, (index + 1) * deviceWidth],
                        [0.9, 1, 0.9],
                        Extrapolation.CLAMP,
                    ),
                },
            ],
        };
    }, [scrollX]);

    return (
        <Animated.View style={[styles.itemContainer, animatedStyle]}>
            <FastImage
                source={getImageFromUri(item.url)}
                style={getWidthHeight(300, 500, { borderRadius: widthScale(20) })}
            />
        </Animated.View>
    );
};

export default SliderItem;

const styles = StyleSheet.create({
    itemContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: widthScale(375),
    },
});
