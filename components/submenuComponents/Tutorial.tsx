import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Import COLOURS
import { COLOURS } from "@/constants/colours";
import { SIZES } from '@/constants/sizes';

// Import Components
import GameBoard from "@/components/gameComponents/GameBoard";
import MyAppText from '@/components/common/MyAppText';
import AuthButton from '@/components/buttons/AuthButton';

// Setup props
interface TutorialProps {
    endTutorial: Function
}

export default function Tutorial(props: TutorialProps) {
    // Calculate the width of the screen
    const width = Dimensions.get("window").width;
    // Setup state for the pointer
    const [pointerStartPos, setPointerStartPos] = useState({ x: SIZES.GAMEBOARD / 3, y: 0 });
    const [pointerEndPos, setPointerEndPos] = useState({ x: SIZES.GAMEBOARD / 3, y: -(SIZES.GAMEBOARD / 3) });
    const [instructions, setInstructions] = useState<string>("Slide the tiles to form words");
    const [showPointer, setShowPointer] = useState(true);
    const pointerPosition = useRef(new Animated.ValueXY({ x: pointerStartPos.x, y: pointerStartPos.y })).current;
    const pointerOpacity = useRef(new Animated.Value(0)).current;

    // Setup state for the tutorial
    const [completeWords, setCompleteWords] = useState<number>(0);
    const [restartAnimation, setRestartAnimation] = useState<boolean>(false);

    // Update the pointer position based on the number of complete words. This shows the user what to do next
    useEffect(() => {
        setRestartAnimation(!restartAnimation);
        if (completeWords === 0) {
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
        if (completeWords === 1) {
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
        if (completeWords === 2) {
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

    // Start the pointer animation
    useEffect(() => {
        animatePointer();
    }, []);

    // Reset the pointer when the animation is restarted
    useEffect(() => {
        resetPointer();
    }, [restartAnimation]);

    // Function to return the pointer to the start position
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
            if (finished) {
                animatePointer();
            }
        });
    }

    // Function to animate the pointer
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
        ]).start(({ finished }) => {
            if (finished) {
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
                    <Animated.View style={[styles.pointer, { transform: [{ translateX: pointerPosition.x }, { translateY: pointerPosition.y }], opacity: pointerOpacity }]} pointerEvents="none">
                        <MaterialCommunityIcons name="cursor-pointer" size={40} color="#555" />
                    </Animated.View>
                }
                <GameBoard
                    gameBoard={[["t", "w", "0"], ["t", "i", "o"], ["l", "o", "e"]]}
                    extraLetter={"t"}
                    onGameEnd={() => {
                        setShowPointer(false);
                    }}
                    returnCompleteWords={(count: number) => {
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