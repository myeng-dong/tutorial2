import React from 'react';
import { Platform, Pressable, StatusBar, Text, View } from 'react-native';
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
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    flexWrap: 'wrap',
                }}>
                <Pressable
                    style={getWidthHeight(164, 175, {
                        padding: widthScale(20),
                        marginVertical: widthScale(20),
                        backgroundColor: 'rgba(235, 238, 250, 0.96)',
                        borderRadius: widthScale(10),
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
                        {`Animated elements ${'\n'}between screens!`}
                    </Text>
                </Pressable>
                <Pressable
                    style={getWidthHeight(164, 175, {
                        padding: widthScale(20),
                        marginVertical: widthScale(20),
                        backgroundColor: 'rgba(235, 238, 250, 0.96)',
                        borderRadius: widthScale(10),
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
                        {`This is Custom Locate ${'\n'}Animation for Marker!`}
                    </Text>
                </Pressable>
                <Pressable
                    style={getWidthHeight(164, 175, {
                        padding: widthScale(20),
                        marginVertical: widthScale(20),
                        backgroundColor: 'rgba(235, 238, 250, 0.96)',
                        borderRadius: widthScale(10),
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
            </View>
        </View>
    );
};

export default MainScreen;
