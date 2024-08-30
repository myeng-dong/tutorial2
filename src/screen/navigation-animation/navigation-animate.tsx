import React, { useEffect, useRef, useState } from 'react';
import {
    Animated as NativeAnimated,
    NativeScrollEvent,
    NativeSyntheticEvent,
    PanResponder,
    Platform,
    Pressable,
    ScrollView,
    StatusBar,
    Text,
    View,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getNavigation, widthScale } from '../../common/util';

export const NavigationAnimateParentScreen = () => {
    const insets = useSafeAreaInsets();
    const navigation = getNavigation();
    const [urls] = useState([{ uri: 'https://picsum.photos/id/39/200' }, { uri: 'https://picsum.photos/id/39/200' }]);
    return (
        <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: insets.top }}>
            {Platform.OS == 'ios' && <StatusBar barStyle={'dark-content'} />}
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Pressable
                    style={{ paddingVertical: widthScale(20) }}
                    onPress={() => {
                        navigation.navigate('NavigationAnimateChildrenScreen', {});
                    }}>
                    <Text style={{ fontSize: widthScale(18), fontWeight: 700 }}>Click This!</Text>
                    <Animated.Image
                        source={{ uri: 'https://picsum.photos/id/39/200' }}
                        style={{
                            width: widthScale(300),
                            height: widthScale(300),
                        }}
                        sharedTransitionTag="tag"
                    />
                </Pressable>
            </View>
        </View>
    );
};

export const NavigationAnimateChildrenScreen = () => {
    const insets = useSafeAreaInsets();
    const navigation = getNavigation();
    const [visible, setVisible] = useState(false);
    const [scrollEnabled, setScrollEnabled] = useState(true);
    const [isScroll, setIsScroll] = useState(false);
    const pan = useRef(new NativeAnimated.ValueXY()).current;
    const fadeAnim = React.useRef(new NativeAnimated.Value(1)).current;
    const [page, setPage] = useState(0);

    useEffect(() => {
        console.log(pan.x);
    }, [pan]);

    useEffect(() => {
        pan.addListener((value) => {
            if (value.y > 0) {
                fadeAnim.setValue(1 - value.y / 300);
                if (1 - value.y / 300 < 0) {
                    navigation.goBack();
                }
            }
            if (value.y < 0) {
                fadeAnim.setValue(1 + value.y / 300);
                if (1 + value.y / 300 < 0) {
                    navigation.goBack();
                }
            }
            if (value.y === 0) {
                setScrollEnabled(true);
            } else {
                setScrollEnabled(false);
            }
        });

        return () => {
            pan.removeAllListeners();
        };
    }, []);

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: NativeAnimated.event([
            null,
            {
                dy: pan.y,
            },
        ]),
        onPanResponderRelease: () => {
            NativeAnimated.spring(
                pan, // Auto-multiplexed
                { toValue: { x: 0, y: 0 }, useNativeDriver: false }, // Back to zero
            ).start();
        },
    });
    const panResponder2 = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: NativeAnimated.event([
            null,
            {
                dx: pan.x,
            },
        ]),
        onPanResponderRelease: () => {
            NativeAnimated.spring(
                pan, // Auto-multiplexed
                { toValue: { x: 0, y: 0 }, useNativeDriver: false }, // Back to zero
            ).start();
        },
    });

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentWidth = widthScale(375);
        setPage(event.nativeEvent.contentOffset.x / contentWidth);
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#000' }}>
            {Platform.OS == 'ios' && <StatusBar barStyle={'dark-content'} />}

            <View style={[{ flex: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center' }]}>
                <ScrollView horizontal nestedScrollEnabled>
                    <ScrollView
                        horizontal={true}
                        style={{}}
                        scrollEnabled={false}
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled={true}
                        nestedScrollEnabled
                        snapToInterval={widthScale(375)}
                        onScrollBeginDrag={(eve) => {
                            console.log('start');
                            setIsScroll(true);
                        }}
                        onScrollEndDrag={(eve) => {
                            console.log('end');
                            setIsScroll(false);
                        }}
                        removeClippedSubviews
                        onScroll={handleScroll}>
                        <NativeAnimated.View
                            style={{ flexDirection: 'row', alignItems: 'center' }}
                            {...(panResponder2.panHandlers, panResponder.panHandlers)}>
                            <NativeAnimated.View
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    opacity: fadeAnim,
                                    backgroundColor: '#000',
                                }}>
                                <NativeAnimated.View
                                    key={10}
                                    style={[
                                        {
                                            width: widthScale(375),
                                        },
                                        pan.getLayout(),
                                    ]}>
                                    <Animated.Image
                                        source={{
                                            uri: 'https://picsum.photos/id/39/200',
                                        }}
                                        style={{
                                            width: widthScale(375),
                                            height: widthScale(375),
                                        }}
                                        resizeMode="contain"
                                        sharedTransitionTag="tag"
                                    />
                                </NativeAnimated.View>
                            </NativeAnimated.View>
                            {/* <NativeAnimated.View
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    opacity: fadeAnim,
                                    backgroundColor: '#000',
                                }}>
                                <NativeAnimated.View
                                    key={10}
                                    {...panResponder.panHandlers}
                                    style={[
                                        {
                                            width: widthScale(375),
                                        },
                                        pan.getLayout(),
                                    ]}>
                                    <Animated.Image
                                        source={{
                                            uri: 'https://img.freepik.com/free-photo/beautiful-tree-canopy-perspective-with-nature-landscape_23-2151305154.jpg?size=626&ext=jpg&ga=GA1.1.677716587.1722231872&semt=ais_user',
                                        }}
                                        style={{
                                            width: widthScale(375),
                                            height: widthScale(375),
                                        }}
                                        resizeMode="contain"
                                        // sharedTransitionTag="tag"
                                    />
                                </NativeAnimated.View>
                            </NativeAnimated.View> */}
                        </NativeAnimated.View>
                    </ScrollView>
                </ScrollView>
            </View>
            <Pressable
                style={{ position: 'absolute' }}
                onPress={() => {
                    navigation.goBack();
                }}>
                <View
                    style={{
                        borderRadius: widthScale(15),
                        paddingLeft: widthScale(16),
                        marginTop: insets.top,
                    }}>
                    <Text style={{ color: '#1E90FF', fontSize: 20 }}>Back</Text>
                </View>
            </Pressable>
            <NativeAnimated.View
                style={{ position: 'absolute', top: widthScale(100), alignSelf: 'center', opacity: fadeAnim }}>
                <Text
                    style={{
                        color: '#FFF',
                        marginTop: insets.top,
                        fontSize: widthScale(20),
                    }}>
                    Swipe Up Or Down!!
                </Text>
            </NativeAnimated.View>
        </View>
    );
};
