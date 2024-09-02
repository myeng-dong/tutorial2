import React, { memo, useEffect, useRef } from 'react';
import { Animated, ColorValue, View } from 'react-native';
interface CustomProps {
    dotSize: number;
    margin: number;
    dotColor: ColorValue;
    index: number;
}
const RenderBarVertical = (props: CustomProps) => {
    const { dotSize, margin, dotColor, index } = props;
    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    Animated.sequence([
        Animated.timing(fadeAnim, {
            toValue: margin,
            duration: 1350,
            useNativeDriver: false,
        }),
    ]).start();

    return (
        <Animated.View
            style={{
                width: dotSize * 5,
                height: fadeAnim,
                backgroundColor: dotColor,
            }}
            key={`dot_${index}`}
        />
    );
};

export default memo(RenderBarVertical);
