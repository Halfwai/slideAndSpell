import React, { useRef, useEffect } from 'react';
import { StyleSheet, Animated, Dimensions, ScrollView } from 'react-native';
import Definition from '@/components/submenuComponents/Definition';
import { COLOURS } from '@/constants/colours';
import AuthButton from '@/components/buttons/AuthButton';

interface DefinitionsProps {
    slideIn: boolean,
    validWords: {
        word: string,
        definition: string
    }[],
    close?: Function
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

    function slideOut() {
        Animated.timing(definitionsPositionY, {
            toValue: Dimensions.get('window').height,
            duration: 500,
            useNativeDriver: true
        }).start(({ finished }) => {
            if (finished) props.close && props.close();
        });
    }

    return (
        <Animated.View style={[styles.container, { transform: [{ translateX: 0 }, { translateY: definitionsPositionY }] }]}>
            <ScrollView>
                {wordList.current.map((word, index) => {
                    return (
                        <Definition key={index} word={word.word} definition={word.definition} />
                    )
                })}
            </ScrollView>
            {props.close &&
                <AuthButton
                    text="Close"
                    onPress={() => slideOut()}
                    style={styles.button}
                />
            }
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: COLOURS.green,
        backgroundColor: COLOURS.green,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    button: {
        backgroundColor: "white",
        marginVertical: 20,
    }
});