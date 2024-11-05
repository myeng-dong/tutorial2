import React, { useRef, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getWidthHeight, widthScale } from '../../common/util';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CodingTestScreen2 from './coding2';

const CodingTestScreen = () => {
    const insets = useSafeAreaInsets();
    const [value, setValue] = useState('');
    const textRef = useRef<TextInput>(null);

    return (
        <View style={{ flex: 1, marginTop: insets.top, alignItems: 'center', justifyContent: 'center' }}>
            <KeyboardAwareScrollView style={{}}>
                {/* <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: widthScale(375),
                        backgroundColor: '#FAFAFA',
                    }}>
                    <Pressable
                        onPress={() => {
                            textRef.current?.focus();
                        }}
                        style={{ borderWidth: 1, marginBottom: widthScale(40), width: widthScale(200) }}>
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                style={{
                                    fontSize: 30,
                                    textAlign: 'center',
                                    backgroundColor: 'red',
                                    height: 20,
                                    width: 100,
                                }}
                                value={value}
                            />
                            <TextInput
                                caretHidden
                                ref={textRef}
                                style={{
                                    fontSize: 30,
                                    textAlign: 'center',
                                    backgroundColor: 'red',
                                    height: 20,
                                    width: 100,
                                }}
                                onChangeText={setValue}
                            />
                        </View>
                    </Pressable>

                    <Pressable
                        onPress={() => {}}
                        style={getWidthHeight(100, 100, {
                            backgroundColor: 'blue',
                            alignItems: 'center',
                            justifyContent: 'center',
                        })}>
                        <Text style={{ color: '#fff', fontSize: 30 }}>Press answer!!</Text>
                    </Pressable>
                </View> */}
                {/* <View style={{ marginTop: 100 }}>
                    <Text>
                        <TextInput style={{ height: 20, width: 100 }} />
                        is a knowledge community in which we can ask programming questions and we can answer others’
                        programming questions.
                    </Text>
                </View>
                <View style={{ width: widthScale(375) }}>
                    <CodingTestScreen2 />
                </View> */}
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', maxWidth: widthScale(343) }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                            <Text style={{ fontSize: 20 }}>Username</Text>
                            <TextInput style={{ fontSize: 20 }} multiline />
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
};

export default CodingTestScreen;
// let firstArr = Array.from({ length: count }).map((_, y) => y + 1);
// let lastArr = Array.from({ length: count })
//     .map((_, y) => count + count + y - 1)
//     .reverse();
// 정수를 배열로 바꾸고 ((정수 * 2 - 1)를 정수 - 1 만큼 진행 후 정수 (정수 + 1 만큼 뒤에 붙힌 뒤 해당값저장)) 이걸 정수 - 1 만큼 반복 후 맨앞에 초기 배열 concat하면 끝
// value.map((x,y)=>{
//     return x.
// })
// 첫번째 arr
// result[0] = firstArr;
// result[result.length - 1] = lastArr;
// if (height == 0) {
//     return width + 1;
// }
// if(width != count - 1)
// if (width == 0) {
//     return maxCount - height + 1;
// }
// if (width == count - 1) {
//     return count + height;
// }
// if (width == count - 2) {
//     return maxCount + count - 3 + height;
// }
// if (width == count - 2) {
//     return count + height;
// }
// if (width == count - 3) {
//     return maxCount + count - 3 + height;
// }
// if (height > count / 2) {
//     // 16 + 3 +
//     return maxCount + count - 3 + height;
// }
// if (height <= count / 2) {
//     return maxCount - height + 1 + width;
// }
