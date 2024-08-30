import React, { useState } from 'react';
import { ImageStyle, Pressable, PressableProps, StyleProp, Text, TextStyle, View } from 'react-native';
import FastImage, { FastImageProps, FastImageStaticProperties } from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface CustomPressableProp extends PressableProps {
    activeOpacity?: number;
    title?: string;
    textStyle?: StyleProp<TextStyle> | undefined;
    image?: any;
    imageStyles?: any;
    onPress?: () => void;
    insetBottom?: boolean;
    insetBottomColor?: string;
    loadingView?: JSX.Element;
}

export const CustomPressable = (props: CustomPressableProp) => {
    const MAINCOLOR = '#000';
    const {
        activeOpacity = 0.9,
        style,
        title,
        onPress,
        textStyle,
        image,
        imageStyles,
        insetBottom,
        insetBottomColor,
        loadingView,
    } = props;
    const insets = useSafeAreaInsets();
    const [loading, setLoading] = useState(false);
    return (
        <Pressable
            onPress={onPress}
            {...props}
            style={
                typeof style == 'function' ? style : ({ pressed }) => [style, { opacity: pressed ? activeOpacity : 1 }]
            }>
            {image ? (
                <FastImage
                    onLoad={() => {
                        setLoading(true);
                    }}
                    source={image}
                    style={imageStyles}>
                    {loadingView && !loading ? loadingView : <View />}
                </FastImage>
            ) : (
                <View />
            )}
            {title ? <Text style={textStyle}>{title}</Text> : <View />}
            {insetBottom && (
                <View
                    style={{
                        height: insets.bottom,
                        backgroundColor: insetBottomColor ? insetBottomColor : MAINCOLOR,
                    }}
                />
            )}
        </Pressable>
    );
};
