import React, { useEffect } from 'react';
import { Platform, Pressable, ScrollView, StatusBar, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getWidthHeight, widthScale } from '../common/util';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { NavigationParamsList } from '../navigation/navigaions';
import SplashScreen from 'react-native-splash-screen';

const MainScreen = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<NavigationProp<NavigationParamsList>>();
    useEffect(() => {
        SplashScreen.hide();
    }, []);
    return (
        <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: insets.top }}>
            {Platform.OS == 'ios' && <StatusBar barStyle={'dark-content'} />}
            <ScrollView
                style={{
                    flex: 1,
                }}
                contentContainerStyle={{ flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
                <Pressable
                    style={getWidthHeight(164, 175, {
                        padding: widthScale(20),
                        marginVertical: widthScale(20),
                        backgroundColor: 'rgba(235, 238, 250, 0.96)',
                        borderRadius: widthScale(10),
                        justifyContent: 'center',
                    })}
                    onPress={() => {
                        navigation.navigate('ExampleScreen', {});
                    }}>
                    <Text
                        style={{
                            fontSize: widthScale(18),
                            fontWeight: 700,
                            textAlign: 'center',
                        }}>
                        {`Example List`}
                    </Text>
                </Pressable>
                <Pressable
                    style={getWidthHeight(164, 175, {
                        padding: widthScale(20),
                        marginVertical: widthScale(20),
                        backgroundColor: 'rgba(235, 238, 250, 0.96)',
                        borderRadius: widthScale(10),
                        justifyContent: 'center',
                    })}
                    onPress={() => {
                        navigation.navigate('NavigationAnimateParentScreen', {});
                    }}>
                    <Text
                        style={{
                            fontSize: widthScale(18),
                            fontWeight: 700,
                            textAlign: 'center',
                        }}>
                        {`Screen Animate`}
                    </Text>
                </Pressable>
                <Pressable
                    style={getWidthHeight(164, 175, {
                        padding: widthScale(20),
                        marginVertical: widthScale(20),
                        backgroundColor: 'rgba(235, 238, 250, 0.96)',
                        borderRadius: widthScale(10),
                        justifyContent: 'center',
                    })}
                    onPress={() => {
                        navigation.navigate('MarkerCoordinateScreen', {});
                    }}>
                    <Text
                        style={{
                            fontSize: widthScale(18),
                            fontWeight: 700,
                            textAlign: 'center',
                        }}>
                        {`This is Custom Locate ${'\n'}Animation for Marker!`}
                    </Text>
                </Pressable>
                <Pressable
                    style={getWidthHeight(164, 175, {
                        padding: widthScale(20),
                        marginVertical: widthScale(20),
                        backgroundColor: 'rgba(235, 238, 250, 0.96)',
                        borderRadius: widthScale(10),
                        justifyContent: 'center',
                    })}
                    onPress={() => {
                        navigation.navigate('MyCalendarScreen', {});
                    }}>
                    <Text
                        style={{
                            fontSize: widthScale(18),
                            fontWeight: 700,
                            textAlign: 'center',
                        }}>
                        {`This is Custom Calendar ${'\n'} You want see to click this!`}
                    </Text>
                </Pressable>
                <Pressable
                    style={getWidthHeight(164, 175, {
                        padding: widthScale(20),
                        marginVertical: widthScale(20),
                        backgroundColor: 'rgba(235, 238, 250, 0.96)',
                        borderRadius: widthScale(10),
                        justifyContent: 'center',
                    })}
                    onPress={() => {
                        navigation.navigate('NestedScrollViewScreen', {});
                    }}>
                    <Text
                        style={{
                            fontSize: widthScale(18),
                            fontWeight: 700,
                            textAlign: 'center',
                        }}>
                        {`NestedScrollViewScreen`}
                    </Text>
                </Pressable>
                <Pressable
                    style={getWidthHeight(164, 175, {
                        padding: widthScale(20),
                        marginVertical: widthScale(20),
                        backgroundColor: 'rgba(235, 238, 250, 0.96)',
                        borderRadius: widthScale(10),
                        justifyContent: 'center',
                    })}
                    onPress={() => {
                        navigation.navigate('CustomModalScreen', {});
                    }}>
                    <Text
                        style={{
                            fontSize: widthScale(18),
                            fontWeight: 700,
                            textAlign: 'center',
                        }}>
                        {`React Native Modal`}
                    </Text>
                </Pressable>
                <Pressable
                    style={getWidthHeight(164, 175, {
                        padding: widthScale(20),
                        marginVertical: widthScale(20),
                        backgroundColor: 'rgba(235, 238, 250, 0.96)',
                        borderRadius: widthScale(10),
                        justifyContent: 'center',
                    })}
                    onPress={() => {
                        navigation.navigate('CodingTestScreen', {});
                    }}>
                    <Text
                        style={{
                            fontSize: widthScale(18),
                            fontWeight: 700,
                            textAlign: 'center',
                        }}>
                        {`Coding Test Memo`}
                    </Text>
                </Pressable>
                <Pressable
                    style={getWidthHeight(164, 175, {
                        padding: widthScale(20),
                        marginVertical: widthScale(20),
                        backgroundColor: 'rgba(235, 238, 250, 0.96)',
                        borderRadius: widthScale(10),
                        justifyContent: 'center',
                    })}
                    onPress={() => {
                        navigation.navigate('ShadowScreen', {});
                    }}>
                    <Text
                        style={{
                            fontSize: widthScale(18),
                            fontWeight: 700,
                            textAlign: 'center',
                        }}>
                        {`Shadow in React Native`}
                    </Text>
                </Pressable>
                <Pressable
                    style={getWidthHeight(164, 175, {
                        padding: widthScale(20),
                        marginVertical: widthScale(20),
                        backgroundColor: 'rgba(235, 238, 250, 0.96)',
                        borderRadius: widthScale(10),
                        justifyContent: 'center',
                    })}
                    onPress={() => {
                        navigation.navigate('ChartScreen', {});
                    }}>
                    <Text
                        style={{
                            fontSize: widthScale(18),
                            fontWeight: 700,
                            textAlign: 'center',
                        }}>
                        {`Chart Library Usable`}
                    </Text>
                </Pressable>
                <Pressable
                    style={getWidthHeight(164, 175, {
                        padding: widthScale(20),
                        marginVertical: widthScale(20),
                        backgroundColor: 'rgba(235, 238, 250, 0.96)',
                        borderRadius: widthScale(10),
                        justifyContent: 'center',
                    })}
                    onPress={() => {
                        navigation.navigate('LocationResponse', {});
                    }}>
                    <Text
                        style={{
                            fontSize: widthScale(18),
                            fontWeight: 700,
                            textAlign: 'center',
                        }}>
                        {`Now OnTouch Location Return`}
                    </Text>
                </Pressable>
                <Pressable
                    style={getWidthHeight(164, 175, {
                        padding: widthScale(20),
                        marginVertical: widthScale(20),
                        backgroundColor: 'rgba(235, 238, 250, 0.96)',
                        borderRadius: widthScale(10),
                        justifyContent: 'center',
                    })}
                    onPress={() => {
                        navigation.navigate('BannerScrollViewScreen', {});
                    }}>
                    <Text
                        style={{
                            fontSize: widthScale(18),
                            fontWeight: 700,
                            textAlign: 'center',
                        }}>
                        {`Banner ScrollView`}
                    </Text>
                </Pressable>
                <Pressable
                    style={getWidthHeight(164, 175, {
                        padding: widthScale(20),
                        marginVertical: widthScale(20),
                        backgroundColor: 'rgba(235, 238, 250, 0.96)',
                        borderRadius: widthScale(10),
                        justifyContent: 'center',
                    })}
                    onPress={() => {
                        navigation.navigate('BannerScrollViewScreen', {});
                    }}>
                    <Text
                        style={{
                            fontSize: widthScale(18),
                            fontWeight: 700,
                            textAlign: 'center',
                        }}>
                        {`휴대폰 구매 계산기`}
                    </Text>
                </Pressable>
                <Pressable
                    style={getWidthHeight(164, 175, {
                        padding: widthScale(20),
                        marginVertical: widthScale(20),
                        backgroundColor: 'rgba(235, 238, 250, 0.96)',
                        borderRadius: widthScale(10),
                        justifyContent: 'center',
                    })}
                    onPress={() => {
                        navigation.navigate('ChatKeyBoardScreen', {});
                    }}>
                    <Text
                        style={{
                            fontSize: widthScale(18),
                            fontWeight: 700,
                            textAlign: 'center',
                        }}>
                        {`채팅 키보드`}
                    </Text>
                </Pressable>
                <Pressable
                    style={getWidthHeight(164, 175, {
                        padding: widthScale(20),
                        marginVertical: widthScale(20),
                        backgroundColor: 'rgba(235, 238, 250, 0.96)',
                        borderRadius: widthScale(10),
                        justifyContent: 'center',
                    })}
                    onPress={() => {
                        navigation.navigate('MaskedTextScreen', {});
                    }}>
                    <Text
                        style={{
                            fontSize: widthScale(18),
                            fontWeight: 700,
                            textAlign: 'center',
                        }}>
                        {`MaskedText Memoh`}
                    </Text>
                </Pressable>
                <Pressable
                    style={getWidthHeight(164, 175, {
                        padding: widthScale(20),
                        marginVertical: widthScale(20),
                        backgroundColor: 'rgba(235, 238, 250, 0.96)',
                        borderRadius: widthScale(10),
                        justifyContent: 'center',
                    })}
                    onPress={() => {
                        navigation.navigate('AnimTabBarScreen', {});
                    }}>
                    <Text
                        style={{
                            fontSize: widthScale(18),
                            fontWeight: 700,
                            textAlign: 'center',
                        }}>
                        {`AnimTabBarScreen`}
                    </Text>
                </Pressable>
            </ScrollView>
        </View>
    );
};

export default MainScreen;
