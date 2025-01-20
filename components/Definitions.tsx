import React, {useRef, useEffect, useState} from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, DeviceEventEmitter } from 'react-native';

export default function Definitions(props: { slideIn: boolean, validWords: {word: string, definition: string}[] }) {
    const definitionsPositionY = useRef(new Animated.Value(Dimensions.get('window').height)).current;
    const definitionsHeight = useRef(new Animated.Value(0)).current;
    
    const wordList = useRef(props.validWords);

    useEffect(() => {
        wordList.current = props.validWords;
    }, [props.validWords]);

    useEffect(() => {
        if (props.slideIn) {
            Animated.timing(definitionsHeight, {
                toValue: Dimensions.get('window').height,
                duration: 1000,
                useNativeDriver: false
            }).start();
            Animated.timing(definitionsPositionY, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: false
            }).start();
        }
    }, [props.slideIn]);

    return (
        <Animated.View style={[{ transform: [{ translateX: 0 }, { translateY: definitionsPositionY }], height: definitionsHeight }]}>
            {wordList.current.map((word, index) => {
                return (
                    <View key={index}>
                        <Text>{word.word}</Text>
                        <Text>{word.definition}</Text>
                    </View>
                )
            })}
        </Animated.View>
    )
}