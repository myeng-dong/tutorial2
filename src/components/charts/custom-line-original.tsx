import React, { useEffect, useState } from 'react';
import { Animated, ColorValue, Pressable, Text, TextStyle, View } from 'react-native';
import { widthScale } from '../../common/util';

interface CustomLineChartProp {
    width: number;
    height: number;
    data: { x: string; y: number }[];
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
}

/**
 * LineChart
 * @param required width, height, data
 * @returns JSX.Element
 */
const CustomLineChart = (props: CustomLineChartProp) => {
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
        yLabelCounts = 4,
        chartBackgroundColor = '#fff',
        chartFillColor,
        animation = true,
    } = props;

    const [chartData, setChartData] = useState<{ x: string; y: number }[]>(data);
    const [chartWidth, setChartWidth] = useState<number>(0);
    const [chartHeight, setChartHeight] = useState<number>(0);
    const [minYDomain, setMinYDomain] = useState<number>(0);
    const [maxYDomain, setMaxYDomain] = useState<number>(1);
    const yLabelCount = yLabelCounts;
    const labelMargin = 5;
    const fadeAnim = React.useRef(new Animated.Value(animation ? 0 : 1)).current;

    useEffect(() => {
        let sortList = data.sort((a, b) => a.x.localeCompare(b.x));
        let xList = sortList.map((item) => item.x);
        let yList = sortList.map((item) => item.y);
        let yMax = Math.max.apply(null, yList);

        setChartData(sortList);
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

    return (
        <>
            <View style={{ padding: 1.5, width: width, height: height, overflow: 'visible' }}>
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
                                        opacity: fadeAnim,
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
                        <View style={{ alignItems: 'flex-end', justifyContent: 'space-between' }}>
                            {[...Array(yLabelCount + 1).keys()].map((item, index) => {
                                return (
                                    <Text
                                        style={[
                                            { fontSize: 12, color: '#000', paddingRight: widthScale(10) },
                                            yLabelFontStyle,
                                        ]}
                                        key={`yLabel_${index}`}>
                                        {`${((maxYDomain / yLabelCount) * (yLabelCount - index)).toFixed(decimal)}`} 번
                                    </Text>
                                );
                            })}
                        </View>
                    )}
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
                                                // height: index == yLabelCount ? 0 : innerLineSize,
                                                borderTopColor: innerLineColor,
                                                borderTopWidth: index == yLabelCount ? 0 : innerLineSize,
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
                </View>
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
                                        backgroundColor: 'transparent',
                                        opacity: fadeAnim,
                                    }}>
                                    <Pressable
                                        onResponderMove={() => {
                                            console.log(item);
                                        }}
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
                                    </Pressable>
                                </Animated.View>
                            );
                        }
                    })}
                </View>
                {/* Dot */}
                {showDot && chartHeight != 0 && (
                    <View
                        style={{
                            position: 'absolute',
                            top: -(dotSize / 2),
                            right: -(dotSize / 2),
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
                {/* xLabel */}
                {showXLabel && (
                    <View
                        style={{
                            width: chartWidth + chartWidth / chartData.length,
                            flexDirection: 'row',
                            alignSelf: 'flex-end',
                            justifyContent: 'space-between',
                            marginHorizontal: -(chartWidth / chartData.length) / 2,
                        }}>
                        {chartData.map((item, index) => {
                            return (
                                <View
                                    style={{ width: chartWidth / chartData.length, alignItems: 'center' }}
                                    key={`xLabel_${index}`}>
                                    <Text
                                        style={[{ fontSize: 10, color: '#000' }, xLabelFontStyle]}>{`${item.x}`}</Text>
                                </View>
                            );
                        })}
                    </View>
                )}
            </View>
        </>
    );
};

export default CustomLineChart;
