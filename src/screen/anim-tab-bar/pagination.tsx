import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import type { ImageUrls } from '../../common/variables/dummys';
import Animated, { Extrapolation, interpolate, useAnimatedStyle, type SharedValue } from 'react-native-reanimated';
import { widthScale } from '../../common/util';
interface PaginationProps {
    items: ImageUrls[];
    paginationIdx: number;
    scrollX: SharedValue<number>;
}
const Pagination = (props: PaginationProps) => {
    const { items, paginationIdx, scrollX } = props;
    const deviceWidth = widthScale(375);
    return (
        <View style={{ alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', position: 'absolute', bottom: widthScale(40) }}>
                {items.map((x, index) => {
                    const pgDotAnimatedStyle = useAnimatedStyle(() => {
                        const dotWidth = interpolate(
                            scrollX.value,
                            [(index - 1) * deviceWidth, index * deviceWidth, (index + 1) * deviceWidth],
                            [8, 20, 8],
                            Extrapolation.CLAMP,
                        );
                        return {
                            width: dotWidth,
                        };
                    });
                    return (
                        <Animated.View
                            style={[
                                styles.dot,
                                {
                                    backgroundColor: [0, 1, items.length - 1, items.length - 2].includes(index)
                                        ? '#fff'
                                        : index === paginationIdx
                                        ? '#222'
                                        : '#E5E5E5',
                                },
                                pgDotAnimatedStyle,
                            ]}
                        />
                    );
                })}
            </View>
        </View>
    );
};

export default Pagination;

const styles = StyleSheet.create({
    dot: {
        width: widthScale(7),
        height: widthScale(7),
        marginHorizontal: widthScale(2),
        borderRadius: widthScale(4),
    },
});
