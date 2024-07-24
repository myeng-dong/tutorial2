import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    ViewStyle,
    useColorScheme,
} from 'react-native';
import { SectionProps } from '../types/custom-types';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { NavigationParamsList } from '../navigation/navigaions';

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
                ]}
            >
                {title}
            </Text>
            <Text
                style={[
                    styles.sectionDescription,
                    {
                        color: isDarkMode ? Colors.light : Colors.dark,
                    },
                ]}
            >
                {children}
            </Text>
        </View>
    );
}

export function widthScale(
    width: number,
    baseWidth: number = Dimensions.get('window').width
): number {
    const BASE_WIDTH_DP = 375;
    const deviceWidth = baseWidth > 480 ? 480 : baseWidth;
    return (width * deviceWidth) / BASE_WIDTH_DP;
}

export const getNavigation = () => {
    return useNavigation<NavigationProp<NavigationParamsList>>();
};

export function getWidthHeight(
    width: number,
    height: number,
    etcStyles?: ViewStyle
) {
    return {
        width: widthScale(width),
        height: widthScale(height),
        ...etcStyles,
    } as any;
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
