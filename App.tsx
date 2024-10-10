import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { KeyboardAvoidingView, Platform, StatusBar, Text, useColorScheme, View } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import MainScreen from './src/screen';
import { AppStackNavigationFNC } from './src/navigation/navigaions';

const App = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const Stack = createNativeStackNavigator();
    useEffect(() => {
        (Text as any).defaultProps = {
            ...((Text as any).defaultProps || {}),
            allowFontScaling: false,
        };
        StatusBar.setBarStyle('dark-content', true);
        if (Platform.OS == 'android') {
            StatusBar.setTranslucent(true);
            StatusBar.setBackgroundColor('transparent');
        }
    }, []);

    return <AppStackNavigationFNC />;
};

// const test = {
//     a: 123,
//     b: 'qwe',
// };
// type A = typeof test;
// type B = keyof typeof test;
// type A = 'a' | 'b' | 'c';
// const test: { [_ in A]: string } = {
//     a: 'qwe',
//     b: '123',
//     c: 'aaa',
// };

export default App;
