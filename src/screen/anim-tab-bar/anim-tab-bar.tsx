import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Pressable, Text, View, type ViewToken } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getTextStyles, getWidthHeight, widthScale } from '../../common/util';
import { ImageSlider } from '../../common/variables/dummys';
import SliderItem from './sliderItem';
import Animated, {
    interpolate,
    scrollTo,
    useAnimatedRef,
    useAnimatedScrollHandler,
    useDerivedValue,
    useSharedValue,
} from 'react-native-reanimated';
import Pagination from './pagination';

const AnimTabBarScreen = () => {
    const insets = useSafeAreaInsets();
    const { width } = Dimensions.get('window');

    const scrollX = useSharedValue(width * 2);
    const [paginationIdx, setPaginationIdx] = useState(0);
    const [data, setData] = useState([
        ImageSlider[ImageSlider.length - 2],
        ImageSlider[ImageSlider.length - 1],
        ...ImageSlider,
        ImageSlider[0],
        ImageSlider[1],
    ]);
    const ref = useAnimatedRef<Animated.FlatList<any>>();
    const [isAutoPlay, setIsAutoPlay] = useState(false);
    const interval = useRef<NodeJS.Timeout>();
    const scrollEnable = useRef(true);
    const offset = useSharedValue(0);
    // 현재 스크롤된 값을 리턴
    const onScrollHandler = useAnimatedScrollHandler({
        onScroll: (e) => {
            scrollX.value = e.contentOffset.x;
        },
    });

    useEffect(() => {
        console.log(paginationIdx);
    }, [paginationIdx]);

    useEffect(() => {
        // console.log(scrollX.value);
        if (paginationIdx == data.length - 2) {
            // console.log('호출1 ' + scrollX.value + '  ' + width * (data.length - 2));
            scrollX.value = width * 2;
            // scrollEnable.current = false;
            // setTimeout(() => (scrollEnable.current = true), 200);
        }
        if (paginationIdx == 1) {
            scrollX.value = width * (data.length - 3);
            // setPaginationIdx(data.length - 2);
            // scrollEnable.current = false;
            // setTimeout(() => (scrollEnable.current = true), 200);
        }
        // if (paginationIdx == 2) {
        //     scrollEnable.current = true;
        // }
    }, [paginationIdx]);

    useDerivedValue(() => {
        scrollTo(ref, scrollX.value, 0, false);
    }, []);

    useEffect(() => {
        if (isAutoPlay == true) {
            interval.current = setInterval(() => {
                offset.value = offset.value + width;
            }, 2000);
        } else {
            clearInterval(interval.current);
        }
        return () => {
            clearInterval(interval.current);
        };
    }, [isAutoPlay, offset, width]);

    // pagination
    const onViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
        if (viewableItems[0]?.index != undefined) {
            setPaginationIdx(viewableItems[0].index % (data.length - 2));
        }
    };

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 120,
    };

    const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig, onViewableItemsChanged }]);

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: insets.top,
                backgroundColor: '#fff',
            }}>
            <Pressable
                style={getWidthHeight(40, 40, { backgroundColor: '#222' })}
                onPress={() => {
                    setIsAutoPlay(!isAutoPlay);
                }}>
                <Text style={getTextStyles('MD', '#fff', 13, 16)}>자동재생</Text>
            </Pressable>
            <View>
                <Animated.FlatList
                    ref={ref}
                    horizontal
                    scrollEnabled={scrollEnable.current}
                    pagingEnabled
                    decelerationRate={0.85}
                    showsHorizontalScrollIndicator={false}
                    style={{}}
                    data={data}
                    renderItem={({ item, index }) => {
                        return <SliderItem item={item} index={index} scrollX={scrollX} />;
                    }}
                    onScroll={onScrollHandler}
                    removeClippedSubviews={false}
                    viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                    scrollEventThrottle={16}
                    // onScrollBeginDrag={() => {
                    //     setIsAutoPlay(false);
                    // }}
                    // onScrollEndDrag={() => {
                    //     setIsAutoPlay(true);
                    // }}
                />
                <Pagination items={data} scrollX={scrollX} paginationIdx={paginationIdx} />
            </View>
        </View>
    );
};

export default AnimTabBarScreen;
