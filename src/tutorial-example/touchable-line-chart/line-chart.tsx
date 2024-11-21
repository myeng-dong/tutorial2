/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { data } from './src/data/data';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';
import { useFont } from '@shopify/react-native-skia';
import LineChart from './src/component/linechart';
import AnimatedText from './src/component/animated-text';
import { widthScale } from '../../common/util';
import TextAnim from './src/component/text-anim';

const LineChartScreen = () => {
    const CHART_MARGIN = widthScale(20);
    const CHART_HEIGHT = widthScale(230);
    const { width: CHART_WIDTH } = useWindowDimensions();
    const [selectedDate, setSelectedDate] = useState<string>('Total');
    const selectedValue = useSharedValue(0);
    const font = useFont(require('./src/assets/fonts/Roboto-Regular.ttf'), 88);

    if (!font) {
        return null;
    }

    return (
        <>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <SafeAreaView style={styles.container}>
                    {/* <AnimatedText selectedValue={selectedValue} font={font} /> */}
                    <View style={{ flex: 1, overflow: 'hidden' }}>
                        <LineChart
                            data={data}
                            chartHeight={CHART_HEIGHT}
                            chartWidth={widthScale(335)}
                            chartMargin={CHART_MARGIN}
                            setSelectedDate={setSelectedDate}
                            selectedValue={selectedValue}
                        />
                    </View>
                </SafeAreaView>
            </GestureHandlerRootView>
        </>
    );
};

export default LineChartScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        paddingHorizontal: widthScale(20),
    },
    text: {
        color: 'white',
        fontSize: 28,
        textAlign: 'center',
        fontFamily: 'Roboto-Regular',
    },
});
