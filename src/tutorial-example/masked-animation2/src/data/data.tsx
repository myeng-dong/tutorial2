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
        image: ICONS.PERSON,
        text: 'PAGE1',
        textColor: '#f8dac2',
        backgroundColor: '#154f40',
    },
    {
        id: 2,
        image: ICONS.PERSON,
        text: 'PAGE2',
        textColor: '#154f40',
        backgroundColor: '#fd94b2',
    },
    {
        id: 3,
        image: ICONS.PERSON,
        text: `PAGE3`,
        textColor: 'black',
        backgroundColor: '#f8dac2',
    },
];

export default data;
