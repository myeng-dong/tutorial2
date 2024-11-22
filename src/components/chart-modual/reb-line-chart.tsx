import React, { useEffect, useState } from 'react';
import { Animated, ColorValue, PanResponder, Pressable, ScrollView, Text, TextStyle, View } from 'react-native';
import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
    type PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import { getWidthHeight, widthScale } from '../../common/util';
import { scalePoint } from 'd3';
import { clamp, runOnJS, useSharedValue, type SharedValue } from 'react-native-reanimated';
import Cursor from './reb-cursor';
import { Canvas } from '@shopify/react-native-skia';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

export interface RebLineProps {
    x: string;
    y: number;
    label: string;
}
interface CustomLineChartProp {
    width: number;
    height: number;
    data: RebLineProps[];
    showDot?: boolean;
    showHorizontalLine?: boolean;
    showVerticalLine?: boolean;
    showYLabel?: boolean;
    showXLabel?: boolean;
    lineSize?: number;
    lineColor?: ColorValue;
    borderColor?: ColorValue;
    innerLineSize?: number;
    innerLineColor?: ColorValue;
    dotSize?: number;
    dotColor?: ColorValue;
    yLabelFontStyle?: TextStyle;
    xLabelFontStyle?: TextStyle;
    decimal?: number;
    yLabelCounts?: number;
    chartBackgroundColor?: ColorValue;
    chartFillColor?: ColorValue;
    animation?: boolean;
    setSelectedDate: React.Dispatch<React.SetStateAction<RebLineProps | undefined>>;
    selectedValue: SharedValue<number>;
}

/**
 * LineChart
 * @param required width, height, data
 * @returns JSX.Element
 */
const CustomLineChartReb = (props: CustomLineChartProp) => {
    const {
        width,
        height,
        data,
        showDot = true,
        showHorizontalLine = true,
        showVerticalLine = true,
        showYLabel = true,
        showXLabel = true,
        lineSize = 1,
        lineColor = '#000',
        borderColor = '#EEE',
        innerLineSize = 1,
        innerLineColor = '#EEE',
        dotSize = 3,
        dotColor = '#000',
        yLabelFontStyle,
        xLabelFontStyle,
        decimal = 2,
        yLabelCounts = 6,
        chartBackgroundColor = '#fff',
        chartFillColor,
        animation = true,
        selectedValue,
        setSelectedDate,
    } = props;

    const [chartData, setChartData] = useState<{ x: string; y: number }[]>(data);
    const [chartWidth, setChartWidth] = useState<number>(0);
    const [chartHeight, setChartHeight] = useState<number>(0);
    const [chartMargin, setChartMargin] = useState<number>(widthScale(0));
    const [minYDomain, setMinYDomain] = useState<number>(0);
    const [maxYDomain, setMaxYDomain] = useState<number>(1);
    const [loadEnd, setLoadEnd] = useState(false);
    const yLabelCount = yLabelCounts;
    const labelMargin = 0;
    const cx = useSharedValue(20);
    const [showCursor, setShowCursor] = useState(false);
    const fadeAnim = React.useRef(new Animated.Value(animation ? 0 : 1)).current;

    const options = {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: true,
    };

    useEffect(() => {
        // let sortList = data.sort((a, b) => a.x.localeCompare(b.x));
        let xList = data.map((item) => item.x);
        let yList = data.map((item) => item.y);
        let yMax = Math.max.apply(null, yList);

        setChartData(data);
        setMinYDomain(Math.min.apply(null, yList));
        setMaxYDomain(yMax * 1.2);
    }, []);

    useEffect(() => {
        if (!animation) return;
        Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1350,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    // x domain
    const xDomain = data.map((dataPoint: RebLineProps) => dataPoint.label);

    // range of the x scale
    const xRange = [chartMargin, chartWidth];

    // Create the x scale
    const x = scalePoint().domain(xDomain).range(xRange).padding(0);

    const stepX = x.step();

    const handleGestureEvent = (e: PanGestureHandlerEventPayload) => {
        'worklet';
        const index = Math.floor(e.x / stepX);
        if (!data[index]) return;
        selectedValue.value = data[index].y;
        // runOnJS(setSelectedDate)(data[index]);
        const clampValue = clamp(Math.floor(e.x / stepX) * stepX, chartMargin, chartWidth);
        cx.value = clampValue;
    };
    const pan = Gesture.Pan()
        .onTouchesDown(() => {
            runOnJS(setShowCursor)(true);
        })
        .onTouchesUp(() => {
            runOnJS(setShowCursor)(false);
        })
        .onBegin((e) => {
            handleGestureEvent(e);
        })
        .onChange((e) => {
            handleGestureEvent(e);
        });

    // useEffect(() => {
    //     if (chartWidth != 0) return setLoadEnd(true);
    // }, [chartWidth]);

    return (
        <>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <View
                    style={{
                        padding: 1.5,
                        width: width,
                        height: height,
                        overflow: 'visible',
                    }}>
                    {/* background */}
                    <View
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            width: chartWidth,
                            height: chartHeight,
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            justifyContent: 'space-between',
                            backgroundColor: 'transparent',
                        }}>
                        {chartData.map((item, index) => {
                            // if (index == 0) {
                            if (index != chartData.length - 1) {
                                let margin = (chartHeight * item.y) / maxYDomain;
                                let height = (chartHeight * (chartData[index + 1].y - item.y)) / maxYDomain;
                                let isReverse = chartData[index + 1].y > item.y;

                                let x = chartWidth / (chartData.length - 1);
                                let y = height;
                                let z = Math.sqrt(x * x + y * y);

                                let rotate = (Math.asin(y / z) * 180) / Math.PI;
                                let rotateStr = rotate * -1 + 'deg';
                                let movedRotate = (z - x) / 2;

                                return (
                                    <Animated.View
                                        style={{
                                            paddingBottom: !isReverse ? margin - Math.abs(y) : margin,
                                            backgroundColor: chartFillColor,
                                            // opacity: fadeAnim,
                                        }}>
                                        <View
                                            style={{
                                                width: x,
                                                height: Math.abs(y),
                                            }}
                                            key={`Line_${index}`}>
                                            <View
                                                style={[
                                                    {
                                                        position: 'absolute',
                                                        backgroundColor: 'transparent',
                                                        borderStyle: 'solid',
                                                        borderRightColor: 'transparent',
                                                        borderLeftColor: 'transparent',
                                                    },
                                                    rotate > 0
                                                        ? {
                                                              borderTopColor: chartBackgroundColor,
                                                              borderBottomColor: 'transparent',
                                                              borderTopWidth: Math.abs(y),
                                                              borderRightWidth: x,
                                                          }
                                                        : {
                                                              borderTopColor: chartBackgroundColor,
                                                              borderBottomColor: 'transparent',
                                                              borderTopWidth: Math.abs(y),
                                                              borderLeftWidth: x,
                                                          },
                                                ]}
                                            />
                                        </View>
                                    </Animated.View>
                                );
                            }
                        })}
                    </View>
                    {/* background */}
                    {animation && (
                        <View
                            style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                width: chartWidth,
                                height: chartHeight,
                                flexDirection: 'row',
                                alignItems: 'flex-end',
                                justifyContent: 'space-between',
                                backgroundColor: 'transparent',
                            }}>
                            {chartData.map((item, index) => {
                                // if (index == 0) {
                                if (index != chartData.length - 1) {
                                    let margin = (chartHeight * item.y) / maxYDomain;
                                    let height = (chartHeight * (chartData[index + 1].y - item.y)) / maxYDomain;
                                    let isReverse = chartData[index + 1].y > item.y;

                                    let x = chartWidth / (chartData.length - 1);
                                    let y = height;
                                    let z = Math.sqrt(x * x + y * y);

                                    let rotate = (Math.asin(y / z) * 180) / Math.PI;
                                    return (
                                        <View
                                            style={{
                                                paddingBottom: !isReverse ? margin - Math.abs(y) : margin,
                                            }}>
                                            <View
                                                style={{
                                                    width: x,
                                                    height: Math.abs(y),
                                                }}
                                                key={`Line_${index}`}>
                                                <Animated.View
                                                    style={[
                                                        {
                                                            position: 'absolute',
                                                            backgroundColor: 'transparent',
                                                            borderStyle: 'solid',
                                                            borderRightColor: 'transparent',
                                                            borderLeftColor: 'transparent',
                                                        },
                                                        rotate > 0
                                                            ? {
                                                                  borderTopColor: chartBackgroundColor,
                                                                  borderBottomColor: 'transparent',
                                                                  borderTopWidth: Math.abs(y),
                                                                  borderRightWidth: x,
                                                              }
                                                            : {
                                                                  borderTopColor: chartBackgroundColor,
                                                                  borderBottomColor: 'transparent',
                                                                  borderTopWidth: Math.abs(y),
                                                                  borderLeftWidth: x,
                                                              },
                                                    ]}
                                                />
                                            </View>
                                        </View>
                                    );
                                }
                            })}
                        </View>
                    )}

                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        {/* yLabel */}
                        {showYLabel && (
                            <View
                                style={{
                                    alignItems: 'flex-end',
                                    justifyContent: 'space-between',
                                    paddingBottom: widthScale(14),
                                    marginTop: widthScale(-5),
                                }}>
                                {[...Array(yLabelCount + 1).keys()].map((item, index) => {
                                    return (
                                        <Text
                                            style={[
                                                {
                                                    fontSize: widthScale(12),
                                                    color: '#000',
                                                },
                                                yLabelFontStyle,
                                            ]}
                                            key={`yLabel_${index}`}>
                                            {`${((maxYDomain / yLabelCount) * (yLabelCount - index)).toFixed(decimal)}`}
                                        </Text>
                                    );
                                })}
                            </View>
                        )}
                        <GestureDetector gesture={pan}>
                            <ScrollView
                                showsHorizontalScrollIndicator={false}
                                horizontal
                                scrollEnabled={false}
                                style={{ flex: 1 }}
                                contentContainerStyle={{ paddingHorizontal: widthScale(7) }}>
                                <View style={{ width: width }}>
                                    {/* InnerLine, ChartComponent */}
                                    <View
                                        style={{
                                            marginBottom: labelMargin,
                                            marginLeft: labelMargin,
                                            flex: 1,
                                            borderLeftWidth: 1,
                                            borderBottomWidth: 1,
                                            borderColor: borderColor,
                                        }}
                                        onLayout={(e) => {
                                            setChartWidth(e.nativeEvent.layout.width);
                                            setChartHeight(e.nativeEvent.layout.height);
                                            setTimeout(() => setLoadEnd(true), 200);
                                        }}>
                                        {showHorizontalLine && (
                                            <View
                                                style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    bottom: 0,
                                                    right: 0,
                                                    left: 0,
                                                    justifyContent: 'space-between',
                                                }}>
                                                {[...Array(yLabelCount + 1).keys()].map((item, index) => {
                                                    return (
                                                        <View
                                                            style={{
                                                                width: '100%',
                                                                height: index == yLabelCount ? 0 : innerLineSize,
                                                                borderTopColor: innerLineColor,
                                                                borderTopWidth:
                                                                    index == yLabelCount ? 0 : innerLineSize,
                                                            }}
                                                            key={`horizontal_${index}`}
                                                        />
                                                    );
                                                })}
                                            </View>
                                        )}
                                        {showVerticalLine && (
                                            <View
                                                style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    bottom: 0,
                                                    right: 0,
                                                    left: 0,
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                }}>
                                                {chartData.map((item, index) => {
                                                    return (
                                                        <View
                                                            style={{
                                                                width: index == 0 ? 0 : innerLineSize,
                                                                height: '100%',
                                                                backgroundColor: innerLineColor,
                                                            }}
                                                            key={`vertical_${index}`}
                                                        />
                                                    );
                                                })}
                                            </View>
                                        )}
                                    </View>
                                    <Canvas
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            right: 0,
                                            width: chartWidth,
                                            height: chartHeight,
                                        }}>
                                        {showCursor && (
                                            <Cursor cx={cx} chartHeight={chartHeight} selectedValue={selectedValue} />
                                        )}
                                    </Canvas>
                                    {/* Dot */}
                                    {showDot && chartHeight != 0 && (
                                        <View
                                            style={{
                                                position: 'absolute',
                                                top: -(dotSize / 2 + 1),
                                                right: -(dotSize / 2 + widthScale(1)),
                                                width: chartWidth + dotSize * 2,
                                                height: chartHeight + dotSize * 2,
                                                flexDirection: 'row',
                                                alignItems: 'flex-end',
                                                justifyContent: 'space-between',
                                                backgroundColor: 'transparent',
                                            }}>
                                            {chartData.map((item, index) => {
                                                let margin = (chartHeight * item.y) / maxYDomain;
                                                return (
                                                    <View
                                                        style={{
                                                            marginBottom: margin,
                                                            width: dotSize * 2,
                                                            height: dotSize * 2,
                                                            borderRadius: dotSize * 2,
                                                            backgroundColor: dotColor,
                                                        }}
                                                        key={`dot_${index}`}
                                                    />
                                                );
                                            })}
                                        </View>
                                    )}
                                    {/* Line */}
                                    <View
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            right: 0,
                                            width: chartWidth,
                                            height: chartHeight,
                                            flexDirection: 'row',
                                            alignItems: 'flex-end',
                                            justifyContent: 'space-between',
                                            backgroundColor: 'transparent',
                                        }}>
                                        {chartData.map((item, index) => {
                                            // if (index == 0) {
                                            if (index != chartData.length - 1) {
                                                let margin = (chartHeight * item.y) / maxYDomain;
                                                let height =
                                                    (chartHeight * (chartData[index + 1].y - item.y)) / maxYDomain;
                                                let isReverse = chartData[index + 1].y > item.y;

                                                let x = chartWidth / (chartData.length - 1);
                                                let y = height;
                                                let z = Math.sqrt(x * x + y * y);

                                                let rotate = (Math.asin(y / z) * 180) / Math.PI;
                                                let rotateStr = rotate * -1 + 'deg';
                                                let movedRotate = (z - x) / 2;

                                                return (
                                                    <View
                                                        style={{
                                                            paddingBottom: !isReverse ? margin - Math.abs(y) : margin,
                                                            backgroundColor: 'transparent',
                                                            // opacity: fadeAnim,
                                                        }}>
                                                        <View
                                                            style={{
                                                                width: x,
                                                                height: Math.abs(y),
                                                            }}
                                                            key={`Line_${index}`}>
                                                            <View
                                                                style={{
                                                                    position: 'absolute',
                                                                    marginTop: Math.abs(y) / 2,
                                                                    marginLeft: -movedRotate - 1,
                                                                    width: z,
                                                                    height: 2,
                                                                    borderTopColor: lineColor,
                                                                    borderBottomColor: lineColor,
                                                                    borderTopWidth: lineSize,
                                                                    borderBottomWidth: lineSize,
                                                                    backgroundColor: '#000',
                                                                    transform: [{ rotate: rotateStr }],
                                                                }}
                                                            />
                                                        </View>
                                                    </View>
                                                );
                                            }
                                        })}
                                    </View>

                                    {/* xLabel */}
                                    {showXLabel && (
                                        <View
                                            style={{
                                                width: chartWidth + chartWidth / chartData.length,
                                                flexDirection: 'row',
                                                // alignSelf: 'flex-end',
                                                justifyContent: 'space-between',
                                                // marginHorizontal: -(chartWidth / chartData.length) / 2,
                                            }}>
                                            {chartData.map((item, index) => {
                                                return (
                                                    <View
                                                        style={{
                                                            width: chartWidth / chartData.length,
                                                            // alignItems: 'flex-end',
                                                        }}
                                                        key={`xLabel_${index}`}>
                                                        <Text
                                                            style={[
                                                                { fontSize: 10, color: '#000' },
                                                                xLabelFontStyle,
                                                            ]}>{`${item.x}`}</Text>
                                                    </View>
                                                );
                                            })}
                                        </View>
                                    )}
                                </View>
                            </ScrollView>
                        </GestureDetector>
                    </View>
                </View>
            </GestureHandlerRootView>
            {/* {!loadEnd && <CustomLoadingView color={BASEBLACKCOLOR} />} */}
            {!loadEnd && (
                <View
                    style={getWidthHeight(345, 220, {
                        position: 'absolute',
                        backgroundColor: '#fff',
                    })}
                />
            )}
        </>
    );
};

export default CustomLineChartReb;
