import React from 'react';
import { Platform, Pressable, ScrollView, StatusBar, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getWidthHeight, widthScale } from '../common/util';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { NavigationParamsList } from '../navigation/navigaions';

const MainScreen = () => {
    const insets = useSafeAreaInsets();

    const navigation = useNavigation<NavigationProp<NavigationParamsList>>();
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
            </ScrollView>
        </View>
    );
};

export default MainScreen;
