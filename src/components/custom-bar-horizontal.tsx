import React, { useEffect, useState } from 'react';
import { ColorValue, Text, TextStyle, View } from 'react-native';
import { widthScale } from '../common/util';

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
}

/**
 * LineChart
 * @param required width, height, data
 * @returns JSX.Element
 */
const CustomBarHorizontalChart = (props: CustomLineChartProp) => {
    const {
        width,
        height,
        data,
        showDot = true,
        showHorizontalLine = true,
        showVerticalLine = true,
        showYLabel = true,
        showXLabel = true,
        borderColor = '#EEE',
        innerLineSize = 1,
        innerLineColor = '#EEE',
        dotSize = 3,
        dotColor = '#000',
        yLabelFontStyle,
        xLabelFontStyle,
        decimal = 2,
        yLabelCounts = 4,
    } = props;

    const [chartData, setChartData] = useState<{ x: string; y: number }[]>(data);
    const [chartWidth, setChartWidth] = useState<number>(0);
    const [chartHeight, setChartHeight] = useState<number>(0);
    const [minYDomain, setMinYDomain] = useState<number>(0);
    const [maxYDomain, setMaxYDomain] = useState<number>(1);
    const yLabelCount = yLabelCounts;

    useEffect(() => {
        let sortList = data.sort((a, b) => a.x.localeCompare(b.x));
        let xList = sortList.map((item) => item.x);
        let yList = sortList.map((item) => item.y);
        let yMax = Math.max.apply(null, yList);

        setChartData(sortList);
        setMinYDomain(Math.min.apply(null, yList));
        setMaxYDomain(yMax * 1.2);
    }, []);

    return (
        <>
            <View
                style={{
                    padding: 1.5,
                    width: width,
                    height: height,
                    overflow: 'visible',
                }}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    {/* yLabel */}
                    {showYLabel && (
                        <View
                            style={{
                                alignItems: 'flex-start',
                                justifyContent: 'space-around',
                                paddingTop: widthScale(6),
                                paddingBottom: widthScale(12),
                                paddingRight: widthScale(12),
                            }}>
                            {chartData.map((item, index) => {
                                return (
                                    <View
                                        style={{
                                            alignItems: 'flex-start',
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
                    {/* InnerLine, ChartComponent */}
                    <View
                        style={{
                            transform: [{ rotate: '90deg' }],
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
                                                borderTopColor: innerLineColor,
                                                borderTopWidth: index == yLabelCount ? 0 : innerLineSize,
                                                borderStyle: 'dashed',
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
                                <View
                                    style={{
                                        width: 0,
                                        height: '100%',
                                        backgroundColor: innerLineColor,
                                    }}
                                    key={`vertical_${-1}`}
                                />
                                {chartData.map((item, index) => {
                                    return (
                                        <View
                                            style={{
                                                width: innerLineSize,
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
                {/* Dot */}
                {showDot && (
                    <View
                        style={{
                            transform: [{ rotate: '90deg' }],
                            position: 'absolute',
                            right: 0,
                            width: chartWidth,
                            height: chartHeight,
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            justifyContent: 'space-around',
                        }}>
                        {chartData.map((item, index) => {
                            let margin = (chartHeight * item.y) / maxYDomain;

                            return (
                                <View
                                    style={{
                                        width: dotSize * 5,
                                        height: margin,
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
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            justifyContent: 'space-between',
                            marginLeft: widthScale(15),
                            marginRight: widthScale(-15),
                        }}>
                        {[...Array(yLabelCount + 1).keys()]
                            .map((item, index) => {
                                return (
                                    <Text
                                        style={[{ fontSize: 12, color: '#000' }, yLabelFontStyle]}
                                        key={`yLabel_${index}`}>
                                        {`${((maxYDomain / yLabelCount) * (yLabelCount - index)).toFixed(decimal)}`} 번
                                    </Text>
                                );
                            })
                            .reverse()}
                    </View>
                )}
            </View>
        </>
    );
};

export default CustomBarHorizontalChart;
