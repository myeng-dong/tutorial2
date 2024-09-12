import React, { useEffect, useState } from 'react';
import { Dimensions, Pressable, ScrollView, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getTextStyles, getWidthHeight, makeRandomColor, widthScale } from '../../common/util';
import CustomCircleChart from '../../components/charts/custom-circle-chart';
import CustomLineChart from '../../components/charts/custom-line-chart';
import CustomBarVerticalChart from '../../components/charts/custom-bar-chart';
import CustomBarHorizontalChart from '../../components/charts/custom-bar-horizontal';
import CustomLineChartOriginal from '../../components/charts/custom-line-original';
import { dummyArr } from '../../common/variables/dummys';

const ChartScreen = () => {
    const insets = useSafeAreaInsets();
    const MAX_DEGREE = 359.9;
    const fadeAnims = useSharedValue(MAX_DEGREE);
    const [select, setSelect] = useState(0);

    useEffect(() => {
        fadeAnims.value = withTiming(0, { duration: 1350 });
        console.log(dummyArr.map(makeRandomColor));
    }, []);

    const renderName = (name: string) => {
        return <Text>{name}</Text>;
    };
    const renderColorCircle = (color: string) => {
        return <View style={getWidthHeight(4, 4, { backgroundColor: color, borderRadius: widthScale(4) })} />;
    };
    return (
        <View style={{ flex: 1, marginTop: insets.top, backgroundColor: '#fff' }}>
            <View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingHorizontal: widthScale(20),
                    }}>
                    <Text style={{ fontSize: widthScale(30), paddingBottom: widthScale(10) }}>Custom</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Pressable
                            onPress={() => {
                                setSelect(1);
                            }}
                            style={({ pressed }) => [
                                { opacity: pressed ? 0.7 : 1 },
                                { paddingHorizontal: widthScale(10) },
                            ]}>
                            <Text style={{ color: '#009DFE' }}>line</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => {
                                setSelect(0);
                            }}
                            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}>
                            <Text style={{ color: '#009DFE' }}>pie, bar</Text>
                        </Pressable>
                    </View>
                </View>
                {/* Custom Line2 */}
                {select == 1 && (
                    <View>
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
                                backgroundColor: '#fff',
                                padding: widthScale(20),
                                paddingTop: 0,
                                borderRadius: widthScale(8),
                                marginBottom: widthScale(20),
                            }}>
                            <CustomLineChart
                                animation={false}
                                width={widthScale(350)}
                                height={widthScale(200)}
                                lineSize={1}
                                lineColor={'#4AA8D8'}
                                innerLineSize={1}
                                dotColor={'#4AA8D8'}
                                dotSize={widthScale(3)}
                                borderColor={'#fff'}
                                innerLineColor={'#E5E5E5'}
                                decimal={0}
                                data={dummyArr}
                                xLabelFontStyle={getTextStyles('RG', '#222', 12, 14)}
                                yLabelFontStyle={getTextStyles('RG', '#222', 10, 12)}
                                chartBackgroundColor={'#fff'}
                                chartFillColor={'#fff'}
                                showVerticalLine={false}
                                showXLabel={false}
                            />
                        </View>
                    </View>
                )}
                {/* Custom Line2 */}
                {select == 1 && (
                    <View>
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
                                width={widthScale(300)}
                                height={widthScale(200)}
                                lineSize={1}
                                lineColor={'#d0ee17'}
                                innerLineSize={1}
                                dotColor={'#d0ee17'}
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
                                chartBackgroundColor={'#020024'}
                                chartFillColor={'#E5E5E5'}
                            />
                        </View>
                    </View>
                )}
                {/* Custom bar */}
                {select == 0 && (
                    <View>
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
                                    { x: '123', y: 2 },
                                    { x: '123', y: 2 },
                                    { x: '123', y: 2 },
                                    { x: '123', y: 2 },
                                    { x: '123', y: 2 },
                                    { x: '123', y: 2 },
                                    { x: '123', y: 2 },
                                ]}
                                xLabelFontStyle={getTextStyles('RG', '#222', 12, 14)}
                                yLabelFontStyle={getTextStyles('RG', '#222', 10, 12)}
                            />
                        </View>
                    </View>
                )}
                {/* Custom Pie */}
                {select == 0 && (
                    <View style={{}}>
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
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View
                                style={{
                                    alignSelf: 'flex-start',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingBottom: widthScale(30),
                                }}>
                                <CustomCircleChart
                                    dataArr={dummyArr.map((item) => item.y)}
                                    chartColors={dummyArr.map(makeRandomColor)}
                                    circleRadius={50}
                                    animation={true}
                                />
                                {/* <View style={{ marginLeft: widthScale(20) }}>
                                    <CustomCircleChart circleRadius={40} animation chartStyle="0" />
                                </View> */}
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    {/* <View>{dummyArr.map()}</View> */}
                                </View>
                            </View>
                            <Pressable
                                onStartShouldSetResponder={(eve) => {
                                    console.log(eve.nativeEvent.target);
                                    return true;
                                }}
                                hitSlop={widthScale(10)}>
                                <Text>123123</Text>
                            </Pressable>
                        </View>
                    </View>
                )}
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
                        chartFillColor={'#E5E5E5'}
                        xLabelFontStyle={getTextStyles('RG', '#FAFAFA', 12, 14)}
                        yLabelFontStyle={getTextStyles('RG', '#FAFAFA', 10, 12)}
                        chartBackgroundColor={'#020024'}
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
            </View>
        </View>
    );
};

export default ChartScreen;
