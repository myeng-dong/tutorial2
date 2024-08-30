import { Dimensions, Platform, StyleSheet, Text, TextStyle, View, ViewStyle, useColorScheme } from 'react-native';
import { SectionProps } from '../types/custom-types';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NavigationParamsList } from '../navigation/navigaions';
import FONTS from './variables/fonts';

export function Section({ children, title }: SectionProps): React.JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <View style={styles.sectionContainer}>
            <Text
                style={[
                    styles.sectionTitle,
                    {
                        color: isDarkMode ? Colors.white : Colors.black,
                    },
                ]}>
                {title}
            </Text>
            <Text
                style={[
                    styles.sectionDescription,
                    {
                        color: isDarkMode ? Colors.light : Colors.dark,
                    },
                ]}>
                {children}
            </Text>
        </View>
    );
}

export function widthScale(width: number, baseWidth: number = Dimensions.get('window').width): number {
    const BASE_WIDTH_DP = 375;
    const deviceWidth = baseWidth > 480 ? 480 : baseWidth;
    return (width * deviceWidth) / BASE_WIDTH_DP;
}

export const getNavigation = () => {
    return useNavigation<NavigationProp<NavigationParamsList>>();
};

export function getWidthHeight(width: number, height: number, etcStyles?: ViewStyle) {
    return {
        width: widthScale(width),
        height: widthScale(height),
        ...etcStyles,
    } as any;
}

export function getTextStyles(
    fontFamily: keyof typeof FONTS,
    color: string,
    fontSize: number,
    lineHeight: number,
    etcStyles?: TextStyle,
) {
    let variable = {
        fontFamily: FONTS[fontFamily],
        color,
        fontSize: widthScale(fontSize),
        lineHeight: widthScale(lineHeight),
        ...etcStyles,
    } as any;
    if (Platform.OS == 'android') {
        variable = { ...variable, fontWeight: 'normal' };
    }
    return variable;
}

export function getRoute<T extends keyof NavigationParamsList>(): RouteProp<NavigationParamsList, T> {
    return useRoute<RouteProp<NavigationParamsList, T>>();
}

export function getPaddingStyles(horizontal: number, vertical: number, etcStyles?: ViewStyle) {
    return {
        paddingHorizontal: widthScale(horizontal),
        paddingVertical: widthScale(vertical),
        ...etcStyles,
    };
}

export function transPhoneNumberFormat(value: number | string): string {
    return value
        .toString()
        .replace(/[^0-9]/g, '')
        .replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/, '$1-$2-$3')
        .replace('--', '-');
}
export function transMoneyFormat(value: number | string, maxValue?: number): string {
    let tmp = typeof value == 'string' ? parseInt(value.replace(/,/gi, '')) : value;
    if (maxValue) {
        tmp = Math.min(maxValue, tmp);
    }
    if ([NaN].includes(tmp)) {
        return '0';
    }
    let integerValue = Math.floor(tmp);
    let c = '';
    if (value.toString().match(/\.(\d*)/gi) != null) {
        c = value.toString().replace(/\d*(\.\d*)/gi, '$1');
        c = c.replace(/(\d{2})\d*/i, '$1');
        c = c.replace(/(\d*?)0+/i, '$1');
    }
    return integerValue
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        .concat(c);
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});
