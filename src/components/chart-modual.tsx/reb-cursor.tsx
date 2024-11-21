import React, { useEffect, useState } from 'react';
import { Circle, Group, Path, Skia, Text, TextPath, useFont } from '@shopify/react-native-skia';
import { SharedValue, useDerivedValue } from 'react-native-reanimated';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

type Props = {
    cx: SharedValue<number>;
    chartHeight: number;
    selectedValue: SharedValue<number>;
};

const Cursor = ({ cx, chartHeight, selectedValue }: Props) => {
    const font = useFont(
        require('../../tutorial-example/touchable-line-chart/src/assets/fonts/Roboto-Regular.ttf'),
        18,
    );
    const [value, setValue] = useState(selectedValue.value);
    const options = {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: true,
    };
    useEffect(() => {
        setValue(selectedValue.value);
        ReactNativeHapticFeedback.trigger('clockTick', options);
    }, [selectedValue.value]);
    const path = useDerivedValue(() => {
        const dottedLine = Skia.Path.Make().lineTo(0, chartHeight);
        // const dottedLine = Skia.Path.Make().lineTo(0, chartHeight - cy.value - 20);
        dottedLine.dash(10, 0, 30);

        const matrix = Skia.Matrix();
        matrix.translate(cx.value, 32);
        dottedLine.transform(matrix);

        return dottedLine;
    });

    const textPath = useDerivedValue(() => {
        const dottedLine = Skia.Path.Make().lineTo(chartHeight, chartHeight);
        // const dottedLine = Skia.Path.Make().lineTo(0, chartHeight - cy.value - 20);
        dottedLine.dash(10, 10, 10);

        const matrix = Skia.Matrix();
        matrix.translate(cx.value, 0);
        dottedLine.transform(matrix);

        return dottedLine;
    });

    const animatedText = useDerivedValue(() => {
        return `${Math.round(value)}`;
    }, [value]);

    return (
        <Group>
            <Text x={cx} y={30} text={animatedText} font={font} color={'pink'} />
            <Path path={path} color="#222" style="stroke" strokeJoin="bevel" strokeWidth={1} />
            {/* <Circle r={10} cx={cx} cy={cy} strokeWidth={10} color={'#eaf984'} style={'stroke'} /> */}
            {/* <Circle r={10} cx={cx} cy={cy} color={'#0d0d0d'} style={'fill'} /> */}
        </Group>
    );
};

export default Cursor;
