import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import CodePush from 'react-native-code-push';
import FastImage from 'react-native-fast-image';
import SplashScreen from 'react-native-splash-screen';
import type { CodePushStatusType } from '../../common/utils/usecodepush';
import ICONS from '../../common/variables/icons';
import { getTextStyles, widthScale } from '../../common/util';

interface CodePushManagerProps {
    codePushStatus: CodePushStatusType;
    version: string | undefined;
}

function CodePushManager({ codePushStatus, version }: CodePushManagerProps) {
    const { downloadProgress, stat } = codePushStatus;
    const [count] = useState(1);
    useEffect(() => {
        SplashScreen.hide();
    }, []);
    function heightScale(arg0: number): import('react-native').DimensionValue | undefined {
        throw new Error('Function not implemented.');
    }

    return (
        <View
            style={{
                alignItems: 'center',
                flex: 1,
                justifyContent: 'space-between',
                backgroundColor: '#FFF',
            }}>
            <FastImage source={ICONS.SPLASH} style={{ width: widthScale(390), flex: 1 }} />
            <View
                style={{
                    overflow: 'hidden',
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center',
                    top: widthScale(150),
                    bottom: 0,
                }}>
                {stat === 0 && (
                    <View style={{ paddingBottom: heightScale(30) }}>
                        <View
                            style={{
                                backgroundColor: '#aaa',
                                height: widthScale(5),
                                borderRadius: widthScale(3),
                                width: widthScale(280),
                            }}>
                            <View
                                style={{
                                    backgroundColor: '#005BAC',
                                    height: widthScale(5),
                                    borderRadius: widthScale(3),
                                    width: `${downloadProgress}%`,
                                }}
                            />
                        </View>
                    </View>
                )}
                {stat === 1 && (
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: widthScale(36),
                            paddingHorizontal: widthScale(8),
                        }}>
                        <Text
                            style={getTextStyles('RG', '#616161', 16, 20, {
                                marginLeft: widthScale(5),
                            })}>
                            Ready for Download...
                        </Text>
                    </View>
                )}
                {stat === 2 && (
                    <View
                        style={{
                            paddingHorizontal: widthScale(8),
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: widthScale(36),
                            borderRadius: widthScale(3),
                        }}>
                        <Text
                            style={getTextStyles('RG', '#616161', 16, 20, {
                                marginLeft: widthScale(5),
                            })}>
                            Download Complete, Restarting...
                        </Text>
                    </View>
                )}
                <Text style={getTextStyles('RG', '#616161', 16, 20)}>Updating to the latest version.</Text>
            </View>
        </View>
    );
}

export default CodePush({
    checkFrequency: __DEV__ ? CodePush.CheckFrequency.MANUAL : CodePush.CheckFrequency.ON_APP_START,
})(CodePushManager);
