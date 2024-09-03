import React, { useEffect } from 'react';
import { Dimensions, ScrollView, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getTextStyles, widthScale } from '../../common/util';
import CustomCircleChart from '../../components/charts/custom-circle-chart';
import CustomLineChart from '../../components/charts/custom-line-chart';
import CustomBarVerticalChart from '../../components/charts/custom-bar-chart';
import CustomBarHorizontalChart from '../../components/charts/custom-bar-horizontal';

const ChartScreen = () => {
    const insets = useSafeAreaInsets();
    const MAX_DEGREE = 359.9;
    const fadeAnims = useSharedValue(MAX_DEGREE);

    useEffect(() => {
        fadeAnims.value = withTiming(0, { duration: 1350 });
    }, []);
    return (
        <View style={{ flex: 1, marginTop: insets.top, backgroundColor: '#fff' }}>
            <ScrollView>
                <Text style={{ fontSize: widthScale(30), paddingBottom: widthScale(10) }}>Custom</Text>
                {/* Custom Line */}
                <Text
                    style={{
                        fontSize: widthScale(20),
                        backgroundColor: '#d0ee17',
                        color: '#FAFAFA',
                        marginBottom: widthScale(20),
                        padding: widthScale(8),
                    }}>
                    Line 1
                </Text>
                <View
                    style={{
                        alignSelf: 'center',
                        backgroundColor: '#020024',
                        padding: widthScale(20),
                        paddingTop: 0,
                        borderRadius: widthScale(8),
                        marginBottom: widthScale(20),
                    }}>
                    <CustomLineChart
                        width={widthScale(350)}
                        height={widthScale(200)}
                        lineSize={1}
                        lineColor={'#E5E5E5'}
                        innerLineSize={1}
                        dotColor={'#E5E5E5'}
                        dotSize={widthScale(3)}
                        decimal={0}
                        data={[
                            { x: '1월', y: 12 },
                            { x: '2월', y: 20 },
                            { x: '3월', y: 39 },
                            { x: '4월', y: 42 },
                            { x: '5월', y: 15 },
                        ]}
                        xLabelFontStyle={getTextStyles('RG', '#FAFAFA', 12, 14)}
                        yLabelFontStyle={getTextStyles('RG', '#FAFAFA', 10, 12)}
                    />
                </View>
                {/* Custom bar */}
                <Text
                    style={{
                        fontSize: widthScale(20),
                        backgroundColor: '#d0ee17',
                        color: '#FAFAFA',
                        marginBottom: widthScale(20),
                        padding: widthScale(8),
                    }}>
                    Bar Vertical
                </Text>
                <View
                    style={{
                        alignSelf: 'center',
                        backgroundColor: '#fff',
                        padding: widthScale(20),
                        paddingTop: 0,
                        borderRadius: widthScale(8),
                        marginBottom: widthScale(20),
                    }}>
                    <CustomBarVerticalChart
                        width={widthScale(350)}
                        height={widthScale(300)}
                        lineSize={1}
                        lineColor={'#222'}
                        innerLineSize={1}
                        dotColor={'#222'}
                        dotSize={widthScale(5)}
                        decimal={0}
                        data={[
                            { x: '1월', y: 12 },
                            { x: '2월', y: 50 },
                            { x: '3월', y: 40 },
                            { x: '4월', y: 28 },
                            { x: '5월', y: 40 },
                        ]}
                        xLabelFontStyle={getTextStyles('RG', '#222', 12, 14)}
                        yLabelFontStyle={getTextStyles('RG', '#222', 10, 12)}
                    />
                </View>
                {/* Custom Pie */}
                <Text
                    style={{
                        fontSize: widthScale(20),
                        backgroundColor: '#d0ee17',
                        color: '#FAFAFA',
                        marginBottom: widthScale(20),
                        padding: widthScale(8),
                    }}>
                    Pie
                </Text>
                <View>
                    <View
                        style={{
                            alignSelf: 'flex-start',
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingBottom: widthScale(30),
                        }}>
                        <CustomCircleChart circleRadius={40} animation />
                        <View style={{ marginLeft: widthScale(20) }}>
                            <CustomCircleChart circleRadius={40} animation chartStyle="0" />
                        </View>
                    </View>
                </View>

                {/* Custom Line2 */}
                <Text
                    style={{
                        fontSize: widthScale(20),
                        backgroundColor: '#d0ee17',
                        color: '#FAFAFA',
                        marginBottom: widthScale(20),
                        padding: widthScale(8),
                    }}>
                    Line 2
                </Text>
                <View
                    style={{
                        alignSelf: 'center',
                        backgroundColor: '#020024',
                        padding: widthScale(20),
                        paddingTop: 0,
                        borderRadius: widthScale(8),
                        marginBottom: widthScale(20),
                    }}>
                    <CustomLineChart
                        width={widthScale(350)}
                        height={widthScale(200)}
                        lineSize={1}
                        lineColor={'#E5E5E5'}
                        innerLineSize={1}
                        dotColor={'#E5E5E5'}
                        dotSize={widthScale(3)}
                        decimal={0}
                        data={[
                            { x: '1월', y: 0 },
                            { x: '2월', y: 50 },
                            { x: '3월', y: 40 },
                            { x: '4월', y: 28 },
                            { x: '5월', y: 40 },
                        ]}
                        xLabelFontStyle={getTextStyles('RG', '#FAFAFA', 12, 14)}
                        yLabelFontStyle={getTextStyles('RG', '#FAFAFA', 10, 12)}
                    />
                </View>

                {/* Custom Horizontal bar */}
                <Text
                    style={{
                        fontSize: widthScale(20),
                        backgroundColor: '#d0ee17',
                        color: '#FAFAFA',
                        marginBottom: widthScale(20),
                        padding: widthScale(8),
                    }}>
                    Bar Horizontal
                </Text>
                <View
                    style={{
                        alignSelf: 'center',
                        backgroundColor: '#020024',
                        padding: widthScale(20),
                        paddingTop: 0,
                        borderRadius: widthScale(8),
                        marginBottom: widthScale(20),
                    }}>
                    <CustomBarHorizontalChart
                        width={widthScale(350)}
                        height={widthScale(350)}
                        lineSize={1}
                        lineColor={'#E5E5E5'}
                        innerLineSize={1}
                        dotColor={'#E5E5E5'}
                        dotSize={widthScale(5)}
                        decimal={0}
                        data={[
                            { x: '1월', y: 40 },
                            { x: '2월', y: 50 },
                            { x: '3월', y: 40 },
                            { x: '4월', y: 28 },
                            { x: '5월', y: 40 },
                        ]}
                        xLabelFontStyle={getTextStyles('RG', '#FAFAFA', 12, 14)}
                        yLabelFontStyle={getTextStyles('RG', '#FAFAFA', 10, 12)}
                    />
                </View>
                <Text style={{ fontSize: widthScale(30) }}>Library</Text>
                <LineChart
                    data={{
                        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                        datasets: [
                            {
                                data: [
                                    20, 30, 50, 13, 45, 79,
                                    // Math.random() * 100,
                                    // Math.random() * 100,
                                    // Math.random() * 100,
                                    // Math.random() * 100,
                                    // Math.random() * 100,
                                    // Math.random() * 100,
                                ],
                            },
                        ],
                    }}
                    width={Dimensions.get('window').width} // from react-native
                    height={220}
                    yAxisLabel=""
                    yAxisSuffix="월"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                        backgroundColor: '#222',
                        backgroundGradientFrom: '#222',
                        backgroundGradientTo: '#222',
                        decimalPlaces: 0, // optional, defaults to 2dp
                        color: (opacity = 0.8) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 0.2) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 10,
                        },
                        propsForDots: {
                            r: '3',
                            strokeWidth: '0.1',
                            stroke: '#fff',
                        },
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 10,
                    }}
                />

                {/* <View style={{ marginVertical: widthScale(100), alignItems: 'center' }}> */}
                {/* <Svg height="100" width="100">
                        <Rect x="0" y="0" width="100" height="100" fill="black" />
                        <Circle cx="50" cy="50" r="30" fill="yellow" />

                        <Path d="M105,20 a20,20 0 1,1 50,25" fill="none" stroke="#4286f0" stroke-width="8" />
                    </Svg>
                    <Svg style={{}}>
                        <Path
                            d="M29.098,28.786C27.821,30.146,26.012,31,24,31c-3.866,0-7-3.134-7-7c0-3.866,3.134-7,7-7V4
          C13.002,4,4,13.002,4,24c0,10.998,9.002,20,20,20c5.777,0,10.998-2.444,14.557-6.332L29.098,28.786z"
                        />
                        <Path d="M24,4v13c3.866,0,7,3.134,7,7h13C44,13.002,34.998,4,24,4z" />
                        <Path d="M31,24c0,2.232-1.048,4.216-2.676,5.497l8.009,10.226C40.995,36.062,44,30.387,44,24H31z" />
                    </Svg> */}

                {/* <Svg>
                        <Path d={getArc(testData)} />
                    </Svg> */}
                {/* <View
                        style={getWidthHeight(100, 100, {
                            borderWidth: 1,
                            borderRadius: widthScale(50),
                            flexShrink: 1,
                        })}>
                        <View
                            style={getWidthHeight(98, 98, {
                                backgroundColor: 'red',
                                flexShrink: 1,
                            })}></View>
                    </View> */}
                {/* </View> */}
            </ScrollView>
        </View>
    );
};

export default ChartScreen;
