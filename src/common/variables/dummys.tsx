export const dummyArr = [
    { x: '2023-1월', y: Math.ceil(Math.random() * 100) },
    { x: '2023-2월', y: Math.ceil(Math.random() * 100) },
    { x: '2023-3월', y: Math.ceil(Math.random() * 100) },
    { x: '2023-4월', y: Math.ceil(Math.random() * 100) },
    { x: '2023-5월', y: Math.ceil(Math.random() * 100) },
    { x: '2023-6월', y: Math.ceil(Math.random() * 100) },
    { x: '2023-7월', y: Math.ceil(Math.random() * 100) },
    { x: '2023-8월', y: Math.ceil(Math.random() * 100) },
    { x: '2023-9월', y: Math.ceil(Math.random() * 100) },
    { x: '2023-10월', y: Math.ceil(Math.random() * 100) },
    { x: '2023-11월', y: Math.ceil(Math.random() * 100) },
    { x: '2023-12월', y: Math.ceil(Math.random() * 100) },
    { x: '2024-1월', y: Math.ceil(Math.random() * 100) },
    { x: '2024-2월', y: Math.ceil(Math.random() * 100) },
    { x: '2024-3월', y: Math.ceil(Math.random() * 100) },
    { x: '2024-4월', y: Math.ceil(Math.random() * 100) },
    { x: '2024-5월', y: Math.ceil(Math.random() * 100) },
    { x: '2024-6월', y: Math.ceil(Math.random() * 100) },
    { x: '2024-7월', y: Math.ceil(Math.random() * 100) },
    { x: '2024-8월', y: Math.ceil(Math.random() * 100) },
    { x: '2024-9월', y: Math.ceil(Math.random() * 100) },
    { x: '2024-10월', y: Math.ceil(Math.random() * 100) },
    { x: '2024-11월', y: Math.ceil(Math.random() * 100) },
    { x: '2024-12월', y: Math.ceil(Math.random() * 100) },
    { x: '2025-1월', y: Math.ceil(Math.random() * 100) },
    { x: '2025-2월', y: Math.ceil(Math.random() * 100) },
    { x: '2025-3월', y: Math.ceil(Math.random() * 100) },
    { x: '2025-4월', y: Math.ceil(Math.random() * 100) },
    { x: '2025-5월', y: Math.ceil(Math.random() * 100) },
    { x: '2025-6월', y: Math.ceil(Math.random() * 100) },
    { x: '2025-7월', y: Math.ceil(Math.random() * 100) },
    { x: '2025-8월', y: Math.ceil(Math.random() * 100) },
    { x: '2025-9월', y: Math.ceil(Math.random() * 100) },
    { x: '2025-10월', y: Math.ceil(Math.random() * 100) },
    { x: '2025-11월', y: Math.ceil(Math.random() * 100) },
    { x: '2025-12월', y: Math.ceil(Math.random() * 100) },
    { x: '2026-1월', y: Math.ceil(Math.random() * 100) },
    { x: '2026-2월', y: Math.ceil(Math.random() * 100) },
    { x: '2026-3월', y: Math.ceil(Math.random() * 100) },
    { x: '2026-4월', y: Math.ceil(Math.random() * 100) },
    { x: '2026-5월', y: Math.ceil(Math.random() * 100) },
    { x: '2026-6월', y: Math.ceil(Math.random() * 100) },
    { x: '2026-7월', y: Math.ceil(Math.random() * 100) },
    { x: '2026-8월', y: Math.ceil(Math.random() * 100) },
    { x: '2026-9월', y: Math.ceil(Math.random() * 100) },
    { x: '2026-10월', y: Math.ceil(Math.random() * 100) },
    { x: '2026-11월', y: Math.ceil(Math.random() * 100) },
    { x: '2026-12월', y: Math.ceil(Math.random() * 100) },
];
export interface ImageSliderProps extends ImageUrls {
    index: number;
}
export interface ImageUrls {
    url: string;
}
export const ImageSlider: ImageUrls[] = [
    {
        url: 'https://images.freeimages.com/image/previews/e41/christmas-gift-box-ribbon-art-5698119.jpg?fmt=webp&w=500',
    },
    { url: 'https://images.freeimages.com/images/large-previews/0ff/christmas-pattern-1056207.jpg?fmt=webp&w=500' },
    { url: 'https://images.freeimages.com/images/large-previews/2c7/ho-ho-hooo-1578467.jpg?fmt=webp&w=500' },
    { url: 'https://images.freeimages.com/image/previews/002/xmas-glow-in-red-vector-5690822.jpg?fmt=webp&w=500' },
];

import { ImageProps } from 'react-native';
import ICONS from './icons';

export interface OnboardingData {
    id: number;
    image: ImageProps;
    text: string;
    textColor: string;
    backgroundColor: string;
}

const skiaData: OnboardingData[] = [
    {
        id: 1,
        image: ICONS.LOCATION_MARKER,
        text: 'Lorem Ipsum dolor sit amet',
        textColor: '#f8dac2',
        backgroundColor: '#154f40',
    },
    {
        id: 2,
        image: ICONS.LOCATION_MARKER,
        text: 'Lorem Ipsum dolor sit amet',
        textColor: '#154f40',
        backgroundColor: '#fd94b2',
    },
    {
        id: 3,
        image: ICONS.LOCATION_MARKER,
        text: 'Lorem Ipsum dolor sit amet',
        textColor: 'black',
        backgroundColor: '#f8dac2',
    },
];

export default skiaData;
