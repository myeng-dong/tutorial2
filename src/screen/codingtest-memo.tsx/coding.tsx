import React, { useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withDecay } from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const SIZE = 120;
const BOUNDARY_OFFSET = 50;
const CodingTestScreen = () => {
    const insets = useSafeAreaInsets();
    // const [value, setValue] = useState('');
    // const textRef = useRef<TextInput>(null);
    const offset = useSharedValue<number>(0);
    const width = useSharedValue<number>(0);

    const onLayout = (event: LayoutChangeEvent) => {
        width.value = event.nativeEvent.layout.width;
    };

    const pan = Gesture.Pan()
        .onTouchesDown(() => {})
        .onChange((event) => {
            offset.value += event.changeX;
        })
        .onFinalize((event) => {
            offset.value = withDecay({
                velocity: event.velocityX,
                rubberBandEffect: true,
                clamp: [-(width.value / 2) + SIZE / 2 + BOUNDARY_OFFSET, width.value / 2 - SIZE / 2 - BOUNDARY_OFFSET],
            });
        });

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateX: offset.value }],
    }));

    return (
        <View
            style={{
                flex: 1,
                paddingTop: insets.top,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fff',
            }}>
            <GestureHandlerRootView style={styles.container}>
                <View onLayout={onLayout} style={styles.wrapper}>
                    <GestureDetector gesture={pan}>
                        <Animated.View style={[styles.box, animatedStyles]} />
                    </GestureDetector>
                </View>
            </GestureHandlerRootView>
        </View>
    );
};

export default CodingTestScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    wrapper: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        height: SIZE,
        width: SIZE,
        backgroundColor: '#b58df1',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
// let firstArr = Array.from({ length: count }).map((_, y) => y + 1);
// let lastArr = Array.from({ length: count })
//     .map((_, y) => count + count + y - 1)
//     .reverse();
// 정수를 배열로 바꾸고 ((정수 * 2 - 1)를 정수 - 1 만큼 진행 후 정수 (정수 + 1 만큼 뒤에 붙힌 뒤 해당값저장)) 이걸 정수 - 1 만큼 반복 후 맨앞에 초기 배열 concat하면 끝
// value.map((x,y)=>{
//     return x.
// })
// 첫번째 arr
// result[0] = firstArr;
// result[result.length - 1] = lastArr;
// if (height == 0) {
//     return width + 1;
// }
// if(width != count - 1)
// if (width == 0) {
//     return maxCount - height + 1;
// }
// if (width == count - 1) {
//     return count + height;
// }
// if (width == count - 2) {
//     return maxCount + count - 3 + height;
// }
// if (width == count - 2) {
//     return count + height;
// }
// if (width == count - 3) {
//     return maxCount + count - 3 + height;
// }
// if (height > count / 2) {
//     // 16 + 3 +
//     return maxCount + count - 3 + height;
// }
// if (height <= count / 2) {
//     return maxCount - height + 1 + width;
// }
