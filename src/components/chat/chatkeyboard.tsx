import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Text, TextInput, View } from 'react-native';
import { getTextStyles, widthScale } from '../../common/util';
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

    const [mode, setMode] = useState<'menu' | 'photos' | 'albums' | 'camera'>('menu');

    useEffect(() => {
        console.log(mode);
    }, [mode]);

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                // ref={flatListRef}
                style={{ backgroundColor: 'blue' }}
                contentContainerStyle={{}}
                data={[0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4]}
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
                                        })}>{`chatting${event.index}`}</Text>
                                </View>
                            </View>
                        </View>
                    );
                }}
                inverted={true}
                onEndReached={() => {}}
            />
            <View
                // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ height: 50, backgroundColor: 'red' }}>
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
        </View>
    );
};

export default ChatKeyBoard;
