import React, { useEffect, useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, Text, TextInput, View } from 'react-native';
import { getTextStyles, widthScale } from '../../common/util';
import ChatKeyBoard from '../../components/chat/chatkeyboard';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardProvider } from 'react-native-keyboard-controller';
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
const ChatKeyBoardScreen = () => {
    const insets = useSafeAreaInsets();

    const [mode, setMode] = useState<'menu' | 'photos' | 'albums' | 'camera'>('menu');

    useEffect(() => {
        console.log(mode);
    }, [mode]);

    return (
        <View style={{ flex: 1, marginBottom: insets.bottom }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'height' : 'height'}
                enabled={false}>
                <ChatKeyBoard />
            </KeyboardAvoidingView>
        </View>
    );
};

export default ChatKeyBoardScreen;
