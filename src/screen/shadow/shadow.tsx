import React from 'react';
import { Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getNavigation, getWidthHeight, widthScale } from '../../common/util';
import DropShadow from 'react-native-drop-shadow';
import { Shadow } from 'react-native-shadow-2';

export const ShadowScreen = () => {
    const insets = useSafeAreaInsets();
    const navigation = getNavigation();
    return (
        <View style={{ flex: 1, marginTop: insets.top }}>
            <View style={{ backgroundColor: 'rgb(233,227,240)', flex: 0.2 }}>
                <Pressable style={{}}></Pressable>
            </View>
            {/* DropShadow(Drop-Shadow) */}
            <View
                style={{
                    flex: 0.2,
                    backgroundColor: '#fff',
                    padding: widthScale(30),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                <DropShadow
                    style={{
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 4,
                            height: 8,
                        },
                        shadowOpacity: 0.1,
                        shadowRadius: 8,
                    }}>
                    <Text>123</Text>
                    <Text>123</Text>
                    <Text>123</Text>
                    <Text>123</Text>
                    <Text>123</Text>
                    <Text>123</Text>
                </DropShadow>
                <DropShadow
                    style={{
                        shadowColor: '#191919',
                        shadowOffset: {
                            width: 1,
                            height: 1,
                        },
                        shadowOpacity: 0.2,
                        shadowRadius: 1,
                    }}>
                    <View style={getWidthHeight(64, 64, { backgroundColor: 'rgb(246,242,249)' })}></View>
                </DropShadow>
                <DropShadow
                    style={{
                        shadowColor: '#191919',
                        shadowOffset: {
                            width: 2,
                            height: 2,
                        },
                        shadowOpacity: 0.2,
                        shadowRadius: 1,
                    }}>
                    <View style={getWidthHeight(64, 64, { backgroundColor: 'rgb(246,242,249)' })}></View>
                </DropShadow>
                <DropShadow
                    style={{
                        shadowColor: '#222',
                        shadowOffset: {
                            width: 2,
                            height: 2,
                        },
                        shadowOpacity: 0.3,
                        shadowRadius: 1,
                    }}>
                    <View style={getWidthHeight(64, 64, { backgroundColor: 'rgb(246,242,249)' })}></View>
                </DropShadow>
            </View>
            {/* Native */}
            <View
                style={{
                    flex: 0.2,
                    backgroundColor: '#fff',
                    padding: widthScale(30),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                <View>
                    <View
                        style={{
                            width: 64,
                            height: 64,
                            ...Platform.select({
                                ios: {
                                    shadowColor: '#222',
                                    shadowOffset: {
                                        width: 0,
                                        height: 1,
                                    },
                                    shadowOpacity: 0.22,
                                    shadowRadius: 2.22,
                                },
                                android: {
                                    elevation: 3,
                                },
                            }),
                            backgroundColor: 'rgb(246,242,249)',
                        }}
                    />
                    <Text style={{ paddingTop: widthScale(5), textAlign: 'center', fontSize: widthScale(10) }}>
                        elevation3
                    </Text>
                </View>
                <View>
                    <View style={getWidthHeight(64, 64, { backgroundColor: 'rgb(246,242,249)' })}></View>
                </View>
                <DropShadow
                    style={{
                        shadowColor: '#222',
                        shadowOffset: {
                            width: 2,
                            height: 2,
                        },
                        shadowOpacity: 0.2,
                        shadowRadius: 1,
                    }}>
                    <View style={getWidthHeight(64, 64, { backgroundColor: 'rgb(246,242,249)' })}></View>
                </DropShadow>
                <DropShadow
                    style={{
                        shadowColor: '#222',
                        shadowOffset: {
                            width: 2,
                            height: 2,
                        },
                        shadowOpacity: 0.3,
                        shadowRadius: 1,
                    }}>
                    <View style={getWidthHeight(64, 64, { backgroundColor: 'rgb(246,242,249)' })}></View>
                </DropShadow>
            </View>
            <DropShadow
                style={{
                    flex: 1,
                    shadowColor: '#191919',
                    shadowOffset: {
                        width: 0,
                        height: 3,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 4,
                }}>
                <View style={{ flex: 1 }}>
                    <ScrollView>
                        <View>
                            <Text>123</Text>
                        </View>
                    </ScrollView>
                </View>
            </DropShadow>
            <View style={{ backgroundColor: '#fff', height: widthScale(55) }}>
                <Pressable
                    onPress={() => {
                        navigation.navigate('ShadowCopyScreen', {});
                    }}>
                    <View style={{ backgroundColor: '#fff', height: widthScale(55) }}>
                        <Text>123</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    );
};

export const ShadowCopyScreen = () => {
    const insets = useSafeAreaInsets();
    const shadowBoxRender = () => {
        return (
            <Shadow distance={widthScale(1)} startColor={'#191919'} endColor={'#fff'} offset={[0, 0]}>
                <View
                    style={{
                        borderTopStartRadius: 24,
                        borderBottomEndRadius: 0,
                        borderRadius: 10,
                        backgroundColor: '#c454f0dd',
                    }}>
                    <Text style={{ margin: 20, fontSize: 20 }}>🤯</Text>
                </View>
            </Shadow>
        );
    };
    return (
        <View style={{ backgroundColor: '#fff', flex: 1, paddingTop: insets.top }}>
            <ScrollView style={{ backgroundColor: '#FFF' }}>
                <View style={{ padding: widthScale(16) }}>{[0, 1, 2].map(shadowBoxRender)}</View>
            </ScrollView>
            <View
                style={{
                    height: widthScale(33),
                    backgroundColor: '#FFF',
                    ...Platform.select({
                        ios: {
                            shadowColor: '#000',
                            blur: 15,
                            shadowOffset: {
                                width: 0,
                                height: 0,
                            },
                            shadowOpacity: 0.06,
                            shadowRadius: widthScale(6.5),
                        },
                        android: {
                            elevation: 24,
                        },
                    }),
                }}></View>
        </View>
    );
};
