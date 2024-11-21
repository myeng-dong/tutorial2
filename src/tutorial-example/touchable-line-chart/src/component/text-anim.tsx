import React from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withDecay, type SharedValue } from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import AnimatedText from './animated-text';
import { useFont } from '@shopify/react-native-skia';

const SIZE = 120;
const BOUNDARY_OFFSET = 50;
interface ShareProps {
    shareValue: SharedValue<number>;
}
export default function TextAnim(props: ShareProps) {
    const { shareValue } = props;
    const offset = useSharedValue<number>(0);
    const width = useSharedValue<number>(0);
    // const font = useFont(require('./src/assets/fonts/Roboto-Regular.ttf'), 88);

    const onLayout = (event: LayoutChangeEvent) => {
        width.value = event.nativeEvent.layout.width;
    };

    const pan = Gesture.Pan()
        .onChange((event) => {
            // highlight-next-line
            offset.value += event.changeX;
        })
        .onFinalize((event) => {
            // highlight-start
            offset.value = withDecay({
                velocity: event.velocityX,
                rubberBandEffect: true,
                clamp: [-(width.value / 2) + SIZE / 2 + BOUNDARY_OFFSET, width.value / 2 - SIZE / 2 - BOUNDARY_OFFSET],
            });
            // highlight-end
        });

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateX: offset.value }],
    }));

    return (
        <GestureHandlerRootView style={styles.container}>
            <View onLayout={onLayout} style={styles.wrapper}>
                <GestureDetector gesture={pan}>
                    {/* <AnimatedText selectedValue={shareValue} font={font} /> */}
                </GestureDetector>
            </View>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        height: SIZE,
        width: SIZE,
        backgroundColor: '#b58df1',
        borderRadius: 20,
        // cursor: 'grab',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
