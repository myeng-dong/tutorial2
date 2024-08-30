import React from 'react';
import { Dimensions, Pressable, ScrollView, Text, View } from 'react-native';
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

const ChartScreen = () => {
    const insets = useSafeAreaInsets();

    const widthAndHeight = widthScale(110);
    const series = [1000, 321, 123, 789, 537];
    const sliceColor = ['#fbd203', '#ffb300', '#ff9100', '#ff6c00', '#ff3c00'];

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

    const renderChartInfo = () => {
        return;
    };
    return (
        <View style={{ flex: 1, marginTop: insets.top }}>
            <ScrollView>
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
                            <Text style={getTextStyles('MD', '#222', 12, 14)}>nice</Text>
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
            </ScrollView>
        </View>
    );
};

export default ChartScreen;
