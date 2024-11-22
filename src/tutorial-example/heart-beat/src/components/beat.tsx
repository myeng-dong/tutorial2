// /* eslint-disable max-len */
// import { Blur, Group, Path, Skia, fitbox, mix, rect } from '@shopify/react-native-skia';
// import React from 'react';
// import { Dimensions } from 'react-native';
// import type { SharedValue } from 'react-native-reanimated';
// import { useDerivedValue } from 'react-native-reanimated';
// import { Circle } from 'react-native-svg';
// import { widthScale } from '../../../../common/util';

// export const heart = Skia.Path.MakeFromSVGString(
//     'M 32 60 C -29.2 19.6 13.2 -12 31.2 4.4 C 31.6 4.8 31.6 5.2 32 5.2 A 12.4 12.4 90 0 1 32.8 4.4 C 50.8 -12 93.2 19.6 32 60 Z',
// )!;
// const { width, height } = Dimensions.get('window');
// const c = { x: width / 2, y: height / 2 };
// const src = heart.computeTightBounds();
// const pad = 64;
// const dst = rect(pad, pad, width - 2 * pad, height - pad * 2);

// interface BeatProps {
//     progress: SharedValue<number>;
// }

// // 변수 정의
// const cx = width / 2; // 원의 중심 X 좌표
// const cy = height / 2; // 원의 중심 Y 좌표
// const r = 20; // 원의 반지름

// // 커스텀 경로 정의
// const path = `M ${cx} ${cy} m ${r} 0 a ${r} ${r} 0 1 1 -${r * 2} 0 a ${r} ${r} 0 1 1 ${r * 2} 0`;

// export const Beat = ({ progress }: BeatProps) => {
//     const transform = useDerivedValue(() => [{ scale: mix(progress.value, 1, 4) }]);
//     const blur = useDerivedValue(() => mix(progress.value, 1, 4));
//     const strokeWidth = useDerivedValue(() => mix(progress.value, 2, 0));
//     return (
//         <Group transform={transform} origin={c}>
//             <Group transform={fitbox('contain', src, dst)}>
//                 <Path color="#FFFFFF" path={path} style="stroke" strokeWidth={strokeWidth}>
//                     <Blur blur={blur} />
//                 </Path>
//             </Group>
//         </Group>
//     );
// };

import { Blur, Group, Path, Skia, fitbox, mix, rect } from '@shopify/react-native-skia';
import React from 'react';
import { Dimensions } from 'react-native';
import { SharedValue } from 'react-native-reanimated';
import { useDerivedValue } from 'react-native-reanimated';
import { widthScale } from '../../../../common/util';

interface BeatProps {
    progress: SharedValue<number>;
    radius: number;
    strokeWidth: number;
}
export const heightOption = Skia.Path.MakeFromSVGString(
    'M 32 60 C -29.2 19.6 13.2 -12 31.2 4.4 C 31.6 4.8 31.6 5.2 32 5.2 A 12.4 12.4 90 0 1 32.8 4.4 C 50.8 -12 93.2 19.6 32 60 Z',
)!;

export const Beat = ({ progress, radius, strokeWidth }: BeatProps) => {
    const { width, height } = Dimensions.get('window');
    const c = { x: width / 2, y: 0 }; // 화면 중앙

    const src = heightOption.computeTightBounds();
    const pad = widthScale(64);
    const dst = rect(pad, pad, width - 2 * pad, height - pad * 2);

    const rad = radius;

    const path = `M 32 -70 m ${rad} 0 a ${rad} ${rad} 0 1 0 -${rad * 2} 0 a ${rad} ${rad} 0 1 0 ${rad * 2} 0`;
    const transform = useDerivedValue(() => [{ scale: mix(progress.value, 1, 3) }]);
    const blur = useDerivedValue(() => mix(progress.value, 2, 4));
    const strokeWidths = useDerivedValue(() => mix(progress.value, strokeWidth, 0));

    return (
        <Group transform={transform} origin={c}>
            <Group transform={fitbox('contain', src, dst)}>
                <Path color="#E5E5E5" path={path} style="stroke" strokeWidth={strokeWidths}>
                    <Blur blur={blur} />
                </Path>
            </Group>
        </Group>
    );
};
