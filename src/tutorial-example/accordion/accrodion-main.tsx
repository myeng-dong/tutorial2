import { ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import data from './src/data/accordion-data';
import Accordion from './src/component/accordion';
import { SafeAreaView } from 'react-native-safe-area-context';
const AccordionScreen = () => {
    return (
        <SafeAreaView style={styles.container} edges={['bottom', 'right', 'left']}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {data.map((value, index) => {
                    return <Accordion value={value} key={index} type={value.type} />;
                })}
            </ScrollView>
        </SafeAreaView>
    );
};

export default AccordionScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});
