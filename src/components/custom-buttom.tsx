import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { widthScale } from '../common/util';

export const AnimationButton = () => {
    const [progress, setProgress] = useState(0); // 셋팅
    const [pressIn, setPressIn] = useState(false);

    let animation = useRef(new Animated.Value(0));

    const width = animation.current.interpolate({
        inputRange: [0, 10], // 셋팅
        outputRange: ['0%', '100%'],
        extrapolate: 'clamp',
    });

    useEffect(() => {
        Animated.timing(animation.current, {
            toValue: progress,
            duration: pressIn ? 500 : 0,
            useNativeDriver: false,
        }).start();
    }, [pressIn]);

    return (
        <>
            <TouchableOpacity
                style={{
                    height: 100,
                    width: widthScale(375),
                    backgroundColor: '#222',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                onPressIn={() => [setPressIn(true), setProgress(10)]}
                onPressOut={() => [setPressIn(false), setProgress(0)]}
                delayLongPress={2000}
                onLongPress={() => console.log('성공')}
                activeOpacity={1}>
                <View style={[styles.progressBar, styles.absoluteFill]}>
                    <Animated.View style={{ backgroundColor: '#fff', width, opacity: 0.2 }}>
                        <Text style={{}}></Text>
                    </Animated.View>
                </View>
                <Text style={{ color: '#fff' }}>꾹 누르면 게이지가 찹니다.</Text>
                <Text style={{ color: '#fff', marginTop: 10 }}>꾹 누르면 게이지가 찹니다.</Text>
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Animated.View
                    style={{
                        width,
                        height: 100,
                        backgroundColor: 'violet',
                    }}
                />
                {/* <Pressable onPress={handlePress} title="Click me" /> */}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    absoluteFill: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    progressBar: {
        width: widthScale(375),
        zIndex: 1,
        // backgroundColor: '#888888',
    },
});
