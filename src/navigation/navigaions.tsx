import * as React from 'react';
import { View, Text } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../screen';
import {
    NavigationAnimateParentScreen,
    NavigationAnimateChildrenScreen,
} from '../screen/navigation-animation/navigation-animate';
import MyCalendarScreen from '../screen/calendar/calendar-screen';

export type NavigationParamsList = {
    MainScreen: {};
    NavigationAnimateParentScreen: {};
    NavigationAnimateChildrenScreen: {};
    MyCalendarScreen: {};
};

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
    },
};

const Stack = createNativeStackNavigator<NavigationParamsList>();
export const AppStackNavigationFNC = () => {
    return (
        <NavigationContainer theme={MyTheme}>
            <Stack.Navigator>
                <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
                <Stack.Screen
                    name="NavigationAnimateParentScreen"
                    component={NavigationAnimateParentScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="NavigationAnimateChildrenScreen"
                    component={NavigationAnimateChildrenScreen}
                    options={{
                        headerShown: false,
                        presentation: 'containedTransparentModal',
                    }}
                />
                <Stack.Screen
                    name="MyCalendarScreen"
                    component={MyCalendarScreen}
                    options={{
                        headerShown: false,
                        presentation: 'containedTransparentModal',
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
