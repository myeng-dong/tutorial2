import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getWidthHeight, widthScale } from '../../common/util';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CodingTestScreen2 from './coding2';

const CodingTestScreen = () => {
    const insets = useSafeAreaInsets();
    const [value, setValue] = useState('');
    const recursion = (count: number) => {
        let clockArrs = Array.from({ length: count }).map((_, height) =>
            Array.from({ length: count }).map((_, width) => {
                return 0;
            }),
        ) as (number | undefined)[][];
        for (let equalNum = 0; equalNum <= count / 2; equalNum++) {
            let updateMaxCount = Array.from({ length: equalNum })
                .map((_, y) => y)
                .map((_, index) => count - index * 2 + (count - index * 2 - 1) * 2 + count - 2 - index * 2)
                .reduce((acc, cur) => acc + cur, 0);
            let updateMinCount = Array.from({ length: equalNum })
                .map((_, y) => y)
                .map((_, index) => (count - 2 - index * 2) * 2 + (count - 3 - index * 2) * 2)
                .reduce((acc, cur) => acc + cur, 0);

            clockArrs = clockArrs.map((x, height) =>
                x.map((y, width) => {
                    if (
                        equalNum == 0 &&
                        !([height, width].includes(equalNum) || [height, width].includes(count - 1 - equalNum))
                    )
                        return y;
                    if (
                        equalNum !== 0 &&
                        (width <= equalNum - 1 ||
                            width > count - 1 - equalNum ||
                            height <= equalNum - 1 ||
                            height > count - 1 - equalNum)
                    )
                        return y;
                    if (height == equalNum) {
                        if (count * count < updateMaxCount + (width - equalNum) + 1) return y;
                        return updateMaxCount + (width - equalNum) + 1;
                    }
                    if (width == count - 1 - equalNum) {
                        if (count * count < updateMaxCount + (count - equalNum * 2 + (height - equalNum))) return y;
                        return updateMaxCount + (count - equalNum * 2 + (height - equalNum));
                    }
                    if (height == count - 1 - equalNum) {
                        return updateMinCount + (count + (count - 1) * 2) - (width - equalNum);
                    }
                    if (width == equalNum) {
                        if (height == equalNum) return y;
                        if (updateMinCount + (count + (count - 1) * 2) == count * count) return count * count;
                        if (
                            count * count <
                            updateMinCount + (count + (count - 1) * 2) + (count - equalNum * 2 - height)
                        )
                            return y;
                        return updateMinCount + (count + (count - 1) * 2) + (count - 1 - equalNum - height);
                    }
                    return y;
                }),
            );
        }

        return clockArrs;
    };
    return (
        <View style={{ flex: 1, marginTop: insets.top, alignItems: 'center', justifyContent: 'center' }}>
            <KeyboardAwareScrollView horizontal style={{}}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: widthScale(375),
                        backgroundColor: '#FAFAFA',
                    }}>
                    <View style={{ borderWidth: 1, marginBottom: widthScale(40), width: widthScale(200) }}>
                        <TextInput
                            style={{ fontSize: 30, textAlign: 'center' }}
                            value={value}
                            onChangeText={setValue}
                        />
                    </View>
                    <Pressable
                        onPress={() => {
                            console.log(recursion(parseInt(value)));
                        }}
                        style={getWidthHeight(100, 100, {
                            backgroundColor: 'blue',
                            alignItems: 'center',
                            justifyContent: 'center',
                        })}>
                        <Text style={{ color: '#fff', fontSize: 30 }}>Press answer!!</Text>
                    </Pressable>
                </View>
                <View style={{ width: widthScale(375) }}>
                    <CodingTestScreen2 />
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
