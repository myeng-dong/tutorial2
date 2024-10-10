import React, { useState } from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { widthScale } from '../../common/util';

interface ScrollViewProps {
    color: string;
}

const BannerScrollViewScreen = () => {
    const insets = useSafeAreaInsets();
    const [page, setPage] = useState(1);
    const [datas] = useState<ScrollViewProps[]>([
        {
            color: 'red',
        },
        {
            color: 'green',
        },
        {
            color: 'black',
        },
        {
            color: 'white',
        },
    ]);
    const renderItem = ({ item }: { item: ScrollViewProps }) => {
        return (
            <ScrollView contentContainerStyle={{ width: widthScale(375) }}>
                <View style={{ height: widthScale(1000), backgroundColor: item.color }}>
                    <Text>{item.color}</Text>
                </View>
            </ScrollView>
        );
    };
    return (
        <View style={{ flex: 1, marginTop: insets.top }}>
            <FlatList data={datas} renderItem={renderItem} horizontal pagingEnabled removeClippedSubviews />
        </View>
    );
};

export default BannerScrollViewScreen;
