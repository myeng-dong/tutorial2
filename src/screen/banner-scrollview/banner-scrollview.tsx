import React, { useState } from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { widthScale } from '../../common/util';

interface ScrollViewProps {
    color: string;
}

const BannerScrollViewScreen = () => {
    const insets = useSafeAreaInsets();

    return <View style={{ flex: 1, marginTop: insets.top }}></View>;
};

export default BannerScrollViewScreen;
