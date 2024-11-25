import React, { useEffect, useState } from 'react';
import { Circle, Group, Path, Skia, Text, TextPath, matchFont, useFont } from '@shopify/react-native-skia';
import { SharedValue, runOnJS, useDerivedValue, useSharedValue } from 'react-native-reanimated';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { Dimensions } from 'react-native';
import FONTS from '../../common/variables/fonts';
import { widthScale } from '../../common/util';

type Props = {
    cx: SharedValue<number>;
    chartHeight: number;
    selectedValue: SharedValue<number>;
    indexShare: SharedValue<number>;
};

const Cursor = ({ cx, chartHeight, selectedValue, indexShare }: Props) => {
    const font = useFont(
        require('../../tutorial-example/touchable-line-chart/src/assets/fonts/Roboto-Regular.ttf'),
        18,
    );

    const path = useDerivedValue(() => {
        const dottedLine = Skia.Path.Make().lineTo(0, chartHeight);
        // const dottedLine = Skia.Path.Make().lineTo(0, chartHeight - cy.value - 20);
        dottedLine.dash(10, 3, 30);

        const matrix = Skia.Matrix();
        matrix.translate(cx.value, 25);
        dottedLine.transform(matrix);

        return dottedLine;
    });

    const animatedText = useDerivedValue(() => {
        return `${Math.round(selectedValue.value)}`;
    });

    const textWidth = useDerivedValue(() => {
        if (font?.measureText(selectedValue.value.toString()) && indexShare.value != 0) {
            // alignCenterVal.value = cx.value + font.measureText(selectedValue.value.toString()).x;
            // console.log(font?.measureText(selectedValue.value.toString()).width);
            return cx.value - font.measureText(selectedValue.value.toString()).width / 2;
        }
        return cx.value;
    });

    return (
        <Group>
            <Text x={textWidth} y={18} text={animatedText} font={font} color={'#222'} />
            <Path path={path} color="rgba(252, 14, 133, 0.3)" style="stroke" strokeJoin="bevel" strokeWidth={1} />
            {/* <Circle r={10} cx={cx} cy={cy} strokeWidth={10} color={'#eaf984'} style={'stroke'} /> */}
            {/* <Circle r={10} cx={cx} cy={cy} color={'#0d0d0d'} style={'fill'} /> */}
        </Group>
    );
};

export default Cursor;
