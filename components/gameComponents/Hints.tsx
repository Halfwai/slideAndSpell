import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';

// Import COLOURS
import { COLOURS } from '@/constants/colours';

// Import components
import RoundButton from '@/components/buttons/RoundButton';
import Tile from '@/components/common/Tile';

// Setup props
interface HintsProps {
    startSlideIn: Boolean;
    hints: string[][];
    tileSize: number;
    spaceSize: number;
}

export default function Hints(props: HintsProps) {
    // Define the hintButtonPosition and hintBoardPosition variables
    const hintButtonPosition = useRef(new Animated.ValueXY({ x: -Dimensions.get("screen").width, y: -150 })).current;
    const hintBoardPosition = useRef(new Animated.ValueXY({ x: Dimensions.get("screen").width, y: -1 })).current;
    const [showHints, setShowHints] = useState(false);
    // Define the hintsBoard state that shows the available hints
    const [hintsBoard, setHintsBoard] = useState<string[][]>([]);

    // Slide in the hint button
    function slideInHintButton() {
        Animated.timing(hintButtonPosition, {
            toValue: { x: 0, y: -150 },
            duration: 500,
            useNativeDriver: true
        }).start();
    }

    // Slide the hint board out
    function slideHintBoard() {
        if (!showHints) {
            setShowHints(true);
            return;
        } else {
            Animated.timing(hintBoardPosition, {
                toValue: { x: Dimensions.get("screen").width, y: -1 },
                duration: 500,
                useNativeDriver: true
            }).start(({ finished }) => {
                if (finished) setShowHints(false);
            });
        }
    }

    // Slide the hint board in
    useEffect(() => {
        if (showHints) {
            Animated.timing(hintBoardPosition, {
                toValue: { x: -1, y: -1 },
                duration: 500,
                useNativeDriver: true
            }).start();
        }
    }, [showHints]);

    // Update the hintsBoard state when the hints prop changes
    const upDateHintsBoard = () => {
        let newHintsBoard = JSON.parse(JSON.stringify(props.hints));
        if (props.hints.length === 0) {
            return;
        }
        for (let i = newHintsBoard.length; i < props.hints[0].length; i++) {
            const hintLine = []
            for (let j = 0; j < props.hints[0].length; j++) {
                hintLine.push("?");
            }
            newHintsBoard[i] = hintLine;
        }
        setHintsBoard(newHintsBoard);
    };

    // Update the hintsBoard state when the hints prop changes
    useEffect(() => {
        upDateHintsBoard();
    }, [props.hints]);


    // Slide the hint button in when the startSlideIn prop changes
    useEffect(() => {
        if (props.startSlideIn) {
            slideInHintButton();
        }
    }, [props.startSlideIn]);

    return (
        <>
            <Animated.View style={{ transform: [{ translateX: hintButtonPosition.x }, { translateY: hintButtonPosition.y }], ...styles.container }}>
                {props.hints.length > 0 && (
                    <RoundButton
                        icon="lightbulb-on-outline"
                        onPress={() => {
                            slideHintBoard()
                            console.log("showHints", showHints)
                        }}
                        iconType="material"
                        colour={showHints ? COLOURS.green : undefined}
                    />
                )}
            </Animated.View>
            {showHints && (
                <View style={styles.container}>
                    {hintsBoard.map((hint, index) => (
                        <Animated.View key={index} style={{ flexDirection: 'row', transform: [{ translateX: hintBoardPosition.x }, { translateY: hintBoardPosition.y }] }}>
                            {hint.map((letter, letterIndex) => (
                                <View key={letterIndex} style={{ width: props.spaceSize, height: props.spaceSize, justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={[{ width: props.tileSize, height: props.tileSize, borderRadius: 10 }, letter != "?" ? { backgroundColor: COLOURS.green } : { backgroundColor: COLOURS.red }]}>
                                        <Tile letter={letter} />
                                    </View>
                                </View>
                            ))}
                        </Animated.View>
                    ))}
                </View>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 1,
    }
})