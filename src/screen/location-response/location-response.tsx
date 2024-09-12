import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Pressable, TouchableHighlight, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getWidthHeight, widthScale } from '../../common/util';
import LottieView from 'lottie-react-native';

const LocationResponse = () => {
    const insets = useSafeAreaInsets();
    const animationRef = useRef<LottieView>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            animationRef?.current?.play(30, 115);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <View
            style={{
                flex: 1,
                marginTop: insets.top,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            {/* <View style={{ alignItems: 'center' }}>
                <View style={{ backgroundColor: '#fff' }}>
                    <View
                        style={{
                            position: 'absolute',
                            height: widthScale(32),
                            backgroundColor: '#F5F5F5',
                            top: 72,
                            left: 0,
                            right: 0,
                        }}
                    />
                    <DatePicker
                        is24hourSource="locale"
                        date={new Date()}
                        mode="time"
                        androidVariant="iosClone"
                        fadeToColor="#fff"
                    />
                </View>
            </View> */}
            <LottieView
                ref={animationRef}
                colorFilters={[
                    {
                        keypath: 'button',
                        color: '#F00000',
                    },
                    {
                        keypath: 'Sending Loader',
                        color: '#F00000',
                    },
                ]}
                style={getWidthHeight(137, 137)}
                source={require('../../assets/lotties/example.json')}
                loop={false}
            />
        </View>
    );
};

export default LocationResponse;
