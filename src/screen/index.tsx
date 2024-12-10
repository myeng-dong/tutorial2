import React, { useEffect, useState } from 'react';
import { FlatList, Platform, Pressable, ScrollView, StatusBar, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getWidthHeight, widthScale } from '../common/util';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { NavigationParamsList } from '../navigation/navigaions';
import SplashScreen from 'react-native-splash-screen';
interface MainProps {
    title: string;
    navigation: string;
}
const MainScreen = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<NavigationProp<NavigationParamsList>>();
    useEffect(() => {
        setTimeout(() => SplashScreen.hide(), 1000);
    }, []);

    const [naviProps, setNaviProps] = useState<MainProps[]>([
        { navigation: 'ExampleScreen', title: 'Example List' },
        { navigation: 'NavigationAnimateParentScreen', title: 'Screen Animate' },
        { navigation: 'MarkerCoordinateScreen', title: `This is Custom Locate ${'\n'}Animation for Marker!` },
        { navigation: 'MyCalendarScreen', title: `This is Custom Calendar ${'\n'} You want see to click this!` },
        { navigation: 'NestedScrollViewScreen', title: 'NestedScrollViewScreen' },
        { navigation: 'CustomModalScreen', title: `React Native Modal` },
        { navigation: 'CodingTestScreen', title: 'Coding Test Memo' },
        { navigation: 'ShadowScreen', title: 'Shadow in React Native' },
        { navigation: 'ChartScreen', title: 'Chart Library Usable' },
        { navigation: 'LocationResponse', title: 'Now OnTouch Location Return' },
        { navigation: 'BannerScrollViewScreen', title: 'Banner ScrollView' },
        { navigation: 'ChatKeyBoardScreen', title: 'ChatKeyBoardScreen' },
        { navigation: 'MaskedTextScreen', title: 'MaskedTextScreen' },
        { navigation: 'AnimTabBarScreen', title: 'AnimTabBarScreen' },
    ]);

    const navigationItems = ({ item, index }: { item: MainProps; index: number }) => {
        const flag = index % 2 == 0;
        return (
            <Pressable
                key={index}
                style={getWidthHeight(164, 175, {
                    padding: widthScale(20),
                    marginVertical: widthScale(20),
                    backgroundColor: 'rgba(235, 238, 250, 0.96)',
                    borderRadius: widthScale(10),
                    justifyContent: 'center',
                    marginLeft: widthScale(flag ? 0 : 10),
                })}
                onPress={() => {
                    //@ts-ignore
                    navigation.navigate(item.navigation, {});
                }}>
                <Text
                    style={{
                        fontSize: widthScale(18),
                        fontWeight: 700,
                        textAlign: 'center',
                    }}>
                    {item.title}
                </Text>
            </Pressable>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: insets.top }}>
            {Platform.OS == 'ios' && <StatusBar barStyle={'dark-content'} />}
            <FlatList
                data={naviProps}
                renderItem={navigationItems}
                contentContainerStyle={{
                    alignItems: 'center',
                }}
                numColumns={2}
            />
        </View>
    );
};

export default MainScreen;
