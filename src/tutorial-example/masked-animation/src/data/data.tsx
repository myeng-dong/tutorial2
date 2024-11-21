import { ImageProps } from 'react-native';
import ICONS from '../../../../common/variables/icons';

export interface OnboardingData {
    id: number;
    image: ImageProps;
    text: string;
    textColor: string;
    backgroundColor: string;
}

const data: OnboardingData[] = [
    {
        id: 1,
        image: ICONS.IMAGE1,
        text: '왐마 우리예진이 귀빠진날이가~ 좋겠네!!',
        textColor: '#f8dac2',
        backgroundColor: '#154f40',
    },
    {
        id: 2,
        image: ICONS.IMAGE2,
        text: '생일인데 쇼핑도 뿌수고 행복하겠구만 ㅋㅋ',
        textColor: '#154f40',
        backgroundColor: '#fd94b2',
    },
    {
        id: 3,
        image: ICONS.IMAGE3,
        text: `오늘 맛있는거 많이(?) 먹고 좋은하루보내렴 ^.^ `,
        textColor: 'black',
        backgroundColor: '#f8dac2',
    },
];

export default data;
