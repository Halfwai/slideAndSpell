import React, {useRef, useEffect, useState} from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, DeviceEventEmitter } from 'react-native';
import Definition from '@/components/Definition';

interface DefinitionsProps {
    slideIn: boolean, 
    validWords: {word: string, 
    definition: string}[]
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
        <Animated.View style={[{ transform: [{ translateX: 0 }, { translateY: definitionsPositionY }]}]}>
            {wordList.current.map((word, index) => {
                return (
                        <Definition key={index} word={word.word} definition={word.definition}/>
                )
            })}
        </Animated.View>
    )
}