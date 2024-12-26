import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaskedView from '@react-native-masked-view/masked-view';
// import * as Animatable from 'react-native-animatable';
import { AnimationButton } from '../../components/custom-buttom';
// import LinearGradient from 'react-native-linear-gradient';
import { getNavigation, getTextStyles, widthScale } from '../../common/util';

import { faker } from '@faker-js/faker';
import { MotiView } from 'moti';
import React, { useEffect, useRef, useState } from 'react';
import {
    Button,
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions,
    type ViewToken,
} from 'react-native';
import Animated, {
    Extrapolation,
    interpolate,
    scrollTo,
    useAnimatedRef,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    type SharedValue,
} from 'react-native-reanimated';

const FROM_COLOR = 'rgb(255, 255, 255)';
const TO_COLOR = 'rgb(0,102,84)';
const MaskedTextScreen = () => {
    const x = useSharedValue(0);
    const animals = ['cat', 'dog', 'any', 'may', 'buy', 'but'];
    const [data, setData] = useState(animals);
    const { width } = useWindowDimensions();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [paginationIndex, setPaginationIndex] = useState(0);
    const ref = useAnimatedRef<FlatList>();
    const [isAutoPlay, setIsAutoPlay] = useState(true);
    const interval = useRef();
    const offset = useSharedValue(0);

    console.log('CURRENT_CAROUSEL_ITEM👉', paginationIndex);
    const onViewableItemsChanged = (viewableItems: any) => {
        if (viewableItems[0].index !== undefined && viewableItems[0].index !== null) {
            setCurrentIndex(viewableItems[0].index);
            setPaginationIndex(viewableItems[0].index % animals.length);
        }
    };

    useEffect(() => {
        console.log(data);
    }, [data]);

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 50,
    };

    const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig, onViewableItemsChanged }]);

    const onScroll = useAnimatedScrollHandler({
        onScroll: (e) => {
            x.value = e.contentOffset.x;
        },
        onMomentumEnd: (e) => {
            offset.value = e.contentOffset.x;
        },
    });

    useDerivedValue(() => {
        scrollTo(ref, offset.value, 0, true);
    });

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <MaskedView
                    style={{ flex: 1 }}
                    maskElement={
                        <View
                            style={{
                                // Transparent background because mask is based off alpha channel.
                                backgroundColor: 'transparent',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Text
                                style={{
                                    fontSize: 20,
                                    color: 'black',
                                    fontWeight: 'bold',
                                }}>
                                Basic Mask
                            </Text>
                        </View>
                    }>
                    {/* Shows behind the mask, you can put anything here, such as an image */}
                    <View style={{ flex: 1, height: '100%', backgroundColor: '#324376' }} />
                    <View style={{ flex: 1, height: '100%', backgroundColor: '#e1e1e1' }} />
                </MaskedView>
            </View>
            {/* <Animated.FlatList
                ref={ref}
                style={{ height: 194, flexGrow: 0 }}
                onScrollBeginDrag={() => {
                    setIsAutoPlay(false);
                }}
                onScrollEndDrag={() => {
                    setIsAutoPlay(true);
                }}
                onScroll={onScroll}
                scrollEventThrottle={16}
                horizontal
                bounces={false}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                onEndReached={() => setData([...data, ...animals])}
                onEndReachedThreshold={0.5}
                data={data}
                keyExtractor={(_, index) => `list_item${index}`}
                renderItem={({ item, index }) => {
                    return <RenderItem item={item} index={index} x={x} />;
                }}
            /> */}
        </View>
    );
};

export default MaskedTextScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 14,
    },
    titleImage: {
        width: widthScale(375) - 32, // adjust the width of the image and horizontal padding
        height: 194,
        alignSelf: 'center',
        borderRadius: 16,
    },
});

const RenderItem = ({ item, index, x }: { item: string; index: number; x: SharedValue<number> }) => {
    const { width } = useWindowDimensions();

    const animatedStyle = useAnimatedStyle(() => {
        const opacityAnim = interpolate(
            x.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [-0.3, 1, -0.3],
            Extrapolation.CLAMP,
        );
        return {
            opacity: opacityAnim,
        };
    });

    return (
        <View style={{ width }}>
            <Animated.View style={[styles.titleImage, animatedStyle, { backgroundColor: 'red' }]} />
        </View>
    );
};
