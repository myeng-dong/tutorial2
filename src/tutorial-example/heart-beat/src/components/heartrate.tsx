import { Blur, Canvas, Fill, Group, Path, fitbox, rect, center, mix } from '@shopify/react-native-skia';
import React, { useEffect, useRef } from 'react';
import { Dimensions, Pressable, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { Easing, useDerivedValue, withTiming } from 'react-native-reanimated';

import { Beat } from './beat';
import { useLoop, useSharedValues } from './animations';
import { getWidthHeight } from '../../../../common/util';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const { width, height } = Dimensions.get('window');
// const src = heart.computeTightBounds();
const bpm = 44;
const duration = (60 * 200) / bpm;

const HeartrateScreen = () => {
    const values = useSharedValues(1, 1);
    const [refreshing, setRefreshing] = React.useState(false);
    const options = {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: true,
    };
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            const val = values[0];
            val.value = 0;
            val.value = withTiming(1, {
                duration: duration * 3,
                easing: Easing.linear,
            });
            const val2 = values[1];
            val2.value = 0;
            val2.value = withTiming(1, {
                duration: duration * 3,
                easing: Easing.linear,
            });
            ReactNativeHapticFeedback.trigger('impactMedium', options);
        }, 500);
    }, []);
    return (
        <View style={{ flex: 1 }}>
            <Canvas style={StyleSheet.absoluteFill}>
                <Fill color="#fff" />
                <Beat progress={values[0]} radius={20} strokeWidth={8} />
                <Beat progress={values[1]} radius={50} strokeWidth={20} />
            </Canvas>
            <ScrollView
                style={{ backgroundColor: 'transparent' }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <View style={{}}>
                    <Pressable
                        style={getWidthHeight(50, 50, { backgroundColor: '#222' })}
                        onPress={async () => {}}></Pressable>
                </View>
            </ScrollView>
        </View>
    );
};
export default HeartrateScreen;
