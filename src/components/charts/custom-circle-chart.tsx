import React, { memo, useEffect } from 'react';
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import Svg, { Circle, Path } from 'react-native-svg';
import { widthScale } from '../../common/util';
interface ArcData {
    x: number; // 원의 중심의 x 좌표
    y: number; // 원의 중심의 y 좌표
    radius: number; // 원의 반지름
    degree: number; // 원점에서 부터 호를 그릴 각도
}

/**
 * @param circleRadius 차트의 반지름
 * @param chartColors color의 배열 (dataArr.length == chartColors.length)
 * @param dataArr number배열 (dataArr.length == chartColors.length)
 * @param animation 애니메이션 사용 여부
 * @param duration 애니메이션 속도
 * @param animationCircleColor 구현된 애니매이션은 도넛두개를 포개서 바깥쪽을 서서히 지우는 방식 따라서 배경색과 같은 바깥쪽원 색상을 정의해야된다
 */
interface CustomProps {
    circleRadius: number;
    chartColors?: string[];
    dataArr?: Array<number>;
    duration?: number;
    animationCircleColor?: string;
    animation?: boolean;
    chartStyle?: string;
}
const CustomCircleChart = (props: CustomProps) => {
    const AnimatedPath = Animated.createAnimatedComponent(Path);
    const { circleRadius, chartColors, dataArr, duration, animationCircleColor, animation, chartStyle } = props;
    const MAX_DEGREE = 359.9;
    const radius = widthScale(circleRadius);
    const diameter = 2 * Math.PI * radius;
    const colors = chartColors ? chartColors : ['#ddd', '#bbb', '#aaa', '#888', '#666'];
    const circleScale = radius * 2;

    const dataset = dataArr ? dataArr : [9, 5, 4, 3, 1];

    const total = dataset.reduce((r, v) => r + v, 0);
    const acc = dataset.reduce((result, value) => [...result, result[result.length - 1] + value], [0]);

    const fadeAnims = useSharedValue(animation ? MAX_DEGREE : 0);
    useEffect(() => {
        fadeAnims.value = withTiming(0, { duration: duration ? duration : 1350 });
    }, []);

    // 삼각함수로 시초선에서 n도 벌어진 점의 좌표를 구하는 함수
    const getCoordsOnCircle = ({ x, y, radius, degree }: ArcData) => {
        'worklet';
        // const radian = (degree / 180) * Math.PI;
        return {
            x: x + radius * Math.cos((degree / 180) * Math.PI),
            y: y + radius * Math.sin((degree / 180) * Math.PI),
        };
    };

    // x, y를 중심 축으로 하여 degree(θ)만큼 +방향으로 호를 그리는 함수
    const getArc = (props: ArcData): string => {
        'worklet';
        const startCoord = getCoordsOnCircle({ ...props, degree: 0 });
        const finishCoord = getCoordsOnCircle({ ...props });

        const { x, y, radius, degree } = props;
        // const isLargeArc = degree > 180 ? 1 : 0;
        // const isEnd = degree === MAX_DEGREE;

        const d = `M ${startCoord.x} ${startCoord.y} A ${radius} ${radius} 0 ${degree > 180 ? 1 : 0} 1 ${
            finishCoord.x
        } ${finishCoord.y} L ${x} ${y} ${degree === MAX_DEGREE ? 'z' : ''}`;
        return d;
    };

    const circleItem = (data: number, i: number) => {
        const ratio = data / total;
        const fillSpace = diameter * ratio;
        const emptySpace = diameter - fillSpace;
        const offset = (acc[i] / total) * diameter;

        return (
            <Circle
                cx={circleScale}
                cy={circleScale}
                r={radius.toString()}
                fill="transparent"
                stroke={colors[i]}
                strokeWidth={chartStyle ? circleScale / 2 : circleScale}
                strokeDasharray={`${fillSpace} ${emptySpace}`}
                strokeDashoffset={-offset.toString()}
            />
        );
    };
    const animatedProps = useAnimatedProps(() => {
        const arcPath = getArc({ x: circleScale, y: circleScale, radius: radius * 2, degree: fadeAnims.value });
        return { d: arcPath };
    });
    return (
        <Svg width={circleScale * 2} height={circleScale * 2}>
            {dataset.map(circleItem)}
            {animation && (
                <AnimatedPath
                    animatedProps={animatedProps}
                    fill={animationCircleColor ? animationCircleColor : '#fff'}
                    stroke={'transparent'}
                />
            )}
        </Svg>
    );
};

export default memo(CustomCircleChart);
