import React from 'react';
import { Platform, Pressable, ScrollView, StatusBar, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getWidthHeight, widthScale } from '../common/util';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { NavigationParamsList } from '../navigation/navigaions';

interface BtnProps {
    navigation: string;
    title: string;
}

const ExampleScreen = () => {
    const insets = useSafeAreaInsets();

    const navigation = useNavigation<NavigationProp<NavigationParamsList>>();
    const [navi, setNavi] = React.useState<BtnProps[]>([
        { navigation: 'AccordionScreen', title: 'Accordion' },
        { navigation: 'CustomToastScreen', title: 'Toast' },
        { navigation: 'LineChartScreen', title: 'Line-Chart' },
        { navigation: 'OnboardingScreen', title: 'Masked View' },
        { navigation: 'HeartrateScreen', title: 'HeartrateScreen' },
    ]);

    const btnRender = (props: BtnProps) => {
        return (
            <Pressable
                style={getWidthHeight(164, 175, {
                    padding: widthScale(20),
                    marginVertical: widthScale(20),
                    backgroundColor: 'rgba(235, 238, 250, 0.96)',
                    borderRadius: widthScale(10),
                    justifyContent: 'center',
                })}
                onPress={() => {
                    //@ts-ignore
                    navigation.navigate(props.navigation, {});
                }}>
                <Text
                    style={{
                        fontSize: widthScale(30),
                        fontWeight: 700,
                        textAlign: 'center',
                    }}>
                    {props.title}
                </Text>
            </Pressable>
        );
    };
    return (
        <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: insets.top }}>
            {Platform.OS == 'ios' && <StatusBar barStyle={'dark-content'} />}
            <ScrollView
                style={{
                    flex: 1,
                }}
                contentContainerStyle={{ flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
                {navi.map(btnRender)}
                {/* <Pressable
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
                </Pressable> */}
            </ScrollView>
        </View>
    );
};

export default ExampleScreen;
