import React, { useEffect, useRef, useState } from 'react';
import {
    Image,
    PanResponderGestureState,
    Platform,
    Pressable,
    ScrollView,
    StatusBar,
    Text,
    View,
    Animated as NativeAnimated,
    PanResponder,
    NativeSyntheticEvent,
    NativeScrollEvent,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getNavigation, getWidthHeight, widthScale } from '../../common/util';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { NavigationParamsList } from '../../navigation/navigaions';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import GestureRecognizer from 'react-native-swipe-gestures';

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

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { contentOffset } = event.nativeEvent;
        // console.log('Current scroll position:', widthScale(contentOffset.x));
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {Platform.OS == 'ios' && <StatusBar barStyle={'dark-content'} />}

            <View style={[{ flex: 1, backgroundColor: '#fff' }]}>
                <ScrollView
                    horizontal={true}
                    scrollEnabled={scrollEnabled}
                    style={{}}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    snapToInterval={widthScale(375)}
                    onScrollBeginDrag={(eve) => {
                        console.log('start');
                        setIsScroll(true);
                    }}
                    onScrollEndDrag={(eve) => {
                        console.log('end');
                        setIsScroll(false);
                    }}
                    onScroll={handleScroll}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <NativeAnimated.View
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
                        <NativeAnimated.View
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
                                        uri: 'https://picsum.photos/id/39/200',
                                    }}
                                    style={{
                                        width: widthScale(375),
                                        height: widthScale(375),
                                    }}
                                    resizeMode="contain"
                                    // sharedTransitionTag="tag"
                                />
                            </NativeAnimated.View>
                        </NativeAnimated.View>
                    </View>
                </ScrollView>
            </View>
            <Pressable
                style={{ position: 'absolute' }}
                onPress={() => {
                    navigation.goBack();
                }}>
                <View
                    style={getWidthHeight(30, 30, {
                        borderRadius: widthScale(15),
                        backgroundColor: 'red',
                        marginTop: insets.top,
                    })}
                />
            </Pressable>
        </View>
    );
};
