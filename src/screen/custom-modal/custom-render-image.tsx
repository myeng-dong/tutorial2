import React, { useState } from 'react';
import { Dimensions, Pressable, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { widthScale } from '../../common/util';
import ImageZoom from 'react-native-image-pan-zoom';
interface CustomRenderImage {
    uri?: string;
}
const CustomRenderImage = (props: CustomRenderImage) => {
    const { uri } = props;
    const insets = useSafeAreaInsets();
    const [autoHeight, setAutoHeight] = useState(0);

    return (
        <FastImage
            source={{ uri: uri }}
            style={{ width: widthScale(375), height: autoHeight }}
            onLoad={(eve) => {
                setAutoHeight((eve.nativeEvent.height / eve.nativeEvent.width) * widthScale(375));
            }}
            resizeMode="contain"
        />
    );
};

export default CustomRenderImage;
