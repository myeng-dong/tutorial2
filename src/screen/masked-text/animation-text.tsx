import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaskedView from '@react-native-masked-view/masked-view';
import * as Animatable from 'react-native-animatable';
import { AnimationButton } from '../../components/custom-buttom';

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
            <AnimationButton />
            <Animatable.View
                animation="pulse"
                easing="ease-out"
                iterationCount="infinite"
                style={{ alignItems: 'center' }}>
                <Text>❤️</Text>
            </Animatable.View>
        </View>
    );
};

export default MaskedTextScreen;
