import React from 'react';
import { View } from 'react-native';
import { CustomCalMine } from '../../components/custom-calendar';

const MyCalendarScreen = () => {
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <CustomCalMine />
        </View>
    );
};

export default MyCalendarScreen;
