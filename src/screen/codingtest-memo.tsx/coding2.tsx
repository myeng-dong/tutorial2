import React from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getWidthHeight } from '../../common/util';

const CodingTestScreen2 = () => {
    const insets = useSafeAreaInsets();
    function solution(array: number[]) {
        var soltArr = array.sort((a, b) => a - b);
        var filterArr: number[][] = [];
        var count: number = -1;
        soltArr.forEach((x) => {
            if (x <= count) return;
            filterArr.push(soltArr.filter((y) => x == y));
            if (soltArr.findIndex((x) => x > count) != -1) {
                return (count = soltArr[soltArr.findIndex((x) => x > count)]);
            }
        });
        var lengthArr = filterArr.map((x) => x.length).sort((a, b) => a - b);
        if (lengthArr[lengthArr.length - 1] == lengthArr[lengthArr.length - 2]) return -1;
        var resultIndex = filterArr.findIndex((x) => x.length == lengthArr[lengthArr.length - 1]);
        return filterArr[resultIndex][0];
    }
    function solution2(n: number) {
        var result = 1;
        for (let i = 1; i <= n; i++) {
            if ((6 * i) % n == 0) {
                result = i;
                i = n + 1;
            }
        }
        return result;
    }
    function solution3(slice: number, n: number) {
        for (let i = 0; i <= n; i++) {
            if (((slice * i) / n) * i >= 1) {
                return i;
            }
        }
    }
    function solution4(array: Array<number>, height: number) {
        var arr: Array<number> = array;
        arr.unshift(height);
        return arr.sort((a, b) => b - a).findIndex((x) => x == height);
    }
    function solution5(n: number) {
        var arr = [];
        for (let i = 2; i <= n / 2; i++) {
            if (n % i == 0) {
                arr.push(i);
            }
        }
        return arr;
    }
    function solution6(hp: number) {
        var king = ~~(hp / 5);
        var look = ~~((hp - king * 5) / 3);
        var phone = hp - king * 5 - look * 3;
        return [king, look, phone];
    }
    function solution7(text: string, n: number, k: number) {
        const moose = '.... . .-.. .-.. ---';
    }
    const solution8 = (text: string) => {
        var regex = /[0-9]$/;
        let resultArr = [''];
        let index = 0;
        [...text].forEach((x) => {
            if (regex.test(x)) {
                console.log(x);
                resultArr[index] = resultArr[index].concat(x);
            } else {
                index++;
                resultArr[index] = '';
            }
        });
        return resultArr
            .filter((x) => x != '')
            .map((x) => parseInt(x))
            .reduce((acc, cur) => acc + cur, 0);
        return resultArr;
    };
    return (
        <View style={{ flex: 1, marginTop: insets.top }}>
            <Pressable
                onPress={() => {
                    // console.log(solution7('abc b  asadf', 2, 10));
                    console.log('click');
                    console.log(solution8('aAb1B2cC34oOp'));
                }}
                style={getWidthHeight(200, 200, { backgroundColor: 'blue' })}></Pressable>
        </View>
    );
};

export default CodingTestScreen2;
