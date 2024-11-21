import React from 'react';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { getTextStyles, getWidthHeight } from '../../common/util';
import ICONS from '../../common/variables/icons';

const TrabScreen = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#222' }}>
            <FastImage style={getWidthHeight(375, 375)} source={ICONS.TRAP} />
            <Text style={getTextStyles('SB', '#fff', 50, 24, { paddingTop: 70 })}>ㅋㅋ</Text>
        </View>
    );
};

export default TrabScreen;
