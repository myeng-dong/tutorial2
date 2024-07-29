import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { GestureHandlerRootView, ScrollView as HandlerScrollView } from 'react-native-gesture-handler';
import { widthScale } from '../../common/util';

const NestedScrollViewScreen = () => {
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView style={{}} nestedScrollEnabled>
                <Text style={{ fontSize: widthScale(30) }}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                    and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
                    leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
                </Text>
                <GestureHandlerRootView style={{ height: widthScale(100), width: widthScale(375) }}>
                    <HandlerScrollView
                        horizontal
                        style={{ backgroundColor: 'brown' }}
                        contentContainerStyle={{ flexGrow: 1 }}
                        nestedScrollEnabled>
                        <Text style={{ fontSize: widthScale(20) }}>
                            There are many variations of passages of Lorem Ipsum available, but the majority have
                            suffered alteration in some form, by injected humour, or randomised words which don't look
                            even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be
                            sure there isn't anything embarrassing hidden in
                        </Text>
                    </HandlerScrollView>
                </GestureHandlerRootView>
                <GestureHandlerRootView style={{ height: widthScale(100) }}>
                    <HandlerScrollView
                        horizontal
                        style={{ backgroundColor: 'green' }}
                        contentContainerStyle={{ flexGrow: 1 }}
                        nestedScrollEnabled>
                        <Text style={{ fontSize: widthScale(20) }}>
                            There are many variations of passages of Lorem Ipsum available, but the majority have
                            suffered alteration in some form, by injected humour, or randomised words which don't look
                            even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be
                            sure there isn't anything embarrassing hidden in
                        </Text>
                    </HandlerScrollView>
                </GestureHandlerRootView>
                <GestureHandlerRootView style={{ height: widthScale(100) }}>
                    <HandlerScrollView
                        style={{ backgroundColor: 'blue' }}
                        contentContainerStyle={{ flexGrow: 1 }}
                        nestedScrollEnabled>
                        <Text style={{ fontSize: widthScale(20) }}>
                            There are many variations of passages of Lorem Ipsum available, but the majority have
                            suffered alteration in some form, by injected humour, or randomised words which don't look
                            even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be
                            sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum
                            generators on the Internet tend to repeat predefined chunks as necessary, making this the
                            first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined
                            with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.
                            The generated Lorem Ipsum is therefore always free from repetition, injected humour, or
                            non-characteristic words etc. t Hampden-Sydney College in Virginia, looked up one of the
                            more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the
                            cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum
                            comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of
                            Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics,
                            very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
                            amet..", comes from a line in section 1.10.32.
                        </Text>
                    </HandlerScrollView>
                </GestureHandlerRootView>
                <GestureHandlerRootView style={{ height: widthScale(100) }}>
                    <HandlerScrollView
                        style={{ backgroundColor: 'red' }}
                        contentContainerStyle={{ flexGrow: 1 }}
                        nestedScrollEnabled>
                        <Text style={{ fontSize: widthScale(20) }}>
                            There are many variations of passages of Lorem Ipsum available, but the majority have
                            suffered alteration in some form, by injected humour, or randomised words which don't look
                            even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be
                            sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum
                            generators on the Internet tend to repeat predefined chunks as necessary, making this the
                            first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined
                            with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.
                            The generated Lorem Ipsum is therefore always free from repetition, injected humour, or
                            non-characteristic words etc. t Hampden-Sydney College in Virginia, looked up one of the
                            more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the
                            cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum
                            comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of
                            Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics,
                            very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
                            amet..", comes from a line in section 1.10.32.
                        </Text>
                    </HandlerScrollView>
                </GestureHandlerRootView>
                <Text style={{ fontSize: widthScale(30) }}>
                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
                    classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin
                    professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words,
                    consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical
                    literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33
                    of "de Finibus Bonorumirst line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
                    section 1.10.32.
                </Text>
            </ScrollView>
        </View>
    );
};

export default NestedScrollViewScreen;
