import React, { useEffect, useState } from 'react';
import { Canvas, Path, Skia, Text, useFont } from '@shopify/react-native-skia';
import { curveBasis, line, scaleLinear, scalePoint } from 'd3';
import { SharedValue, clamp, runOnJS, runOnUI, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import { DataType } from '../data/data';
import { Gesture, GestureDetector, PanGestureHandlerEventPayload } from 'react-native-gesture-handler';
import XAxisText from './xaxis-text';
import Cursor from './cursor';
import { getYForX, parse } from 'react-native-redash';
import Gradient from './gradient';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

type Props = {
    chartWidth: number;
    chartHeight: number;
    chartMargin: number;
    data: DataType[];
    setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
    selectedValue: SharedValue<number>;
};

const LineChart = ({ chartHeight, chartMargin, chartWidth, data, setSelectedDate, selectedValue }: Props) => {
    const options = {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: true,
    };
    const [showCursor, setShowCursor] = useState(false);
    const animationLine = useSharedValue(0);
    const animationGradient = useSharedValue({ x: 0, y: 0 });
    const cx = useSharedValue(20);
    const cy = useSharedValue(0);
    // const totalValue = data.reduce((acc, cur) => acc + cur.value, 0);

    useEffect(() => {
        // Animate the line and the gradient
        animationLine.value = withTiming(1, { duration: 1000 });
        animationGradient.value = withDelay(1000, withTiming({ x: 0, y: chartHeight }, { duration: 500 }));
        // selectedValue.value = withTiming(totalValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // x domain
    const xDomain = data.map((dataPoint: DataType) => dataPoint.label);

    // range of the x scale
    const xRange = [chartMargin, chartWidth - chartMargin];

    // Create the x scale
    const x = scalePoint().domain(xDomain).range(xRange).padding(0);

    const stepX = x.step();

    // Find the max and min values of the data
    const max = Math.max(...data.map((val) => val.value));
    const min = Math.min(...data.map((val) => val.value));
    // y domain
    const yDomain = [min, max];

    // range of the y scale
    const yRange = [chartHeight, 0];

    // Create the y scale
    const y = scaleLinear().domain(yDomain).range(yRange);

    // Create the curved line
    const curvedLine = line<DataType>()
        .x((d) => x(d.label)!)
        .y((d) => y(d.value))
        .curve(curveBasis)(data);

    const linePath = Skia.Path.MakeFromSVGString(curvedLine!);

    // Parse the path to get the points
    const path = parse(linePath!.toSVGString());

    // handle the gesture event
    const handleGestureEvent = (e: PanGestureHandlerEventPayload) => {
        'worklet';
        const index = Math.floor(e.absoluteX / stepX);
        if (!data[index]) return;
        // if(data[index].date != )
        runOnJS(setSelectedDate)(data[index].date);
        selectedValue.value = data[index].value;

        const clampValue = clamp(
            Math.floor(e.absoluteX / stepX) * stepX + chartMargin,
            chartMargin,
            chartWidth - chartMargin,
        );

        // for some device getYForX returns null for the last point
        // so we need to floor the value
        cx.value = clampValue;
        cy.value = getYForX(path, Math.floor(clampValue))!;
    };

    // Pan gesture handler
    const pan = Gesture.Pan()
        .onTouchesDown(() => {
            runOnJS(setShowCursor)(true);
        })
        .onTouchesUp(() => {
            runOnJS(setShowCursor)(false);
            // selectedValue.value = totalValue;
            runOnJS(setSelectedDate)('Total');
        })
        .onBegin(handleGestureEvent)
        .onChange(handleGestureEvent);

    return (
        <>
            <GestureDetector gesture={pan}>
                <Canvas
                    style={{
                        width: chartWidth,
                        height: chartHeight,
                        backgroundColor: '#fff',
                    }}>
                    <Path
                        style="stroke"
                        path={linePath!}
                        strokeWidth={4}
                        color="#FC0E85"
                        end={animationLine}
                        start={0}
                        strokeCap={'round'}
                    />
                    {/* <Gradient
                        chartHeight={chartHeight}
                        chartWidth={chartWidth}
                        chartMargin={chartMargin}
                        animationGradient={animationGradient}
                        curvedLine={curvedLine!}
                    /> */}
                    {showCursor && <Cursor cx={cx} cy={cy} chartHeight={chartHeight} selectedValue={selectedValue} />}
                    {/* {data.map((dataPoint: DataType, index) => (
                        <XAxisText x={x(dataPoint.label)!} y={chartHeight} text={dataPoint.label} key={index} />
                    ))} */}
                </Canvas>
            </GestureDetector>
        </>
    );
};

export default LineChart;
