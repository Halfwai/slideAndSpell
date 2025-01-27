import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, DeviceEventEmitter, ScrollView } from 'react-native';
import Definition from '@/components/Definition';
import { COLOURS } from '@/constants/colours';

interface DefinitionsProps {
    slideIn: boolean,
    validWords: {
        word: string,
        definition: string
    }[]
}

export default function Definitions(props: DefinitionsProps) {
    const definitionsPositionY = useRef(new Animated.Value(Dimensions.get('window').height)).current;

    const wordList = useRef(props.validWords);

    useEffect(() => {
        wordList.current = props.validWords;
    }, [props.validWords]);

    useEffect(() => {
        if (props.slideIn) {
            Animated.timing(definitionsPositionY, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true
            }).start();
        }
    }, [props.slideIn]);

    return (
        <Animated.View style={[styles.container, { transform: [{ translateX: 0 }, { translateY: definitionsPositionY }] }]}>
            <ScrollView>
                {wordList.current.map((word, index) => {
                    return (
                        <Definition key={index} word={word.word} definition={word.definition} />
                    )
                })}
            </ScrollView>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "80%",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: COLOURS.green,
        backgroundColor: COLOURS.green, 
        borderRadius: 10,
    }
});