import { Image, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import React, { useState } from 'react';
import { OnboardingData } from '../data/data';
import { getWidthHeight, widthScale } from '../../../../common/util';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

type Props = {
    item: OnboardingData;
};

const RenderItem = ({ item }: Props) => {
    const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
    const [flag, setFlag] = useState(false);
    const animatedScale = useAnimatedStyle(() => {
        return { transform: [{ scale: flag ? 1.05 : 1 }] };
    });

    return (
        <View
            style={[
                styles.itemContainer,
                {
                    width: SCREEN_WIDTH,
                    height: SCREEN_HEIGHT,
                    backgroundColor: item.backgroundColor,
                },
            ]}>
            <Pressable
                onPressIn={() => {
                    setFlag(true);
                }}
                onPressOut={() => {
                    setFlag(false);
                }}>
                <Animated.View
                    style={[
                        {
                            borderRadius: widthScale(50),
                        },
                        animatedScale,
                    ]}>
                    <Image source={item.image} style={getWidthHeight(375, 400, { borderRadius: widthScale(50) })} />
                </Animated.View>
            </Pressable>
            <Text style={[styles.itemText, { color: item.textColor }]}>{item.text}</Text>
        </View>
    );
};

export default RenderItem;

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 40,
    },
    itemText: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 44,
        fontWeight: 'bold',
        marginHorizontal: 20,
    },
});
