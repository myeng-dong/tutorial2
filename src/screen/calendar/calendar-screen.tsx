import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { CustomCalMine } from '../../components/custom-calendar';
import { CustomCalendarHorizonHeader } from '../../components/custom-calendar-horizon-header';
import { widthScale } from '../../common/util';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomCalendarScrollView } from '../../components/custom-calendar-scrollview';

const MyCalendarScreen = () => {
    const insets = useSafeAreaInsets();
    return (
        <View style={{ flex: 1, backgroundColor: '#fff', marginTop: insets.top }}>
            {/* <CustomCalMine /> */}
            <CustomCalendarScrollView />
        </View>
    );
};

export default MyCalendarScreen;
