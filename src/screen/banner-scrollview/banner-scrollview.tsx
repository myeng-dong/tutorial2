import React, { useState, useRef } from 'react';
import { Dimensions, FlatList, PixelRatio, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Canvas, Circle, Group, Image, Mask, SkImage, makeImageFromView } from '@shopify/react-native-skia';
import { useSharedValue } from 'react-native-reanimated';
import CustomButton from '../../components/skia-component/custom-button';
import skiaData from '../../common/variables/dummys';
import { getTextStyles, widthScale } from '../../common/util';
import CustomLineChart from '../../components/charts/custom-line-chart';
import CustomLineChartReb, { type RebLineProps } from '../../components/chart-modual/reb-line-chart';
interface ScrollViewProps {
    color: string;
}

const BannerScrollViewScreen = () => {
    const insets = useSafeAreaInsets();
    const [selectedDate, setSelectedDate] = useState<RebLineProps | undefined>();
    const selectedValue = useSharedValue(0);

    return (
        <View style={{ flex: 1, marginTop: insets.top, backgroundColor: '#fff' }}>
            <View
                style={{
                    alignSelf: 'center',
                    backgroundColor: '#FFF',
                    paddingTop: widthScale(20),
                    borderRadius: widthScale(8),
                    paddingBottom: widthScale(15),
                    paddingLeft: widthScale(10),
                    marginBottom: widthScale(20),
                }}>
                <CustomLineChartReb
                    width={widthScale(335)}
                    height={widthScale(200)}
                    lineSize={1}
                    lineColor={'#FC0E85'}
                    innerLineSize={1}
                    dotColor={'#FC0E85'}
                    dotSize={widthScale(3)}
                    decimal={0}
                    data={[
                        { x: '8/19', y: 12, label: '8/19' },
                        { x: '8/20', y: 20, label: '8/20' },
                        { x: '8/21', y: 39, label: '8/21' },
                        { x: '8/22', y: 90, label: '8/22' },
                        { x: '8/23', y: 15, label: '8/23' },
                        { x: '8/24', y: 15, label: '8/24' },
                        { x: '8/25', y: 30, label: '8/25' },
                    ]}
                    xLabelFontStyle={getTextStyles('RG', '#757575', 14, 16, {
                        paddingTop: widthScale(4),
                    })}
                    yLabelFontStyle={getTextStyles('RG', '#757575', 13, 15)}
                    chartBackgroundColor={'#fff'}
                    chartFillColor={'#fff'}
                    selectedValue={selectedValue}
                    setSelectedDate={setSelectedDate}
                />
                {selectedDate != undefined && (
                    <Text
                        style={getTextStyles(
                            'MD',
                            '#222',
                            16,
                            20,
                        )}>{`날짜 : ${selectedDate?.label} 수치 : ${selectedDate?.y}`}</Text>
                )}
            </View>
        </View>
    );
};

export default BannerScrollViewScreen;
