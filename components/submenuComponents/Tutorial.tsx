import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import GameBoard from "@/components/gameComponents/GameBoard";
import {COLOURS} from "@/constants/colours";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MyAppText from '@/components/common/MyAppText';
import AuthButton from '@/components/buttons/AuthButton';

interface TutorialProps {
    endTutorial: Function
}

export default function Tutorial(props: TutorialProps) {
    const width = Dimensions.get("window").width;
    const [pointerStartPos, setPointerStartPos] = useState({x: (width * 0.85) / 3, y: 0});
    const [pointerEndPos, setPointerEndPos] = useState({x: (width * 0.85) / 3, y: -((width * 0.85) / 3)});
    const [instructions, setInstructions] = useState<string>("Slide the tiles to form words");
    const [showPointer, setShowPointer] = useState(true);
    const pointerPosition = useRef(new Animated.ValueXY({ x: pointerStartPos.x, y: pointerStartPos.y })).current;
    const pointerOpacity = useRef(new Animated.Value(0)).current;
    const [completeWords, setCompleteWords] = useState<number>(0);
    const [restartAnimation, setRestartAnimation] = useState<boolean>(false);

    useEffect(() => {
        setRestartAnimation(!restartAnimation); 
        if(completeWords === 0){
            setPointerStartPos({
                x: (width * 0.85) / 3,
                y: 0
            })
            setPointerEndPos({
                x: (width * 0.85) / 3,
                y: -((width * 0.85) / 3)
            })
            setInstructions("Slide the tiles to form words");
        };
        if (completeWords === 1){
            setPointerStartPos({
                x: (width * 0.85) / 3,
                y: (width * 0.85) / 3
            })
            setPointerEndPos({
                x: (width * 0.85) / 3,
                y: 0
            })
            setInstructions("Slide the tiles to form words");
        };
        if (completeWords === 2){
            setPointerStartPos({
                x: 0,
                y: -((width * 0.85) / 3) * 2
            })
            setPointerEndPos({
                x: (width * 0.85) / 3,
                y: (width * 0.85) / 3
            })
            setInstructions("When one word remains, slide the final tile to complete the puzzle");
        };            
    }, [completeWords]);  

    useEffect(() => {
        animatePointer();
    }, []);

    useEffect(() => {   
        resetPointer();
    }, [restartAnimation]);

    function resetPointer() {
        Animated.sequence([
            Animated.timing(pointerOpacity, {
                toValue: 0,
                duration: 0,
                useNativeDriver: true
            }),
            Animated.timing(pointerPosition, {
                toValue: { x: pointerStartPos.x, y: pointerStartPos.y },
                duration: 0,
                useNativeDriver: true
            }),
        ]).start((finished) => {
            if(finished){
                animatePointer();
            }
        });
    }

    function animatePointer() {
        Animated.sequence([
            Animated.timing(pointerOpacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }),
            Animated.timing(pointerPosition, {
                toValue: { x: pointerEndPos.x, y: pointerEndPos.y },
                duration: 500,
                useNativeDriver: true
            }),
            Animated.timing(pointerOpacity, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true
            }),
            Animated.timing(pointerPosition, {
                toValue: { x: pointerStartPos.x, y: pointerStartPos.y },
                duration: 0,
                useNativeDriver: true
            }),
        ]).start(({finished}) => {
            if(finished){
                animatePointer();
            }
        });
    }
    
    return (
        <View style={styles.container}>
            {showPointer &&
                <View style={styles.instructionsContainer}>
                    <MyAppText style={styles.instructionsText}>
                        {instructions}
                    </MyAppText> 
                </View>
            }
            <View style={styles.pointerContainer}>
                {showPointer && 
                    <Animated.View style={[styles.pointer, {transform: [{translateX: pointerPosition.x}, {translateY: pointerPosition.y}], opacity: pointerOpacity}]}>
                        <MaterialCommunityIcons name="cursor-pointer" size={40} color="#555"/> 
                    </Animated.View>
                }
                <GameBoard 
                    gameBoard={[["t", "w","0"], ["t", "i", "o"],["l", "o", "e"]]}
                    extraLetter={"t"}
                    onGameEnd={() => {
                        setShowPointer(false);
                    }}
                    returnCompleteWords={(count : number) => {
                        setCompleteWords(count);
                    }}
                />
            </View>
            <AuthButton 
                text='End Tutorial'
                onPress={() => {
                    setShowPointer(false);
                    props.endTutorial();
                }}
                style={styles.exitButton}
            />
        </View>
    )
}   

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#CBE6F7",
        width: "100%",
    },
    instructionsContainer: {
        position: "absolute",
        top: 20,
        justifyContent: "center",
        alignItems: "center",
        height: 100
    }, 
    instructionsText: {
        fontSize: 25,
        textAlign: "center",
    },
    pointerContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLOURS.blue
    }, 
    pointer: {
        position: "absolute",
        zIndex: 2, 
        justifyContent: "center", 
        alignItems: "center", 
    },
    exitButton: {
        backgroundColor: COLOURS.green,
        position: "absolute",
        bottom: 20
    }
});