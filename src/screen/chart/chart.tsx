import React, { useEffect, useState } from 'react';
import { Animated as Animate, Dimensions, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
    LineChart,
    BarChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart,
    PieChart as PieChart2,
} from 'react-native-chart-kit';
import { getTextStyles, getWidthHeight, widthScale } from '../../common/util';
import PieChart from 'react-native-pie-chart';
import { AbstractChartConfig } from 'react-native-chart-kit/dist/AbstractChart';
import { Circle, ClipPath, Path, Rect, Svg, SvgUri } from 'react-native-svg';
import Animated, { SharedValue, runOnJS, useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import CustomCircleChart from '../../components/custom-circle-chart';

interface ArcData {
    x: number; // 원의 중심의 x 좌표
    y: number; // 원의 중심의 y 좌표
    radius: number; // 원의 반지름
    degree: number; // 원점에서 부터 호를 그릴 각도
}

const ChartScreen = () => {
    const insets = useSafeAreaInsets();
    const MAX_DEGREE = 359.9;
    const widthAndHeight = widthScale(110);
    const series = [1000, 321, 123, 789, 537];
    const [intervalNum, setIntervalNum] = useState(MAX_DEGREE);
    const sliceColor = ['#fbd203', '#ffb300', '#ff9100', '#ff6c00', '#ff3c00'];

    const fadeAnims = useSharedValue(MAX_DEGREE);

    const data = [
        {
            name: 'Seoul',
            population: 21500000,
            color: 'rgba(131, 167, 234, 1)',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
        {
            name: 'Toronto',
            population: 2800000,
            color: '#F00',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
        {
            name: 'Beijing',
            population: 527612,
            color: 'red',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
        {
            name: 'New York',
            population: 8538000,
            color: '#ffffff',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
        {
            name: 'Moscow',
            population: 11920000,
            color: 'rgb(0, 0, 255)',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
    ];
    const chartConfig: AbstractChartConfig = {
        backgroundColor: '#222',
        backgroundGradientFrom: '#222',
        backgroundGradientTo: '#222',
        decimalPlaces: 0, // optional, defaults to 2dp
        color: (opacity = 0.8) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 0.2) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 10,
            padding: widthScale(20),
        },
        propsForDots: {
            r: '3',
            strokeWidth: '0.1',
            stroke: '#fff',
        },
    };

    const degree = 90;
    const radian = (degree / 180) * Math.PI;

    // 삼각함수로 시초선에서 n도 벌어진 점의 좌표를 구하는 함수
    const getCoordsOnCircle = ({ x, y, radius, degree }: ArcData) => {
        'worklet';
        // const radian = (degree / 180) * Math.PI;
        return {
            x: x + radius * Math.cos((degree / 180) * Math.PI),
            y: y + radius * Math.sin((degree / 180) * Math.PI),
        };
    };

    // x, y를 중심 축으로 하여 degree(θ)만큼 +방향으로 호를 그리는 함수
    const getArc = (props: ArcData): string => {
        'worklet';
        const startCoord = getCoordsOnCircle({ ...props, degree: 0 });
        const finishCoord = getCoordsOnCircle({ ...props });

        const { x, y, radius, degree } = props;
        const isLargeArc = degree > 180 ? 1 : 0;
        const isEnd = degree === MAX_DEGREE;

        const d = `M ${startCoord.x} ${startCoord.y} A ${radius} ${radius} 0 ${degree > 180 ? 1 : 0} 1 ${
            finishCoord.x
        } ${finishCoord.y} L ${x} ${y} ${degree === MAX_DEGREE ? 'z' : ''}`;
        return d;
    };

    const radius = 50;
    const diameter = 2 * Math.PI * radius;
    const colors = ['#ddd', '#bbb', '#aaa', '#888', '#666'];

    const dataset = [9, 5, 4, 3, 1];
    const total = dataset.reduce((r, v) => r + v, 0);
    const acc = dataset.reduce((result, value) => [...result, result[result.length - 1] + value], [0]);
    // const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const testData: ArcData = { x: 100, y: 100, radius: radius * 2, degree: fadeAnims.value };
    const AnimatedPath = Animated.createAnimatedComponent(Path);
    fadeAnims.value = withTiming(359, { duration: 3000 });
    const animatedProps = useAnimatedProps(() => {
        const arcPath = getArc({ x: 100, y: 100, radius: radius * 2, degree: fadeAnims.value });
        return { d: arcPath };
    });

    const circleItem = (data: number, i: number) => {
        const ratio = data / total;
        const fillSpace = diameter * ratio;
        const emptySpace = diameter - fillSpace;
        const offset = (acc[i] / total) * diameter;

        return (
            <Circle
                cx="100"
                cy="100"
                r={radius.toString()}
                fill="transparent"
                stroke={colors[i]}
                strokeWidth={'100'}
                strokeDasharray={`${fillSpace} ${emptySpace}`}
                strokeDashoffset={-offset.toString()}
            />
        );
    };

    useEffect(() => {
        fadeAnims.value = withTiming(0, { duration: 1350 });
    }, []);
    return (
        <View style={{ flex: 1, marginTop: insets.top, backgroundColor: '#fff' }}>
            <ScrollView>
                <Pressable
                    onPress={() => {
                        console.log(fadeAnims.value);
                    }}>
                    <Text>작동!!!</Text>
                </Pressable>
                <View style={{ alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                    <CustomCircleChart circleRadius={40} />
                    <View style={{ marginLeft: widthScale(20) }}>
                        <CustomCircleChart circleRadius={40} animation={false} />
                    </View>
                </View>
                <Svg width="300" height="300">
                    {dataset.map(circleItem)}
                    <AnimatedPath
                        d={getArc({ x: 100, y: 100, radius: radius * 2, degree: fadeAnims.value })}
                        animatedProps={animatedProps}
                        fill={'#fff'}
                        stroke={'transparent'}
                    />
                </Svg>
                <Svg width="300" height="300">
                    {dataset.map(circleItem)}
                    <AnimatedPath
                        d={getArc({ x: 100, y: 100, radius: radius * 2, degree: fadeAnims.value })}
                        animatedProps={animatedProps}
                        fill={'#fff'}
                        stroke={'transparent'}
                    />
                </Svg>
                <Text style={{ fontSize: widthScale(30) }}>Bezier Line Chart</Text>
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
                <View style={{ alignItems: 'center' }}>
                    <PieChart2
                        data={data}
                        width={widthScale(300)}
                        height={widthScale(200)}
                        chartConfig={chartConfig}
                        accessor={'population'}
                        backgroundColor={'transparent'}
                        paddingLeft={'15'}
                        center={[0, 0]}
                        hasLegend={false}
                    />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <PieChart
                        widthAndHeight={Dimensions.get('window').width / 3}
                        series={series}
                        sliceColor={sliceColor}
                        style={{ marginRight: widthScale(30) }}
                    />
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View
                                style={getWidthHeight(5, 5, {
                                    borderRadius: widthScale(3),
                                    backgroundColor: '#fbd203',
                                    marginRight: widthScale(3),
                                })}
                            />
                            <Text style={getTextStyles('MD', '#222', 12, 14)}>123</Text>
                        </View>
                    </View>
                </View>
                <PieChart
                    widthAndHeight={widthAndHeight}
                    series={series}
                    sliceColor={sliceColor}
                    coverRadius={0.45}
                    coverFill={'#FFF'}
                />
                <View style={{ marginVertical: widthScale(100), alignItems: 'center' }}>
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
                </View>
            </ScrollView>
        </View>
    );
};

export default ChartScreen;
