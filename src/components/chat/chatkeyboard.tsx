import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Pressable, Text, TextInput, View } from 'react-native';
import { getTextStyles, widthScale } from '../../common/util';
import { KeyboardProvider, useKeyboardHandler } from 'react-native-keyboard-controller';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
// const { PLUS_BLACK_ICON, SEND_FOCUS_ICON, SEND_NOFOCUS_ICON } = ICONS;
export type Chat = {
    __typename?: 'Chat';
    /** 관리자 아이디 */
    adminId?: number;
    /** 채팅방 아이디 */
    chatRoomId: number;
    /** 내용(목록에서는 해당 필드만 갖고가시면 됩니다.) */
    content: string;
    /** 채팅 보낸 시각 */
    createdAt: Date;
    dataInternal?: string;
    id: number;
    /** 이미지 */
    image?: string;
    /** 내가 보낸 채팅인지 여부 */
    isMine?: boolean;
    /** 유저 아이디 */
    userId?: number;
};
const ChatKeyBoard = () => {
    const [chat, setChat] = useState('');
    const refInput = useRef<TextInput>(null);
    const [chatData, setChatData] = useState(Array.from({ length: 10 }, (_, i) => `${i}`));
    const inputRef = useRef<TextInput>(null);
    const [mode, setMode] = useState<'menu' | 'photos' | 'albums' | 'camera'>('menu');
    const flatListRef = useRef<FlatList>(null);

    const useKeyboardAnimation = () => {
        const progress = useSharedValue(0);
        const height = useSharedValue(0);

        useKeyboardHandler({
            onMove: (e) => {
                'worklet';
                progress.value = e.progress;
                height.value = e.height;
            },
            onInteractive: (e) => {
                'worklet';

                progress.value = e.progress;
                height.value = e.height;
            },
        });
        return { height, progress };
    };
    const { height } = useKeyboardAnimation();
    const scrollViewStyle = useAnimatedStyle(
        () => ({
            transform: [{ translateY: -height.value }],
        }),
        [],
    );
    const textInputStyle = useAnimatedStyle(
        () => ({
            height: 50,
            width: '100%',
            backgroundColor: '#BCBCBC',
            transform: [{ translateY: -height.value }],
        }),
        [],
    );
    const fakeView = useAnimatedStyle(
        () => ({
            height: height.value,
        }),
        [],
    );

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                ref={flatListRef}
                style={{ backgroundColor: 'blue' }}
                data={chatData}
                ListHeaderComponent={() => {
                    return <Animated.View style={fakeView} />;
                }}
                renderItem={(event) => {
                    return (
                        <View>
                            <View
                                style={{
                                    paddingHorizontal: widthScale(16),
                                    paddingBottom: widthScale(16),
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                }}>
                                <View
                                    style={{
                                        backgroundColor: '#EEE',
                                        paddingHorizontal: widthScale(12),
                                        paddingVertical: widthScale(10),
                                        borderRadius: widthScale(12),
                                        flexShrink: 1,
                                    }}>
                                    <Text
                                        style={getTextStyles('RG', '#222', 16, 20, {
                                            flex: 1,
                                        })}>{`${event.item}`}</Text>
                                </View>
                            </View>
                        </View>
                    );
                }}
                inverted={true}
                onEndReached={() => {
                    console.log('end');
                }}
                onEndReachedThreshold={0.2}
            />
            <Animated.View
                style={[textInputStyle, { flexDirection: 'row', justifyContent: 'space-between', height: 50 }]}>
                <View style={{ backgroundColor: 'red', flex: 1 }}>
                    <TextInput
                        ref={refInput}
                        multiline={true}
                        style={getTextStyles('RG', '#424242', 14, 20, {
                            padding: 0,
                            flex: 1,
                            lineHeight: widthScale(14),
                        })}
                        value={chat}
                        onChangeText={setChat}
                        placeholder="메세지 보내기"
                        placeholderTextColor={'#9E9E9E'}
                    />
                </View>
                <Pressable
                    onPress={() => {
                        setChatData([chat, ...chatData]);
                        setChat('');
                        flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
                    }}>
                    <Text>POST</Text>
                </Pressable>
            </Animated.View>
        </View>
    );
};

export default ChatKeyBoard;
