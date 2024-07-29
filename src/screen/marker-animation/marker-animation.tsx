import React from 'react';
import { Platform, Pressable, StatusBar, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { NavigationParamsList } from '../../navigation/navigaions';
import FastImage from 'react-native-fast-image';
import { getWidthHeight } from '../../common/util';

const MarkerCoordinateScreen = () => {
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
                }}>
                <FastImage
                    style={getWidthHeight(375, 375)}
                    source={require('../../assets/icons/marker-back-icon.png')}
                />
            </View>
        </View>
    );
};

export default MarkerCoordinateScreen;
