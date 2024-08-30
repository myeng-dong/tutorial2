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
import MarkerCoordinateScreen from '../screen/marker-animation/marker-animation';
import NestedScrollViewScreen from '../screen/nested-scrollview/nested-scrollview';
import CustomModalScreen from '../screen/custom-modal/custom-swipe-modal';
import CodingTestScreen from '../screen/codingtest-memo.tsx/coding';
import { ShadowCopyScreen, ShadowScreen } from '../screen/shadow/shadow';
import ChartScreen from '../screen/chart/chart';

export type NavigationParamsList = {
    MainScreen: {};
    NavigationAnimateParentScreen: {};
    NavigationAnimateChildrenScreen: {};
    MarkerCoordinateScreen: {};
    MyCalendarScreen: {};
    NestedScrollViewScreen: {};
    CustomModalScreen: {};
    CodingTestScreen: {};
    ShadowScreen: {};
    ShadowCopyScreen: {};
    ChartScreen: {};
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
                    name="MarkerCoordinateScreen"
                    component={MarkerCoordinateScreen}
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
                <Stack.Screen
                    name="NestedScrollViewScreen"
                    component={NestedScrollViewScreen}
                    options={{
                        headerShown: false,
                        presentation: 'containedTransparentModal',
                    }}
                />
                <Stack.Screen
                    name="CustomModalScreen"
                    component={CustomModalScreen}
                    options={{
                        headerShown: false,
                        // presentation: 'containedTransparentModal',
                    }}
                />
                <Stack.Screen
                    name="CodingTestScreen"
                    component={CodingTestScreen}
                    options={{
                        headerShown: false,
                        // presentation: 'containedTransparentModal',
                    }}
                />
                <Stack.Screen
                    name="ShadowScreen"
                    component={ShadowScreen}
                    options={{
                        headerShown: false,
                        // presentation: 'containedTransparentModal',
                    }}
                />
                <Stack.Screen
                    name="ShadowCopyScreen"
                    component={ShadowCopyScreen}
                    options={{
                        headerShown: false,
                        // presentation: 'containedTransparentModal',
                    }}
                />
                <Stack.Screen
                    name="ChartScreen"
                    component={ChartScreen}
                    options={{
                        headerShown: false,
                        // presentation: 'containedTransparentModal',
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
