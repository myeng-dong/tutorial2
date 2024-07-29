import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { getWidthHeight, widthScale } from '../util';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const LayOut = () => {
    const insets = useSafeAreaInsets();
    return (
        <View style={{ flex: 1, marginTop: insets.top }}>
            <Text style={{}}>
                <Pressable style={{}}></Pressable>
            </Text>
        </View>
    );
};

export default LayOut;
