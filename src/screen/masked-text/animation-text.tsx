import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaskedView from '@react-native-masked-view/masked-view';
// import * as Animatable from 'react-native-animatable';
import { AnimationButton } from '../../components/custom-buttom';
// import LinearGradient from 'react-native-linear-gradient';
import { getTextStyles, widthScale } from '../../common/util';

const FROM_COLOR = 'rgb(255, 255, 255)';
const TO_COLOR = 'rgb(0,102,84)';
const MaskedTextScreen = () => {
    const insets = useSafeAreaInsets();
    return (
        <View style={{ flex: 1, marginTop: insets.top }}>
            <MaskedView
                style={{ flex: 1, flexDirection: 'row', height: '100%' }}
                maskElement={
                    <View
                        style={{
                            // Transparent background because mask is based off alpha channel.
                            backgroundColor: 'transparent',
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text
                            style={{
                                fontSize: 60,
                                color: 'black',
                                fontWeight: 'bold',
                            }}>
                            Basic Mask
                        </Text>
                    </View>
                }>
                {/* Shows behind the mask, you can put anything here, such as an image */}
                <View style={{ flex: 1, height: '100%', backgroundColor: '#324376' }} />
                <View style={{ flex: 1, height: '100%', backgroundColor: '#F5DD90' }} />
                <View style={{ flex: 1, height: '100%', backgroundColor: '#F76C5E' }} />
                <View style={{ flex: 1, height: '100%', backgroundColor: '#e1e1e1' }} />
            </MaskedView>
            {/* <AnimationButton /> */}
            <View style={{ paddingHorizontal: widthScale(24) }}>
                {/* <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#ACDD21', '#52CCF5']}
                    style={styles.linearGradient}>
                    <Pressable style={{ padding: widthScale(14) }}>
                        <Text style={getTextStyles('SB', '#fff', 18, 22, { textAlign: 'center' })}>검사하러 가기</Text>
                    </Pressable>
                </LinearGradient> */}
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>보내세요</Text>
                {/* <Animatable.View
                    animation="pulse"
                    easing="ease-out"
                    iterationCount="infinite"
                    style={{ alignItems: 'center' }}>
                    <Text>❤️</Text>
                </Animatable.View> */}
            </View>
        </View>
    );
};

export default MaskedTextScreen;
var styles = StyleSheet.create({
    linearGradient: {
        borderRadius: widthScale(6),
    },
});
