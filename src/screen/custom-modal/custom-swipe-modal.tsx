import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    NativeScrollEvent,
    NativeSyntheticEvent,
    Pressable,
    ScrollView,
    Text,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { widthScale, getWidthHeight } from '../../common/util';
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image';
import ImageZoom from 'react-native-image-pan-zoom';
import CustomRenderImage from './custom-render-image';

const CustomModalScreen = () => {
    const insets = useSafeAreaInsets();
    const [visible, setVisible] = useState(false);
    const [page, setPage] = useState(0);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentWidth = widthScale(375);
        setPage(event.nativeEvent.contentOffset.x / contentWidth);
    };

    return (
        <View style={{ flex: 1, marginTop: insets.top }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Pressable
                    onPress={() => {
                        setVisible(true);
                    }}
                    style={getWidthHeight(200, 200, {
                        backgroundColor: '#000',
                        alignItems: 'center',
                        justifyContent: 'center',
                    })}>
                    <Text
                        style={{
                            color: '#fff',
                            fontSize: widthScale(20),
                            textAlign: 'center',
                        }}>{`Click Me!! ${'\n'}Open Modal`}</Text>
                </Pressable>
            </View>
            <Modal
                isVisible={visible}
                swipeDirection={['down', 'up']}
                onSwipeComplete={() => {
                    setVisible(false);
                }}
                onBackButtonPress={() => {
                    setVisible(false);
                }}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <ScrollView
                        horizontal
                        style={{ width: widthScale(375) }}
                        contentContainerStyle={{ alignItems: 'center' }}
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        onScroll={handleScroll}>
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <View style={{ flex: 1, flexDirection: 'row' }} onStartShouldSetResponder={() => true}>
                                <View style={{ width: widthScale(375), justifyContent: 'center' }}>
                                    <CustomRenderImage uri="https://cdn.pixabay.com/photo/2016/10/16/07/29/the-eiffel-tower-1744574_640.jpg" />
                                </View>
                                <View style={{ width: widthScale(375), justifyContent: 'center' }}>
                                    <CustomRenderImage uri="https://cdn.pixabay.com/photo/2017/08/07/00/24/sea-2597926_640.jpg" />
                                </View>
                                <View style={{ width: widthScale(375), justifyContent: 'center' }}>
                                    <CustomRenderImage uri="https://cdn.pixabay.com/photo/2017/06/14/07/05/siberian-2401287_640.jpg" />
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        </View>
    );
};

export default CustomModalScreen;
